"use server"

import { prisma } from "@/lib/prisma";
import { CreateWorkflowSchema, createWorkflowValidator } from "@/lib/validators/workflow-schema/workflow";
import { requireServerAuth } from "@/lib/server-auth";
import { WorkflowStatus } from "@/types";
import { redirect } from "next/navigation";
import { handleWorkflowPrismaError } from "@/lib/helpers/prisma-error-handler";
import { revalidatePath } from "next/cache";

export async function CreateWorkflow(values: CreateWorkflowSchema) {
    // Authenticate user
    const { user } = await requireServerAuth();

    if (!user) {
        throw new Error("User not authenticated");
    }

    // Validate input data
    const { success, data } = createWorkflowValidator.safeParse(values);

    if (!success) {
        throw new Error("Invalid workflow data");
    }

    try {
        // Create workflow with required fields
        const workflow = await prisma.workflow.create({
            data: {
                ...data,
                userId: user.id,
                definition: "TODO",
                status: WorkflowStatus.DRAFT,
            }
        });

        if (!workflow) {
            throw new Error("Failed to create workflow");
        }

        // Revalidate the workflows page
        revalidatePath(`/workflows`);
        // Redirect to the workflow editor
        redirect(`/workflow/editor/${workflow.id}`);

    } catch (error) {
        // Handle Prisma errors with custom error messages
        const errorMessage = handleWorkflowPrismaError(error, data.name);
        throw new Error(errorMessage);
    }
}
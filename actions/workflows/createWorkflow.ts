"use server"

import { prisma } from "@/lib/prisma";
import { CreateWorkflowSchema, createWorkflowValidator } from "@/lib/validators/workflow-schema/workflow";
import { requireServerAuth } from "@/lib/server-auth";
import { WorkflowStatus } from "@/types";
import { redirect } from "next/navigation";

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

    redirect(`/workflow/editor/${workflow.id}`);
    return workflow;
}
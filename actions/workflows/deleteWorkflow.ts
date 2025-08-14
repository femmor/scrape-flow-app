"use server"

import { prisma } from "@/lib/prisma";
import { requireServerAuth } from "@/lib/server-auth";
import { revalidatePath } from "next/cache";

export const DeleteWorkflow = async (workflowId: string) => {
    // Authenticate user
    const { user } = await requireServerAuth();

    if (!user) {
        throw new Error("User not authenticated");
    }

    await prisma.workflow.delete({
        where: {
            id: workflowId,
            // Ensure the user owns the workflow
            userId: user.id
        }
    });

    // Revalidate the workflows page
    revalidatePath('/workflows');
}

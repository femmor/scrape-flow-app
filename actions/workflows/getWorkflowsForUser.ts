"use server"

import { requireServerAuth } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma";

export async function GetWorkflowsForUser() {
    const { user } = await requireServerAuth()
    const userId = user?.id

    if (!userId) {
        throw new Error("User not authenticated!");
    }

    // Fetch workflows for the user
    return prisma.workflow.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "asc"
        }
    });
}
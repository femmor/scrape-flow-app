import { Prisma } from "@/lib/generated/prisma";

/**
 * Handles Prisma errors and returns user-friendly error messages
 * @param error - The error thrown by Prisma
 * @param customMessages - Optional custom messages for specific constraint violations
 * @returns User-friendly error message
 */
export function handlePrismaError(
    error: unknown,
    customMessages?: {
        [field: string]: string;
    }
): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002': {
                // Unique constraint violation
                const targets = error.meta?.target as string[] | undefined;
                const field = targets?.[targets.length - 1]; // Get the last field in the constraint

                if (field && customMessages?.[field]) {
                    return customMessages[field];
                }

                // Default unique constraint messages
                switch (field) {
                    case 'name':
                        return 'A record with this name already exists. Please choose a different name.';
                    case 'email':
                        return 'This email address is already in use.';
                    default:
                        return 'This value must be unique. Please try a different value.';
                }
            }
            case 'P2025':
                // Record not found
                return 'The requested record was not found.';
            case 'P2003':
                // Foreign key constraint violation
                return 'Cannot perform this operation due to related data constraints.';
            case 'P2014':
                // Required relation missing
                return 'Required relationship is missing.';
            default:
                console.error('Unhandled Prisma error:', error);
                return 'A database error occurred. Please try again.';
        }
    }

    // Not a Prisma error, return the original error message or a generic one
    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
}

/**
 * Specific handler for workflow-related Prisma errors
 * @param error - The error thrown by Prisma
 * @param workflowName - The name of the workflow that caused the error
 * @returns User-friendly error message
 */
export function handleWorkflowPrismaError(error: unknown, workflowName?: string): string {
    return handlePrismaError(error, {
        name: workflowName
            ? `You already have a workflow named "${workflowName}". Please choose a different name.`
            : 'You already have a workflow with this name. Please choose a different name.'
    });
}

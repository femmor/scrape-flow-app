import z from "zod";

export const createWorkflowValidator = z.object({
    name: z.string().min(2, { message: "Workflow name must be at least 2 characters long" }).max(50, { message: "Name must be at most 50 characters long" }),
    description: z.string().max(80).optional(),
})

export type CreateWorkflowSchema = z.infer<typeof createWorkflowValidator>;

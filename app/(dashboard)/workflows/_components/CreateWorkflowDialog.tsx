"use client"

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateWorkflowSchema, createWorkflowValidator } from "@/lib/validators/workflow-schema/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false);

    const form = useForm<CreateWorkflowSchema>({
        resolver: zodResolver(createWorkflowValidator),
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.dismiss("create-workflow-loading");
            form.reset();
            setOpen(false);
            toast.success("Workflow created successfully!", {
                id: "create-workflow-success",
            });
        },
        onError: (error) => {
            toast.dismiss("create-workflow-loading");
            console.error("Failed to create workflow:", error);
            toast.error("Failed to create workflow", {
                id: "create-workflow-error",
            });
        }
    });

    const onSubmit = useCallback((values: CreateWorkflowSchema) => {
        toast.loading("Creating workflow...", {
            id: "create-workflow-loading",
        });
        mutate(values);
    }, [mutate]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create Workflow"}</Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon={<Layers2Icon size={40} className="text-primary" />}
                    title="Create a New Workflow"
                    subTitle="Start building your workflow"
                />
                <div className="px-6 py-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter workflow name" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose a descriptive name for your workflow.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description <span className="text-muted-foreground">(optional)</span></FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Enter workflow description" {...field} className="resize-none" />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Provide a brief description of your workflow.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Proceed"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog
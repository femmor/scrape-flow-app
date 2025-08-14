"use client"

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteWorkflowDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}

const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId }: DeleteWorkflowDialogProps) => {
    const [confirmText, setConfirmText] = useState("");

    // Delete mutation 
    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.dismiss(workflowId);
            setOpen(false);
            setConfirmText("");
            toast.success("Workflow deleted successfully", {
                id: workflowId
            });
        },
        onError: () => {
            toast.dismiss(workflowId);
            toast.error("Failed to delete workflow", {
                id: workflowId
            });
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this workflow? This action cannot be undone.
                        <div className="flex flex-col py-4 gap-2">
                            <p>If you are sure, enter <b>{`"${workflowName}"`}</b> to confirm:</p>
                            <Input
                                placeholder={`${workflowName}`}
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() =>
                            setConfirmText("")
                        }
                    >Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={(e) => {
                        e.stopPropagation();
                        toast.loading("Deleting workflow...", {
                            id: workflowId
                        })
                        deleteMutation.mutate(workflowId);
                    }}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog
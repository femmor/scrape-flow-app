import TooltipWrapper from "@/components/TooltipWrapper"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import DeleteWorkflowDialog from "./DeleteWorkflowDialog"

const WorkflowActions = ({ workflowName, workflowId }: { workflowName: string, workflowId: string }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <TooltipWrapper content="More options">
                        <MoreVerticalIcon size={18} />
                    </TooltipWrapper>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive flex items-center gap-2" onSelect={() => setShowDeleteDialog(prev => !prev)}>
                        <TrashIcon size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default WorkflowActions
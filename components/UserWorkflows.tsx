
import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "@/app/(dashboard)/workflows/_components/CreateWorkflowDialog";
import WorkflowCard from "@/app/(dashboard)/workflows/_components/WorkflowCard";

const UserWorkflows = async () => {
    const workflows = await GetWorkflowsForUser();

    if (!workflows) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>No Workflows Found</AlertTitle>
                <AlertDescription>
                    It seems you don&apos;t have any workflows at the moment.
                </AlertDescription>
            </Alert>
        );
    }

    if (workflows.length === 0) {
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon className="stroke-primary" size={40} />
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <p className="font-bold">No workflow created yet</p>
                    <p className="text-sm text-muted-foreground">Click the button below to create your first workflow.</p>
                </div>
                <CreateWorkflowDialog triggerText="Create Your First Workflow" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {workflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
        </div>
    )
}

export default UserWorkflows

import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { waitFor } from "@/lib/helpers/waitFor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";

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
            </div>
        );
    }

    return (
        <div>
            {workflows.map(workflow => (
                <div key={workflow.id}>{workflow.name}</div>
            ))}
        </div>
    )
}

export default UserWorkflows
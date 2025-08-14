import UserWorkflows from "@/components/UserWorkflows"
import UserWorkflowsSkeleton from "@/components/UserWorkflowsSkeleton"
import { Suspense } from "react"
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog"

const Workflows = () => {
    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-sm text-muted-foreground">Manage and monitor your workflows</p>
                </div>
                <CreateWorkflowDialog triggerText="Create Workflow" />
            </div>

            <div className="h-full py-6">
                <Suspense fallback={<UserWorkflowsSkeleton />}>
                    <UserWorkflows />
                </Suspense>
            </div>
        </div>
    )
}

export default Workflows
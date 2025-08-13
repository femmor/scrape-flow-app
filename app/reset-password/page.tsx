
import Logo from "@/components/Logo"
import { ResetPasswordForm } from "@/components/reset-password-form"

export default function ResetPasswordPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center gap-2 self-center font-medium">
                    <Logo href="/" />
                </div>
                <ResetPasswordForm />
            </div>
        </div>
    )
}

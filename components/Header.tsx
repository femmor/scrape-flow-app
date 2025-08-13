"use client"

import { LogOut } from "lucide-react"
import BreadCrumbHeader from "./BreadCrumbHeader"
import MobileSidebar from "./MobileSidebar"
import { ModeToggler } from "./ModeToggler"
import { Button } from "./ui/button"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "@/lib/auth-client"

const Header = () => {
    const { data: session, isPending } = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const result = await signOut();

            if (result.error) {
                toast.error("Failed to sign out");
            } else {
                toast.success("Signed out successfully");
                window.location.href = "/login"; // Full page redirect to clear all state
            }
        } catch (error) {
            toast.error("Failed to sign out");
        }
    }

    if (isPending) {
        return (
            <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
                <div className="flex">
                    <MobileSidebar />
                    <BreadCrumbHeader />
                </div>
                <div className="gap-1 flex items-center">
                    <ModeToggler />
                    <div className="w-16 h-8 bg-muted animate-pulse rounded" />
                </div>
            </header>
        )
    }

    return (
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
            <div className="flex">
                <MobileSidebar />
                <BreadCrumbHeader />
            </div>
            <div className="gap-1 flex items-center">
                <ModeToggler />
                {session?.user && (
                    <Button variant="link" className="mr-[-10px]" onClick={handleLogout}>
                        Logout <LogOut className="w-3 h-3 text-primary" />
                    </Button>
                )}
            </div>
        </header>
    )
}

export default Header
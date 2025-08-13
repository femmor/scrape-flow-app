"use client"

import { LogOut } from "lucide-react"
import BreadCrumbHeader from "./BreadCrumbHeader"
import MobileSidebar from "./MobileSidebar"
import { ModeToggler } from "./ModeToggler"
import { Button } from "./ui/button"
import { signOutUser } from "@/server/users"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const Header = () => {
    const router = useRouter()

    const handleLogout = async () => {
        const { success, message } = await signOutUser();

        if (success) {
            router.push("/login");
            toast.success(message as string);
        } else {
            toast.error(message as string);
        }
    }

    return (
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
            <div className="flex">
                <MobileSidebar />
                <BreadCrumbHeader />
            </div>
            <div className="gap-1 flex items-center">
                <ModeToggler />
                <Button variant="link" className="mr-[-10px]" onClick={handleLogout}>Logout <LogOut className="w-3 h-3 text-primary" /></Button>
            </div>
        </header>
    )
}

export default Header
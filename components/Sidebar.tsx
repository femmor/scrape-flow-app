"use client"

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react"
import Logo from "./Logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "./ui/button"

const routes = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: 'workflows', label: 'Workflows', icon: Layers2Icon },
    { href: 'credentials', label: 'Credentials', icon: ShieldCheckIcon },
    { href: 'billing', label: 'Billing', icon: CoinsIcon },
]

function DesktopSidebar() {

    const pathname = usePathname()
    const activeRoute = routes.find((route) => route.href.length > 1 && pathname.includes(route.href)) || routes[0]

    return (
        <div
            className="hidden relative md:block min-w-[200px] max-w-[230px] n-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/50 dark:text-foreground text-muted-foreground border-r-2 border-separate"
        >
            <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
                <Logo />
            </div>
            <div className="flex flex-col p-2">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={`flex items-center gap-2 p-2 text-sm font-medium transition-colors hover:bg-emerald-300/90 ${buttonVariants({
                            variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                        })}`}
                    >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DesktopSidebar
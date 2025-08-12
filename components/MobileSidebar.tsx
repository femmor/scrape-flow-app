"use client"

import { routes } from '@/lib/routes'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Button, buttonVariants } from './ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const pathname = usePathname()
    // Get the current active route based on the pathname
    const activeRoute = routes.find((route) => route.href.length > 1 && pathname.includes(route.href)) || routes[0]

    return (
        <div className="md:hidden border-separate bg-background">
            <nav className='container flex items-center justify-between px-8'>
                <Sheet
                    open={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className='w-[400px] sm:w-[540px] space-y-4'
                        side="left"
                        aria-label="Navigation menu"
                    >
                        <SheetHeader className="sr-only">
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>
                                Mobile navigation menu with links to different sections of the application
                            </SheetDescription>
                        </SheetHeader>
                        <Logo />
                        <div className="flex flex-col gap-1" role="navigation" aria-label="Main navigation">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={`flex items-center gap-2 p-2 text-sm font-medium transition-colors hover:bg-emerald-300/90 ${buttonVariants({
                                        variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                                    })}`}
                                    aria-current={activeRoute.href === route.href ? "page" : undefined}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <route.icon className="h-4 w-4" aria-hidden="true" />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default MobileSidebar

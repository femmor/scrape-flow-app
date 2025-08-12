import Header from '@/components/Header'
import DesktopSidebar from '@/components/Sidebar'
import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='flex h-screen'>
            <DesktopSidebar />
            <div className='flex flex-col flex-1 min-h-screen'>
                <Header />
                <Separator />
                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
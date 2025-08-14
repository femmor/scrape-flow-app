import { DialogHeader, DialogDescription } from './ui/dialog'
import { DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

interface CustomDialogHeaderProps {
    icon?: ReactNode
    title?: string
    subTitle?: string
}

const CustomDialogHeader = ({ icon, title, subTitle }: CustomDialogHeaderProps) => {

    return (
        <DialogHeader className='py-6'>
            <DialogTitle asChild>
                <div className='flex flex-col items-center gap-2 mb-2'>
                    {icon && <>{icon}</>}
                    {title && <p className='text-lg font-semibold text-primary'>{title}</p>}
                </div>
            </DialogTitle>
            {subTitle && (
                <DialogDescription asChild>
                    <p className='text-sm text-muted-foreground text-center'>{subTitle}</p>
                </DialogDescription>
            )}
            <Separator />
        </DialogHeader>
    )
}

export default CustomDialogHeader
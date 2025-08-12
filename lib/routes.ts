import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react"
import { ElementType } from "react"

type RouteTypes = {
    href: string
    label: string
    icon: ElementType
}

export const routes: RouteTypes[] = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: 'workflows', label: 'Workflows', icon: Layers2Icon },
    { href: 'credentials', label: 'Credentials', icon: ShieldCheckIcon },
    { href: 'billing', label: 'Billing', icon: CoinsIcon },
]
import BreadCrumbHeader from "./BreadCrumbHeader"
import MobileSidebar from "./MobileSidebar"
import { ModeToggler } from "./ModeToggler"

const Header = () => {
    return (
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
            <div className="flex">
                <MobileSidebar />
                <BreadCrumbHeader />
            </div>
            <div className="gap-1 flex items-center">
                <ModeToggler />
            </div>
        </header>
    )
}

export default Header

const Header = ({ siteTitle }: { siteTitle: string }) => {
    return (
        <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>{siteTitle}</header>
    )
}

export default Header
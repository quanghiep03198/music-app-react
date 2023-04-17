import { useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
import SidebarMenu from "./SidebarMenu"
import UserPlaylists from "./UserPlaylists"
import Logo from "/images/logo.png"

const DrawerSidebar = tw.aside`drawer-side`
const DrawerOverlay = tw.label`drawer-overlay`
const DrawerSideWrapper = tw.div`p-2 bg-base-300 w-fit flex flex-col overflow-y-hidden text-neutral-content `
const LogoImage = tw.img`max-w-[200px] aspect-[2/1] object-contain -translate-x-2`

const Sidebar = () => {
    const overlayRef = useRef()

    const { authenticated } = useSelector((state) => state.auth)
    return (
        <DrawerSidebar>
            <DrawerOverlay htmlFor="sidebar-toggle" ref={overlayRef} />
            <DrawerSideWrapper>
                <Link to="/">
                    <LogoImage src={Logo} loading="lazy" />
                </Link>

                <SidebarMenu />
                <div className="divider"></div>
                {authenticated && <UserPlaylists />}
            </DrawerSideWrapper>
        </DrawerSidebar>
    )
}

export default Sidebar

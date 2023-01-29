import { memo, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import SidebarMenu from "./SidebarMenu"
import UserPlaylists from "./UserPlaylists"
import Logo from "/images/logo.png"

const DrawerSidebar = tw.aside`drawer-side`
const DrawerOverlay = tw.label`drawer-overlay`
const DrawerSideWrapper = tw.div`p-2 bg-base-200 w-fit`
const LogoImage = tw.img`max-w-[240px] h-[120px] object-contain -translate-x-2`

const Sidebar = () => {
    const { pathname } = useLocation()
    const overlayRef = useRef()
    // useEffect(() => {
    //     overlayRef.current.click()
    // }, [pathname])
    const { userInfo } = useSelector((state) => state.auth)
    return (
        <DrawerSidebar>
            <DrawerOverlay htmlFor="sidebar-toggle" ref={overlayRef} />
            <DrawerSideWrapper>
                <Link to="/">
                    <LogoImage src={Logo} alt="" />
                </Link>

                <SidebarMenu />
                <div className="divider"></div>
                {userInfo && <UserPlaylists />}
            </DrawerSideWrapper>
        </DrawerSidebar>
    )
}

export default Sidebar

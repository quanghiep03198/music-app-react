import { lazy, Suspense, useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
const SidebarMenu = lazy(() => import("./SidebarMenu"))
import UserPlaylists from "./UserPlaylists"
import Logo from "/images/logo.png"

const DrawerSidebar = tw.aside`drawer-side`
const DrawerOverlay = tw.label`drawer-overlay`
const DrawerSideWrapper = tw.div`p-2 bg-base-200 w-fit flex flex-col overflow-y-hidden `
const LogoImage = tw.img`max-w-[240px] h-[120px] object-contain -translate-x-2`

const Sidebar = () => {
    const overlayRef = useRef()

    const { authenticated } = useSelector((state) => state.auth)
    return (
        <DrawerSidebar>
            <DrawerOverlay htmlFor="sidebar-toggle" ref={overlayRef} />
            <DrawerSideWrapper>
                <Link to="/">
                    <LogoImage src={Logo} alt="" />
                </Link>

                <SidebarMenu />
                <div className="divider"></div>
                {authenticated && (
                    <Suspense
                        fallback={[1, 2, 3].map((item) => (
                            <MenuItem>
                                <a role="menuitem">
                                    <CardTextSkeleton key={item} />
                                </a>
                            </MenuItem>
                        ))}
                    >
                        <UserPlaylists />
                    </Suspense>
                )}
            </DrawerSideWrapper>
        </DrawerSidebar>
    )
}

export default Sidebar

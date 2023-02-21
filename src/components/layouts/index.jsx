import AppProvider from "@/context/AppProvider"
import { ThemeContext } from "@/context/ThemeProvider"
import { Suspense, useContext, useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import Loading from "../customs/atoms/Loading"
import ErrorBoundary from "../customs/ErrorBoundary"
import AudioPlayer from "../shared/AudioPlayer"
import Navbar from "../shared/Navbar"
import NavBottom from "../shared/Navbar/NavBottom"
import CreatePlaylistModal from "../shared/Playlist/CreatePlaylistModal"
import PlaylistListModal from "../shared/Playlist/PlaylistListModal"
import Sidebar from "../shared/Sidebar"
import UploadTrackModal from "../shared/Track/UploadTrackModal"
const Container = tw.div`flex h-screen flex-col overflow-hidden`
const Drawer = tw.div`drawer drawer-mobile h-full`
const DrawerContent = tw.div`invisible-scroll drawer-content relative flex flex-1 w-full flex-col  overflow-x-auto overflow-y-auto bg-base-100`
const PageContent = tw.div`flex flex-col w-full h-[inherit] gap-10 overflow-y-auto scroll sm:invisible-scroll overflow-x-hidden sm:p-2 p-6`
const SidebarToggler = tw.input`drawer-toggle`

const Layout = () => {
    const { pathname } = useLocation()
    const sidebarTogglerRef = useRef(null)
    const { isDarkTheme } = useContext(ThemeContext)
    useEffect(() => {
        if (sidebarTogglerRef.current) {
            sidebarTogglerRef.current.checked = false
        }
    }, [pathname])
    return (
        <ErrorBoundary>
            <AppProvider>
                <Container data-theme={isDarkTheme ? "dark" : "light"}>
                    <Drawer>
                        <SidebarToggler id="sidebar-toggle" type="checkbox" ref={sidebarTogglerRef} />
                        <DrawerContent>
                            <Navbar />
                            <PageContent>
                                <Suspense
                                    fallback={
                                        <div className="flex items-center justify-center p-20">
                                            <Loading />
                                        </div>
                                    }
                                >
                                    <Outlet />
                                </Suspense>
                            </PageContent>
                        </DrawerContent>

                        <Sidebar />
                    </Drawer>
                    <AudioPlayer />
                    <NavBottom />
                    <CreatePlaylistModal />
                    <UploadTrackModal />
                    <PlaylistListModal />
                </Container>
            </AppProvider>
        </ErrorBoundary>
    )
}

export default Layout

import AppProvider from "@/context/AppProvider"
import { useFetchUserDataQuery } from "@/redux/api/authApi"
import { Suspense, useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import Loading from "../components/customs/@core/Loading"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import AudioPlayer from "../components/shared/AudioPlayer"
import Navbar from "../components/shared/AudioPlayer/Navbar"
import NavBottom from "../components/shared/AudioPlayer/Navbar/NavBottom"
import CreatePlaylistModal from "../components/shared/Playlist/CreatePlaylistModal"
import PlaylistListModal from "../components/shared/Playlist/PlaylistListModal"
import Sidebar from "../components/shared/Sidebar"
import UploadTrackModal from "../components/shared/Track/UploadTrackModal"
import { LoadingWrapper } from "../components/shared/Loading/LazyLoadingScreen"

const Container = tw.div`flex h-screen flex-col overflow-hidden`
const Drawer = tw.div`drawer drawer-mobile h-full`
const DrawerContent = tw.div`invisible-scroll drawer-content relative flex flex-1 w-full flex-col  overflow-x-auto overflow-y-auto bg-base-200`
const PageContent = tw.div`flex flex-col w-full h-[inherit] gap-10 overflow-y-auto scroll sm:invisible-scroll overflow-x-hidden sm:p-2 p-6`
const SidebarToggler = tw.input`drawer-toggle`

const Layout = () => {
    const { pathname } = useLocation()
    const sidebarTogglerRef = useRef(null)
    const [trackToAddToPlaylist, setTrackToAddToPlaylist] = useState(null)
    // const { data: user } = useFetchUserDataQuery()
    useEffect(() => {
        if (sidebarTogglerRef.current) {
            sidebarTogglerRef.current.checked = false
        }
    }, [pathname])

    return (
        <ErrorBoundary>
            <AppProvider>
                <Container>
                    <Drawer>
                        <SidebarToggler id="sidebar-toggle" type="checkbox" ref={sidebarTogglerRef} />
                        <DrawerContent>
                            <Navbar />
                            <PageContent>
                                <Suspense
                                    fallback={
                                        <LoadingWrapper>
                                            <Loading />
                                        </LoadingWrapper>
                                    }>
                                    <Outlet context={{ trackToAddToPlaylist, setTrackToAddToPlaylist }} />
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

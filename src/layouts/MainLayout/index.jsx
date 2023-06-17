import AppProvider from "@/context/AppProvider"
import { Suspense, useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import Loading from "../../components/customs/Loading"
import ErrorBoundary from "../../components/error/ErrorBoundary"
import AudioPlayer from "../../components/shared/AudioPlayer"
import { LoadingWrapper } from "../../components/shared/Loading/LazyLoadingScreen"
import CreatePlaylistModal from "../../components/shared/Playlist/CreatePlaylistModal"
import PlaylistListModal from "../../components/shared/Playlist/PlaylistListModal"
import UploadTrackModal from "../../components/shared/Track/UploadTrackModal"
import Navbar from "./components/Navbar"
import NavBottom from "./components/Navbar/NavBottom"
import Sidebar from "./components/Sidebar"

const Layout = () => {
   const { pathname } = useLocation()
   const sidebarTogglerRef = useRef(null)
   const [trackToAddToPlaylist, setTrackToAddToPlaylist] = useState(null)
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

const Container = tw.div`flex h-screen flex-col overflow-hidden`
const Drawer = tw.div`drawer drawer-mobile h-full`
const DrawerContent = tw.div`invisible-scroll drawer-content relative flex flex-1 w-full flex-col  overflow-x-auto overflow-y-auto bg-base-200`
const PageContent = tw.div`flex flex-col w-full h-[inherit] gap-10 overflow-y-auto scroll sm:invisible-scroll overflow-x-hidden sm:p-2 p-6`
const SidebarToggler = tw.input`drawer-toggle`

export default Layout

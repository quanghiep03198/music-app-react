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
import { Drawer } from "react-daisyui"
import LoadingProgressBar from "@/components/shared/Loading/LoadingProgressBar"

const Layout = () => {
   const { pathname } = useLocation()
   const sidebarTogglerRef = useRef(null)
   const [trackToAddToPlaylist, setTrackToAddToPlaylist] = useState(null)
   const [visible, setVisible] = useState(false)

   const toggleVisible = () => {
      setVisible(!visible)
   }
   useEffect(() => {
      if (sidebarTogglerRef.current) {
         sidebarTogglerRef.current.checked = false
      }
   }, [pathname])

   return (
      <AppProvider>
         <Container>
            <Drawer side={<Sidebar />} mobile open={visible} onClickOverlay={toggleVisible}>
               <Drawer.Content>
                  <Navbar />
                  <Drawer.Main>
                     <Suspense fallback={<LoadingProgressBar />}>
                        <ErrorBoundary>
                           <Outlet context={{ trackToAddToPlaylist, setTrackToAddToPlaylist }} />
                        </ErrorBoundary>
                     </Suspense>
                  </Drawer.Main>
               </Drawer.Content>
            </Drawer>
            <AudioPlayer />
            <NavBottom />
            <CreatePlaylistModal />
            <UploadTrackModal />
            <PlaylistListModal />
         </Container>
      </AppProvider>
   )
}

const Container = tw.div`flex h-screen flex-col overflow-hidden`
Drawer.Content = tw.div`relative flex flex-1 h-full w-full flex-col overflow-x-auto overflow-y-auto bg-base-200`
Drawer.Main = tw.div`flex flex-col w-full h-[inherit] gap-10 overflow-y-auto scroll sm:invisible-scroll overflow-x-hidden sm:p-2 p-6`

export default Layout

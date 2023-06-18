import { Suspense } from "react"
import LoadingProgressBar from "@/components/shared/Loading/LoadingProgressBar"
import { Paths } from "@/configs/paths.config"
import Layout from "@/layouts/MainLayout"
import PrivateLayout from "@/layouts/PrivateLayouts/PrivateLayout"
import HomePage from "@/pages/Common/Home"
import { lazy } from "react"

const ProfilePage = lazy(() => import("../pages/Common/Profile"))
const LikedTrackPage = lazy(() => import("../pages/Common/LikedTrack"))
const SearchPage = lazy(() => import("../pages/Common/Search"))
const ArtistPage = lazy(() => import("../pages/Common/Artist"))
const LibraryPage = lazy(() => import("../pages/Common/Library"))
const PlaylistPage = lazy(() => import("../pages/Common/Playlist"))
const QueuePage = lazy(() => import("../pages/Common/Queue"))
const AlbumPage = lazy(() => import("../pages/Common/Album"))
const AccountPage = lazy(() => import("../layouts/UserLayout"))
const ResetPasswordPage = lazy(() => import("../pages/Auth/ResetPassword"))
const NotFoundPage = lazy(() => import("../pages/404"))

const CommonRoutes = [
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            index: true,
            element: <HomePage />
         },
         {
            path: Paths.QUEUE,
            element: <QueuePage />
         },
         {
            path: Paths.SEARCH,
            element: <SearchPage />
         },
         {
            path: Paths.ARTIST,
            element: <ArtistPage />
         },
         {
            path: Paths.ALBUM,
            element: <AlbumPage />
         },
         {
            path: Paths.PLAYLIST,
            element: <PlaylistPage />
         },
         {
            path: Paths.LIBRARY,
            element: (
               <PrivateLayout>
                  <LibraryPage />
               </PrivateLayout>
            )
         },
         {
            path: Paths.LIKED_TRACKS,
            element: (
               <PrivateLayout>
                  <LikedTrackPage />
               </PrivateLayout>
            )
         },
         {
            path: "*",
            element: <NotFoundPage />
         }
      ]
   },
   {
      path: Paths.ACCOUNT,
      element: (
         <PrivateLayout>
            <Suspense fallback={<LoadingProgressBar />}>
               <AccountPage />
            </Suspense>
         </PrivateLayout>
      ),
      children: [
         {
            index: true,
            element: <ProfilePage />
         },
         {
            path: Paths.RESET_PASSWORD,
            element: <ResetPasswordPage />
         }
      ]
   }
]

export default CommonRoutes

import { lazy } from "react"
import { useRoutes } from "react-router-dom"
import Layout from "@/layouts/MainLayout"
import PrivateLayout from "@/layouts/PrivateLayouts/PrivateLayout"
import HomePage from "@/pages/UserPages/Home"
import LoginPage from "@/pages/Auth/Login"
import RegisterPage from "@/pages/Auth/Register"
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword"
import { Paths } from "@/config/paths.config"
const ProfilePage = lazy(() => import("../pages/UserPages/Profile"))
const LikedTrackPage = lazy(() => import("../pages/UserPages/LikedTrack"))
const SearchPage = lazy(() => import("../pages/UserPages/Search"))
const ArtistPage = lazy(() => import("../pages/UserPages/Artist"))
const LibraryPage = lazy(() => import("../pages/UserPages/Library"))
const PlaylistPage = lazy(() => import("../pages/UserPages/Playlist"))
const QueuePage = lazy(() => import("../pages/UserPages/Queue"))
const AlbumPage = lazy(() => import("../pages/UserPages/Album"))
const AccountPage = lazy(() => import("../layouts/UserLayout"))
const ResetPasswordPage = lazy(() => import("../pages/Auth/ResetPassword"))
const NotFoundPage = lazy(() => import("../pages/404"))

const AppRoutes = [
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
      path: Paths.LOGIN,
      element: <LoginPage />
   },
   {
      path: Paths.REGISTER,
      element: <RegisterPage />
   },
   {
      path: Paths.FORGOT_PASSWORD,
      element: <ForgotPasswordPage />
   },
   {
      path: Paths.ACCOUNT,
      element: (
         <PrivateLayout>
            <AccountPage />
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

export default function Routes() {
   return useRoutes(AppRoutes)
}

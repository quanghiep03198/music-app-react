import { lazy, Suspense } from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Loading from "../components/customs/@core/Loading"
import PrivateLayout from "../layouts/PrivateLayout"
import LazyLoadingScreen from "../components/shared/Loading/LazyLoadingScreen"
import Profile from "../pages/Profile"
import { LoadingWrapper } from "@/components/shared/Loading/LazyLoadingScreen"
import Layout from "@/layouts"
import HomePage from "@/pages/Home"

const LikedTrackPage = lazy(() => import("../pages/LikedTrack"))
const SearchPage = lazy(() => import("../pages/Search"))
const ArtistPage = lazy(() => import("../pages/Artist"))
const LibraryPage = lazy(() => import("../pages/Library"))
const PlaylistPage = lazy(() => import("../pages/Playlist"))
const QueuePage = lazy(() => import("../pages/Queue"))
const AlbumPage = lazy(() => import("../pages/Album"))
const AccountPage = lazy(() => import("../layouts/Account"))
const LoginPage = lazy(() => import("../pages/Login"))
const RegisterPage = lazy(() => import("../pages/Register"))
const ResetPasswordPage = lazy(() => import("../pages/ResetPassword"))
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPassword"))
const NotFoundPage = lazy(() => import("../pages/NotFound"))

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/queue" element={<QueuePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                        path="/liked-tracks"
                        element={
                            <PrivateLayout>
                                <LikedTrackPage />
                            </PrivateLayout>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <PrivateLayout>
                                <LibraryPage />
                            </PrivateLayout>
                        }
                    />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route path="/playlist/:id" element={<PlaylistPage />} />
                    <Route path="/album/:id" element={<AlbumPage />} />
                </Route>
                <Route
                    path="/account"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <PrivateLayout>
                                <AccountPage />
                            </PrivateLayout>
                        </Suspense>
                    }>
                    <Route
                        index
                        element={
                            <PrivateLayout>
                                <Profile />
                            </PrivateLayout>
                        }
                    />
                </Route>
                <Route
                    path="/login"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <LoginPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <RegisterPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <ForgotPasswordPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <ResetPasswordPage />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense
                            fallback={
                                <LoadingWrapper>
                                    <Loading />
                                </LoadingWrapper>
                            }>
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router

import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import tw from "tailwind-styled-components"
import Loading from "./components/customs/atoms/Loading"
import ErrorBoundary from "./components/customs/ErrorBoundary"
import PrivateLayout from "./components/layouts/PrivateLayout"
import AlbumPage from "./components/pages/Album"
import ForgotPassword from "./components/pages/ForgotPassword"
import LikedTrack from "./components/pages/LikedTrack"
import LoadingScreen from "./components/pages/LoadingPage"

const Layout = lazy(() => import("./components/layouts"))
const Search = lazy(() => import("./components/pages/Search"))
const HomePage = lazy(() => import("./components/pages/Home"))
const Artist = lazy(() => import("./components/pages/Artist"))
const Library = lazy(() => import("./components/pages/Library"))
const Playlist = lazy(() => import("./components/pages/Playlist"))
const Queue = lazy(() => import("./components/pages/Queue"))

const LoginPage = lazy(() => import("./components/pages/Login"))
const RegisterPage = lazy(() => import("./components/pages/Register"))
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"))
const NotFound = lazy(() => import("./components/pages/NotFound"))

export const LoadingWrapper = tw.div`flex items-center justify-center p-20`

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<LoadingScreen />}>
                                <Layout />
                            </Suspense>
                        }
                    >
                        <Route index element={<HomePage />} />
                        <Route path="/queue" element={<Queue />} />
                        <Route path="/search" element={<Search />} />
                        <Route
                            path="/liked-tracks"
                            element={
                                <PrivateLayout>
                                    <LikedTrack />
                                </PrivateLayout>
                            }
                        />
                        <Route
                            path="/library"
                            element={
                                <PrivateLayout>
                                    <Library />
                                </PrivateLayout>
                            }
                        />
                        <Route path="/artist/:id" element={<Artist />} />
                        <Route path="/playlist/:id" element={<Playlist />} />
                        <Route path="/album/:id" element={<AlbumPage />} />
                    </Route>
                    <Route
                        path="/login"
                        element={
                            <Suspense
                                fallback={
                                    <LoadingWrapper>
                                        <Loading />
                                    </LoadingWrapper>
                                }
                            >
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
                                }
                            >
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
                                }
                            >
                                <ForgotPassword />
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
                                }
                            >
                                <ResetPassword />
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
                                }
                            >
                                <NotFound />
                            </Suspense>
                        }
                    />
                </Routes>
            </Router>

            <ToastContainer
                hideProgressBar={true}
                transition={Slide}
                autoClose={1000}
                limit={1}
                toastClassName={() => `alert`}
                position="top-center"
                closeButton={false}
            />
        </ErrorBoundary>
    )
}

export default App

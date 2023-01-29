import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import tw from "tailwind-styled-components"
import { HiX } from "react-icons/hi"
import Loading from "./components/customs/Atomics/Loading"
import ErrorBoundary from "./components/customs/ErrorBoundary"
import Layout from "./components/layouts"
import PrivateLayout from "./components/layouts/PrivateLayout"
import LikedTrack from "./pages/LikedTrack"
import AlbumPage from "./pages/Album"

const Search = lazy(() => import("./pages/Search"))
const HomePage = lazy(() => import("./pages/Home"))
const Artist = lazy(() => import("./pages/Artist"))
const Library = lazy(() => import("./pages/Library"))
const Playlist = lazy(() => import("./pages/Playlist"))
const Queue = lazy(() => import("./pages/Queue"))

const LoginPage = lazy(() => import("./pages/Login"))
const RegisterPage = lazy(() => import("./pages/Register"))
const ResetPassword = lazy(() => import("./pages/ResetPassword"))
const NotFound = lazy(() => import("./pages/NotFound"))

const LoadingWrapper = tw.div`flex items-center justify-center p-20`

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
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
                limit={3}
                toastClassName={() => `bg-base-100 text-white flex justify-between items-center p-4 rounded-lg shadow-xl relative font-medium`}
                bodyClassName={() => "flex items-center text-base-content"}
                position="bottom-left"
                closeButton={<HiX className="absolute top-1 right-1 font-bold text-base-content" />}
            />
        </ErrorBoundary>
    )
}

export default App

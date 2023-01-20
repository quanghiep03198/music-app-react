import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import ErrorBoundary from "./components/customs/ErrorBoundary"
import Layout from "./components/layouts"
import Loading from "./components/customs/Atomics/Loading"
import AppProvider from "./context/AppProvider"

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

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AppProvider>
                                <Layout />
                            </AppProvider>
                        }
                    >
                        <Route
                            index
                            element={<HomePage />}
                            errorElement={<Loading />}
                        />
                        <Route
                            path="/queue"
                            element={<Queue />}
                            errorElement={<Loading />}
                        />
                        <Route
                            path="/library"
                            element={<Library />}
                            errorElement={<Loading />}
                        />
                        <Route
                            path="/search"
                            element={<Search />}
                            errorElement={<Loading />}
                        />
                        <Route
                            path="/playlist/:id"
                            element={<Playlist />}
                            errorElement={<Loading />}
                        />
                        <Route
                            path="/artist/:id"
                            element={<Artist />}
                            errorElement={<Loading />}
                        />
                    </Route>
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <Suspense fallback={<Loading />}>
                                <ResetPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<Loading />}>
                                <NotFound />
                            </Suspense>
                        }
                    />
                </Routes>
            </Router>
        </ErrorBoundary>
    )
}

export default App

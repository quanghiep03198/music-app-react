import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { HiX } from "react-icons/hi"
import Loading from "./components/customs/Atomics/Loading"
import ErrorBoundary from "./components/customs/ErrorBoundary"
import LoadingScreen from "./components/customs/LoadingScreen"
import Layout from "./components/layouts"
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
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <LoadingScreen />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "/queue", element: <Queue /> },
                { path: "/playlist/:id", element: <Playlist /> },
                { path: "/library", element: <Library /> },
                { path: "/artist/:id", element: <Artist /> },
                { path: "/search", element: <Search /> }
            ]
        },
        {
            path: "/login",
            element: (
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center p-20">
                            <Loading />
                        </div>
                    }
                >
                    <LoginPage />
                </Suspense>
            )
        },
        {
            path: "/register",
            element: (
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center p-20">
                            <Loading />
                        </div>
                    }
                >
                    <RegisterPage />
                </Suspense>
            )
        },
        {
            path: "/reset-password",
            element: (
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center p-20">
                            <Loading />
                        </div>
                    }
                >
                    <ResetPassword />
                </Suspense>
            )
        },
        {
            path: "*",
            element: (
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center p-20">
                            <Loading />
                        </div>
                    }
                >
                    <NotFound />
                </Suspense>
            )
        }
    ])
    return (
        <ErrorBoundary>
            <RouterProvider router={router} />
            <ToastContainer
                hideProgressBar={true}
                transition={Slide}
                autoClose={1000}
                limit={3}
                toastClassName={() =>
                    `bg-base-100 text-white flex justify-between items-center p-4 rounded-lg shadow-xl`
                }
                bodyClassName={() => "flex items-center text-base-content"}
                position="top-center"
                closeButton={<HiX className="font-bold text-base-content" />}
            />
        </ErrorBoundary>
    )
}

export default App

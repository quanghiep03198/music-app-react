import { RouterProvider, createBrowserRouter, useRoutes } from "react-router-dom"
import AdminRoutes from "./AdminRoutes"
import AuthRoutes from "./AuthRoutes"
import CommonRoutes from "./CommonRoutes"
import LoadingProgressBar from "@/components/shared/Loading/LoadingProgressBar"

export default function Router() {
   const router = createBrowserRouter([...CommonRoutes, ...AuthRoutes, ...AdminRoutes])
   return <RouterProvider router={router} fallbackElement={<LoadingProgressBar />} />
}

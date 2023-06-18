import { AdminPaths } from "@/configs/paths.config"
import { lazy } from "react"
const AlbumsListPage = lazy(() => import("@/pages/Admin/AlbumsListPage"))

const AdminRoutes = [
   {
      path: AdminPaths.DEFAULT,
      element: <AlbumsListPage />
   }
]

export default AdminRoutes

import { useRoutes } from "react-router-dom"
import AdminRoutes from "./AdminRoutes"
import AuthRoutes from "./AuthRoutes"
import CommonRoutes from "./CommonRoutes"

export default function Routes() {
   return useRoutes([...CommonRoutes, ...AuthRoutes, ...AdminRoutes])
}

import LoginPage from "@/pages/Auth/Login"
import RegisterPage from "@/pages/Auth/Register"
import ForgotPasswordPage from "@/pages/Auth/ForgotPassword"
import { Paths } from "@/configs/paths.config"

const AuthRoutes = [
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
   }
]

export default AuthRoutes

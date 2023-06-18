import { logout } from "@/providers/slices/authSlice"
import store from "@/providers/store"
import checkJsonType from "@/utils/checkJsonType"
import axios from "axios"

// config base url for axios globally
const instance = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.request.use(
   (config) => {
      /* do not attach token with headers with these routes */
      const skippingCheckTokenRoutes = ["/register", "/refresh-token", "/forgot-password"]
      if (skippingCheckTokenRoutes.some((url) => url === config.url)) return config
      const accessToken = instance.getAccessToken()
      if (accessToken) config.headers.authorization = `Bearer ${accessToken}`
      return config
   },
   (error) => {
      return Promise.reject(error)
   }
)

instance.interceptors.response.use(
   (response) => response.data,
   async (error) => {
      const { response, config } = error
      const skippingCheckTokenEndpoints = ["/login", "/register", "/refresh-token", "/forgot-password"]
      if (skippingCheckTokenEndpoints.some((url) => url === config.url)) return config

      if (response?.status === 401 || response?.data?.message === "jwt expired") {
         const uid = localStorage.getItem("uid")
         if (!uid) {
            store.dispatch(logout())
            return Promise.reject(error)
         }
         // Cancel request
         try {
            const refreshToken = await instance.get("/refresh-token/" + JSON.parse(uid))
            instance.setAccessToken(refreshToken)
            return axios.request(error.config)
         } catch (error) {
            store.dispatch(logout())
            return Promise.reject(error)
         }
      }
      return Promise.reject(error)
   }
)

instance.getAccessToken = () => {
   const accessToken = localStorage.getItem("access_token")
   return checkJsonType(accessToken) ? JSON.parse(accessToken) : null
}

instance.setAccessToken = (accessToken) => {
   localStorage.setItem("access_token", JSON.stringify(accessToken))
}

export default instance

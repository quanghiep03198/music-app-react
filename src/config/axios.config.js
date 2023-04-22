import authApi from "@/redux/api/authApi"
import { logout } from "@/redux/reducers/authSlice"
import store from "@/redux/store"
import axios from "axios"

// config base url for axios globally
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})

instance.interceptors.request.use(
    (config) => {
        /* do not attach token with headers with these routes */
        const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password"]
        if (skippingCheckTokenRoutes.some((url) => url === config.url)) return config
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
            const { credentialuid } = store.getState().auth
            if (!uid) {
                store.dispatch(logout())
                return Promise.reject(error)
            }
            // Cancel request
            // const controller = new AbortController()
            // axios.request({ signal: controller.signal, ...error.config })
            const refreshToken = await instance.get("/refresh-token")
            if (!refreshToken) {
                store.dispatch(logout())
                return Promise.reject(error)
            }
            return axios.request(error.config)
        }
        return Promise.reject(error)
    }
)

export default instance

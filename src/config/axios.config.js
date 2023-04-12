import authApi from "@/app/services/authApi"
import { logout } from "@/app/slices/authSlice"
import store from "@/app/store"
import axios from "axios"

// config base url for axios globally
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

instance.interceptors.request.use(
    (config) => {
        /* do not attach token with headers with these routes */
        const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password"]
        if (skippingCheckTokenRoutes.some((url) => url === config.url)) return config
        const accessToken = store.getState().auth?.accessToken
        if (accessToken) {
            config.headers.Authorization = "Bearer " + accessToken
            return config
        }
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
            const { credential } = store.getState().auth
            if (!credential) {
                store.dispatch(logout())
                return Promise.reject(error)
            }
            // Cancel request
            // const controller = new AbortController()
            // axios.request({ signal: controller.signal, ...error.config })
            const newAccessToken = await store.dispatch(authApi.endpoints.refreshToken.initiate(credential)).unwrap()
            if (!newAccessToken) {
                store.dispatch(logout())
                return Promise.reject(error)
            }
            return axios.request(error.config)
        }
        return Promise.reject(error)
    }
)

export default instance

import authApi from "@/app/services/authApi"
import { logout, refreshTokenThunkAction } from "@/app/slices/authSlice"
import store from "@/app/store"
import axios from "axios"

// config base url for axios globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
    (config) => {
        /* do not attach token with headers with these routes */
        const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"]
        if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return config
        const { accessToken } = store.getState().auth
        if (accessToken) {
            config.headers.token = accessToken
            return config
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    async (response) => {
        const { data, config } = response
        const skippingCheckTokenRoutes = ["/login", "/register", "/refresh-token", "/forgot-password", "/reset-password"]
        if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return data

        if (data.status && data.status === 401) {
            console.log("Access token expired!")
            const { credential } = store.getState().auth
            const newAccessToken = await store.dispatch(authApi.endpoints.refreshToken.initiate(credential)).unwrap()
            if (!newAccessToken) store.dispatch(logout())
            console.log("Refresh token:>>", newAccessToken)
            return axios.request(config)
        }
        return data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios

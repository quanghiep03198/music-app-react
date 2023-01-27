import { refreshTokenThunkAction } from "@/app/redux/slice/userSlice"
import store from "@/app/redux/store"
import axios from "axios"

// config base url for axios globally
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
    (config) => {
        /* Bỏ qua check access token với các routes nay */
        const skippingCheckTokenRoutes = [
            "/login",
            "/register",
            "/refresh-token",
            "/forgot-password",
            "/reset-password"
        ]
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
        const skippingCheckTokenRoutes = [
            "/login",
            "/register",
            "/refresh-token",
            "/forgot-password",
            "/reset-password"
        ]
        if (skippingCheckTokenRoutes.indexOf(config.url) >= 0) return data

        if (data.status && data.status === 401) {
            console.log("Access token expired!")
            const newAccessToken = await store.dispatch(
                refreshTokenThunkAction()
            )
            console.log("Refresh token:>>", newAccessToken.payload)
        }
        return data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios

import { refreshTokenThunkAction } from "@/app/redux/slice/userSlice"
import store from "@/app/redux/store"
import axios from "axios"

// config axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { "Content-Type": "application/json" }
})
/* :::::::::::::: Xử  trước khi gửi request xuống server :::::::::::::: */
instance.interceptors.request.use(
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
        /* Trước khi request xuống server gửi luôn access token trong headers để check */
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

/* :::::::::::::: Xử lý data sau khi nhận response :::::::::::::: */
instance.interceptors.response.use(
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

        /* ::::::::::: Refresh token ::::::::::: */

        if (data.status && data.status === 401) {
            console.log("Access token has expired!")
            const newAccessToken = await store.dispatch(
                refreshTokenThunkAction()
            )
            console.log("Refresh token:>>>", newAccessToken.payload)

            return data
        }
        return data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance

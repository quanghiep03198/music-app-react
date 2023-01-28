import axios from "@/config/axios.config"

export default function axiosBaseQuery() {
    return async ({ url, method, data }) => {
        try {
            const response = await axios({
                url: url,
                method,
                data
            })
            return { data: response }
        } catch (axiosError) {
            let err = axiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message
                }
            }
        }
    }
}

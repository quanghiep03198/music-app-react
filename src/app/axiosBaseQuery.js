import axios from "@/config/axios.config"

// custom base query with axios
export default function axiosBaseQuery() {
    return async ({ url, method, data, params }) => {
        try {
            const response = await axios({
                url: url,
                method,
                data,
                params // query string object
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

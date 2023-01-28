import axios from "@/config/axios.config"
import qs from "qs"
export default function axiosBaseQuery() {
    return async ({ url, method, data, query, params }) => {
        try {
            query = query ? "?" + query : "" // return query string if query is not undefined
            const response = await axios({
                url: url + query, // fetch data with query
                method,
                data,
                params
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

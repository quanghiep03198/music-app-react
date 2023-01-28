import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

const PrivateLayout = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth)
    useEffect(() => {
        if (!userInfo) toast.info("You have to login first!")
    }, [])

    return userInfo ? children : <Navigate to={-1} replace={true} />
}

export default PrivateLayout

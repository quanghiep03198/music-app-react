import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const PrivateLayout = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth)
    return userInfo ? children : <Navigate to="/" replace />
}

export default PrivateLayout

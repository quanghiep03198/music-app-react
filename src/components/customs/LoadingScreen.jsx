import React from "react"
import Loading from "./Atomics/Loading"
import Logo from "/images/logo.png"

const LoadingScreen = () => {
    return (
        <div className="hero min-h-screen bg-base-300">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="mx-auto flex max-w-md  flex-col items-center justify-center">
                    <img
                        src="/images/logo.png"
                        className="max-w-full object-cover"
                    />
                    <Loading size="md" />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen

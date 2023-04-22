import React from "react"
import Loading from "../../customs/@core/Loading"
import Logo from "/images/logo.png"
import tw from "tailwind-styled-components"

export const LoadingWrapper = tw.div`flex items-center justify-center p-20`

const LazyLoadingScreen = () => {
    return (
        <div className="hero min-h-screen bg-base-300">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="mx-auto flex max-w-md  flex-col items-center justify-center">
                    <img src={Logo} className="max-w-full object-cover" loading="eager" />
                    <Loading size="md" />
                </div>
            </div>
        </div>
    )
}

export default LazyLoadingScreen

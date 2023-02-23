import React, { useCallback, useRef, useState } from "react"
import { Figure, SkeletonImage } from "./Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"
import { MdImageSearch } from "react-icons/md"

const HeroBanner = ({ children, heroImageUrl, heroImageMask }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(true)

    const handleOnLoadImage = useCallback(() => {
        setIsLoadingImage(false)
    })

    return (
        <div className="hero glass relative place-content-start rounded-xl sm:place-content-center">
            <div className="hero-content sm:flex-col">
                {isLoadingImage && <SkeletonImage tw="min-w-[16rem]" />}

                <img
                    src={heroImageUrl}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = DefaultAlbumThumbnail
                    }}
                    onLoad={handleOnLoadImage}
                    className={`aspect-square ${heroImageMask === "circle" ? "rounded-full" : "rounded-lg"} w-[16rem]  object-cover shadow-2xl sm:w-[12rem] ${
                        isLoadingImage ? "hidden" : "block"
                    }`}
                />

                <div className="flex flex-1 flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}

export default HeroBanner

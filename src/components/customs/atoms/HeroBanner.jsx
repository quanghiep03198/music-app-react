import React, { useCallback, useRef, useState } from "react"
import { Figure, SkeletonImage } from "./Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"
import { MdImageSearch } from "react-icons/md"

const HeroBanner = ({ children, heroImageUrl }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(true)

    const handleOnLoadImage = useCallback(() => {
        setIsLoadingImage(false)
    })

    return (
        <div className="hero glass relative place-content-start rounded-xl sm:place-content-center">
            <div className="hero-content sm:flex-col">
                <Figure mask="square">
                    {isLoadingImage && <SkeletonImage tw="min-w-[16rem]" />}

                    <img
                        src={heroImageUrl}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null // prevents looping
                            currentTarget.src = DefaultAlbumThumbnail
                        }}
                        onLoad={handleOnLoadImage}
                        className={`max-w-[16rem] rounded-lg shadow-2xl ${isLoadingImage ? "hidden" : "block"}`}
                    />
                </Figure>

                <div className="flex flex-1 flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}

export default HeroBanner

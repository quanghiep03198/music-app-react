import React from "react"
import { Figure } from "./Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"

const HeroBanner = ({ children, heroImageUrl }) => {
    return (
        <div className="hero glass relative place-content-start rounded-xl sm:place-content-center">
            <div className="hero-content sm:flex-col">
                <Figure mask="square">
                    <img
                        src={heroImageUrl}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null // prevents looping
                            currentTarget.src = DefaultAlbumThumbnail
                        }}
                        className="max-w-[16rem] rounded-lg shadow-2xl"
                    />
                </Figure>
                <div className="flex flex-1 flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}

export default HeroBanner

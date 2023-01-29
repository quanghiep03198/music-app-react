import React from "react"
import { Figure } from "./Card"

const HeroBanner = ({ children, heroImageUrl }) => {
    return (
        <div className="hero glass relative place-items-start rounded-xl">
            <div className="hero-content sm:flex-col">
                <Figure mask="square">
                    <img
                        src={heroImageUrl}
                        className="max-w-[240px] rounded-lg shadow-2xl "
                    />
                </Figure>
                <div className="flex flex-col gap-2">{children}</div>
            </div>
        </div>
    )
}

export default HeroBanner

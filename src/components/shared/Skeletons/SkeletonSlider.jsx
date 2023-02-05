import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SkeletonCard from "./SkeletonCard"

const SkeletonSlider = () => {
    return (
        <Swiper breakpoints={swiperBreakpoints} className="container pb-10">
            {[1, 2, 3, 4, 5].map((item) => (
                <SwiperSlide>
                    <SkeletonCard key={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SkeletonSlider

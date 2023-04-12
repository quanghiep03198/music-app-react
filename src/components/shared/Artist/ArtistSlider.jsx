import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import { useRef } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FreeMode, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Button from "../../customs/@core/Button"
import SkeletonCard from "../Skeletons/SkeletonCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import ArtistCard from "./ArtistCard"

const ArtistSlider = ({ data, status }) => {
    const nextButtonRef = useRef(null)
    const prevButtonRef = useRef(null)

    return (
        <div className="relative">
            <Swiper
                navigation={{
                    prevEl: ".artist-slide-prev-btn",
                    nextEl: ".artist-slide-next-btn"
                }}
                speed={700}
                modules={[Navigation, FreeMode]}
                freeMode={true}
                lazy={true}
                breakpoints={swiperBreakpoints}
                className="artists-slide container pb-10">
                {status.isFetching &&
                    [1, 2, 3, 4, 5].map((item) => (
                        <SwiperSlide key={item}>
                            <SkeletonCard />
                        </SwiperSlide>
                    ))}
                {Array.isArray(data) &&
                    data.map((artist) => (
                        <SwiperSlide key={artist._id}>
                            <ArtistCard artistData={artist} />
                        </SwiperSlide>
                    ))}
            </Swiper>
            <Button shape="circle" size="sm" className="artist-slide-prev-btn absolute top-1/2 left-0 z-[999] text-base" ref={prevButtonRef}>
                <BsArrowLeft />
            </Button>
            <Button shape="circle" size="sm" className="artist-slide-next-btn next-button absolute top-1/2 right-0 z-[999] text-base" ref={nextButtonRef}>
                <BsArrowRight />
            </Button>
        </div>
    )
}

export default ArtistSlider

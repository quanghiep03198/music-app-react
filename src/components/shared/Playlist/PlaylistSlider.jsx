import { LoadingWrapper } from "@/App"
import Loading from "@/components/customs/atoms/Loading"
import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { Fragment, useRef } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FreeMode, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Button from "../../customs/atoms/Button"
import SkeletonCard from "../Skeletons/SkeletonCard"
import PlaylistCard from "./PlaylistCard"

const PlaylistSlider = ({ data, status }) => {
    return (
        <div className="relative">
            <Swiper
                navigation={{
                    prevEl: ".playlist-prev-button",
                    nextEl: ".playlist-next-button"
                }}
                speed={700}
                modules={[Navigation, FreeMode]}
                freeMode={true}
                lazy={true}
                slidesPerView="auto"
                breakpoints={swiperBreakpoints}
                className="playlist-slide container pb-10"
            >
                {status.isFetching &&
                    [1, 2, 3, 4, 5].map((item) => (
                        <SwiperSlide key={item}>
                            <SkeletonCard />
                        </SwiperSlide>
                    ))}
                {Array.isArray(data) &&
                    data.map((playlist) => (
                        <SwiperSlide key={playlist?._id}>
                            <PlaylistCard playlist={playlist} />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <Button shape="circle" size="sm" className="playlist-prev-button absolute top-1/2 left-0 z-[999] -translate-y-1/2 text-base">
                <BsArrowLeft />
            </Button>

            <Button shape="circle" size="sm" className="playlist-next-button absolute top-1/2 right-0 z-[999] -translate-y-1/2 text-base">
                <BsArrowRight />
            </Button>
        </div>
    )
}

export default PlaylistSlider

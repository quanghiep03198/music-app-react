import { useFetchAlbumsQuery } from "@/app/redux/api/albumApi"
import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import { lazy, Suspense, useId, useRef } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Button from "../../customs/Atomics/Button"

import Loading from "../../customs/Atomics/Loading"
import CardSkeleton from "../Skeletons/Card"

// const AlbumCard = lazy(() => import("./AlbumCard"));
import AlbumCard from "./AlbumCard"

const AlbumSlider = () => {
    const { data, isLoading, isFetching } = useFetchAlbumsQuery({
        skip: 0,
        limit: 10
    })
    const swiperRef = useRef()

    return (
        <div className="relative">
            <Swiper
                navigation={{
                    prevEl: `.album-slide-prev-btn`,
                    nextEl: `.album-slide-next-btn`
                }}
                speed={700}
                modules={[Navigation]}
                breakpoints={swiperBreakpoints}
                ref={swiperRef}
                className="album-slide container"
            >
                {Array.isArray(data) &&
                    data.map((album) => (
                        <SwiperSlide key={album?._id}>
                            {/* <Suspense fallback={<CardSkeleton />}> */}
                            <AlbumCard album={album} />
                            {/* </Suspense> */}
                        </SwiperSlide>
                    ))}
            </Swiper>

            <Button
                shape="circle"
                color="success"
                size="sm"
                className="album-slide-prev-btn absolute top-1/2 left-0 z-[999] -translate-y-1/2 text-base"
            >
                <BsArrowLeft />
            </Button>

            <Button
                shape="circle"
                color="success"
                size="sm"
                className="album-slide-next-btn absolute top-1/2 right-0 z-[999] -translate-y-1/2 text-base"
                // ref={nextButtonRef}
            >
                <BsArrowRight />
            </Button>
        </div>
    )
}

export default AlbumSlider

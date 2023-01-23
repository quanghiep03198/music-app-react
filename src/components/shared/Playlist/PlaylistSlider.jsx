import { useFetchUserPlaylistsQuery } from "@/app/redux/api/playlistApi"
import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import { lazy, Suspense, useRef } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Button from "../../customs/Atomics/Button"
import CardSkeleton from "../Skeletons/Card"
const PlaylistCard = lazy(() => import("./PlaylistCard"))

const PlaylistSlider = () => {
    const { data, isFetching, isLoading } = useFetchUserPlaylistsQuery({
        userId: import.meta.env.VITE_ADMIN_ID,
        skip: 0,
        limit: 10
    })

    const swiperRef = useRef(null)

    return (
        <div className="relative">
            <Swiper
                navigation={{
                    prevEl: ".playlist-prev-button",
                    nextEl: ".playlist-next-button"
                }}
                speed={700}
                slidesPerGroupSkip={1}
                modules={[Navigation]}
                breakpoints={swiperBreakpoints}
                className="playlist-slide container pb-10"
                ref={swiperRef}
            >
                {Array.isArray(data) &&
                    data.map((playlist) => (
                        <SwiperSlide key={playlist?._id}>
                            <Suspense fallback={<CardSkeleton mask="square" />}>
                                <PlaylistCard playlist={playlist} />
                            </Suspense>
                        </SwiperSlide>
                    ))}
            </Swiper>

            <Button
                shape="circle"
                color="success"
                size="sm"
                className="playlist-prev-button absolute top-1/2 left-0 z-[999] -translate-y-1/2 text-base"
            >
                <BsArrowLeft />
            </Button>

            <Button
                shape="circle"
                color="success"
                size="sm"
                className="playlist-next-button absolute top-1/2 right-0 z-[999] -translate-y-1/2 text-base"
            >
                <BsArrowRight />
            </Button>
        </div>
    )
}

export default PlaylistSlider

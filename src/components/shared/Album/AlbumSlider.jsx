import swiperBreakpoints from "@/config/swiperBreakpoint.config"
import { lazy, Suspense, useRef } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FreeMode, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import SkeletonCard from "../Skeletons/SkeletonCard"
import { Button } from "react-daisyui"

const AlbumCard = lazy(() => import("./AlbumCard"))

const AlbumSlider = ({ data, status }) => {
   const swiperRef = useRef()
   return (
      <div className="relative">
         <Swiper
            navigation={{
               prevEl: `.album-slide-prev-btn`,
               nextEl: `.album-slide-next-btn`
            }}
            speed={700}
            modules={[Navigation, FreeMode]}
            freeMode={true}
            lazy={true}
            breakpoints={swiperBreakpoints}
            ref={swiperRef}
            className="album-slide container pb-10">
            {Array.isArray(data) &&
               data.map((album) => (
                  <SwiperSlide key={album?._id}>
                     <Suspense fallback={<SkeletonCard mask="square" />}>
                        <AlbumCard albumData={album} />
                     </Suspense>
                  </SwiperSlide>
               ))}
         </Swiper>

         <Button shape="circle" size="sm" className="album-slide-prev-btn absolute left-0 top-1/2 z-[999] -translate-y-1/2 text-base">
            <BsArrowLeft />
         </Button>

         <Button shape="circle" size="sm" className="album-slide-next-btn absolute right-0 top-1/2 z-[999] -translate-y-1/2 text-base">
            <BsArrowRight />
         </Button>
      </div>
   )
}

export default AlbumSlider

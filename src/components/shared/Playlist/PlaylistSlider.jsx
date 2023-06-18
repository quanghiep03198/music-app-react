import swiperBreakpoints from "@/configs/swiperBreakpoint.config"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FreeMode, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import SkeletonCard from "../Skeletons/SkeletonCard"
import PlaylistCard from "./PlaylistCard"
import { Button } from "react-daisyui"

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
            className="playlist-slide container pb-10">
            {status.isFetching &&
               [1, 2, 3, 4, 5].map((item) => (
                  <SwiperSlide key={item}>
                     <SkeletonCard />
                  </SwiperSlide>
               ))}
            {Array.isArray(data) &&
               data.map((playlist) => (
                  <SwiperSlide key={playlist?._id}>
                     <PlaylistCard data={playlist} isFetching={status.isFetching} />
                  </SwiperSlide>
               ))}
         </Swiper>

         <Button shape="circle" size="sm" className="playlist-prev-button absolute left-0 top-1/2 z-[999] -translate-y-1/2 text-base">
            <BsArrowLeft />
         </Button>

         <Button shape="circle" size="sm" className="playlist-next-button absolute right-0 top-1/2 z-[999] -translate-y-1/2 text-base">
            <BsArrowRight />
         </Button>
      </div>
   )
}

export default PlaylistSlider

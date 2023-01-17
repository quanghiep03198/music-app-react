import { useFetchArtistsQuery } from "@/app/redux/api/artistApi";
import ErrorBoundary from "@/components/customs/ErrorBoundary";
import { useRef } from "react";
import { BsArrowLeft, BsArrowLeftShort, BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import { Navigation, Controller } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import ArtistCard from "./ArtistCard";

const ArtistSlide = () => {
	const { data, isFetching } = useFetchArtistsQuery({ skip: 0, limit: 10 });
	const swiper = useSwiper();
	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);
	return (
		<ErrorBoundary>
			<div className="relative">
				<Swiper
					navigation={{
						// Both prevEl & nextEl are null at render so this does not work
						prevEl: navigationPrevRef.current,
						nextEl: navigationNextRef.current,
					}}
					modules={[Navigation, Controller]}
					breakpoints={{
						375: {
							slidesPerView: 2,
							spaceBetween: 20,
							slidesPerGroup: 2,
						},
						600: {
							slidesPerView: 3,
							spaceBetween: 18,
							slidesPerGroup: 3,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 36,
							slidesPerGroup: 3,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 48,
							slidesPerGroup: 3,
						},
						1366: {
							slidesPerView: 4,
							spaceBetween: 48,
							slidesPerGroup: 5,
						},
						1920: {
							slidesPerView: 5,
							spaceBetween: 48,
							slidesPerGroup: 5,
						},
					}}
					className="artists-slide container "
				>
					{Array.isArray(data) &&
						data.map((artist) => (
							<SwiperSlide key={artist._id}>
								<ArtistCard artistData={artist} />
							</SwiperSlide>
						))}
				</Swiper>
				<button
					className="btn-success btn-circle btn absolute top-1/2 left-0 z-[999] text-base font-medium"
					ref={navigationPrevRef}
				>
					<BsArrowLeft />
				</button>
				<button
					className="btn-success btn-circle btn absolute top-1/2 right-0 z-[999] text-base"
					ref={navigationNextRef}
				>
					<BsArrowRight />
				</button>
			</div>
		</ErrorBoundary>
	);
};

export default ArtistSlide;

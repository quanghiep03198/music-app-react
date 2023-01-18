import { useFetchArtistsQuery } from "@/app/redux/api/artistApi";
import ErrorBoundary from "@/components/customs/ErrorBoundary";
import swiperBreakpoints from "@/config/swiperBreakpoint.config";
import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Atomics/Button";
import ArtistCard from "./ArtistCard";

const ArtistSlider = () => {
	const { data, isFetching } = useFetchArtistsQuery({ skip: 0, limit: 10 });
	const swiperRef = useRef();

	return (
		<ErrorBoundary>
			<div className="relative">
				<Swiper
					modules={[Navigation]}
					breakpoints={swiperBreakpoints}
					className="artists-slide container"
					ref={swiperRef}
				>
					{Array.isArray(data) &&
						data.map((artist) => (
							<SwiperSlide key={artist._id}>
								<ArtistCard artistData={artist} />
							</SwiperSlide>
						))}
				</Swiper>
				<Button
					shape="circle"
					color="success"
					size="sm"
					className="absolute top-1/2 left-0 z-[999] text-base"
					onClick={() => swiperRef.current.swiper.slidePrev(500)}
				>
					<BsArrowLeft />
				</Button>
				<Button
					shape="circle"
					color="success"
					size="sm"
					className="absolute top-1/2 right-0 z-[999] text-base"
					onClick={() => swiperRef.current.swiper.slideNext(500)}
				>
					<BsArrowRight />
				</Button>
			</div>
		</ErrorBoundary>
	);
};

export default ArtistSlider;

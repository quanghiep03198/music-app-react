import { useFetchArtistsQuery } from "@/app/redux/api/artistApi";
import ErrorBoundary from "@/components/customs/ErrorBoundary";
import swiperBreakpoints from "@/config/swiperBreakpoint.config";
import { lazy, Suspense, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Atomics/Button";
import CardSkeleton from "../Skeletons/Card";

// const ArtistCard = lazy(() => import("./ArtistCard"));
import ArtistCard from "./ArtistCard";

const ArtistSlider = () => {
	const { data, isFetching } = useFetchArtistsQuery({ skip: 0, limit: 10 });
	const swiperRef = useRef();
	const nextButtonRef = useRef(null);
	const prevButtonRef = useRef(null);
	return (
		<div className="relative">
			<Swiper
				navigation={{
					prevEl: "#artist-slide-prev-btn",
					nextEl: "#artist-slide-next-btn",
				}}
				speed={700}
				modules={[Navigation]}
				breakpoints={swiperBreakpoints}
				className="artists-slide container"
				ref={swiperRef}
			>
				{Array.isArray(data) &&
					data.map((artist) => (
						<SwiperSlide key={artist._id}>
							{/* <Suspense fallback={<CardSkeleton />}> */}
							<ArtistCard artistData={artist} />
							{/* </Suspense> */}
						</SwiperSlide>
					))}
			</Swiper>
			<Button
				shape="circle"
				color="success"
				size="sm"
				id="artist-slide-prev-btn"
				className="prev-button absolute top-1/2 left-0 z-[999] text-base"
				ref={prevButtonRef}
			>
				<BsArrowLeft />
			</Button>
			<Button
				shape="circle"
				color="success"
				size="sm"
				id="artist-slide-next-btn"
				className="next-button absolute top-1/2 right-0 z-[999] text-base"
				ref={nextButtonRef}
			>
				<BsArrowRight />
			</Button>
		</div>
	);
};

export default ArtistSlider;

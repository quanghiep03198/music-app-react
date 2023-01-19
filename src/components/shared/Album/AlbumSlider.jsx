import { useFetchAlbumsQuery } from "@/app/redux/api/albumApi";
import swiperBreakpoints from "@/config/swiperBreakpoint.config";
import { lazy, Suspense, useId, useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Atomics/Button";

import Loading from "../Atomics/Loading";
import CardSkeleton from "../Skeletons/Card";

const AlbumCard = lazy(() => import("./AlbumCard"));

const AlbumSlider = () => {
	const { data, isLoading, isFetching } = useFetchAlbumsQuery({ skip: 0, limit: 10 });
	const swiperRef = useRef();
	const nextButtonRef = useRef();
	const prevButtonRef = useRef();
	const nextButtonId = useId();
	const prevButtonId = useId();
	return (
		<div className="relative">
			{isFetching && <Loading />}
			<Swiper
				navigation={{
					prevEl: `.album-slide-prev-btn`,
					nextEl: `.album-slide-next-btn`,
				}}
				speed={500}
				modules={[Navigation]}
				breakpoints={swiperBreakpoints}
				ref={swiperRef}
				className="album-slide container"
			>
				{Array.isArray(data) &&
					data.map((album) => (
						<SwiperSlide key={album?._id}>
							<Suspense fallback={<CardSkeleton />}>
								<AlbumCard album={album} />
							</Suspense>
						</SwiperSlide>
					))}
			</Swiper>
			{data && data.length >= 5 && (
				<Button
					shape="circle"
					color="success"
					size="sm"
					id={prevButtonId}
					className="album-slide-prev-btn absolute top-1/2 left-0 z-[999] -translate-y-1/2 text-base"
					onClick={() => swiperRef.current.swiper.slidePrev(500)}
					// ref={prevButtonRef}
				>
					<BsArrowLeft />
				</Button>
			)}
			{data && data.length >= 5 && (
				<Button
					shape="circle"
					color="success"
					size="sm"
					id={nextButtonId}
					className="album-slide-next-btn absolute top-1/2 right-0 z-[999] -translate-y-1/2 text-base"
					onClick={() => swiperRef.current.swiper.slideNext(500)}
					// ref={nextButtonRef}
				>
					<BsArrowRight />
				</Button>
			)}
		</div>
	);
};

export default AlbumSlider;

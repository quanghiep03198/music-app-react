import { useFetchAlbumsQuery } from "@/app/redux/api/albumApi";
import swiperBreakpoints from "@/config/swiperBreakpoint.config";
import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../Atomics/Button";
import Loading from "../Atomics/Loading";
import AlbumCard from "./AlbumCard";

const AlbumSlider = () => {
	const { data, isLoading, isFetching } = useFetchAlbumsQuery({ skip: 0, limit: 10 });
	const swiperRef = useRef();

	return (
		<div className="relative">
			{isFetching && <Loading />}
			{isLoading && <Loading />}
			<Swiper modules={[Navigation]} breakpoints={swiperBreakpoints} ref={swiperRef} className="album-slide container">
				{Array.isArray(data) &&
					data.map((album) => (
						<SwiperSlide key={album?._id}>
							<AlbumCard album={album} />
						</SwiperSlide>
					))}
			</Swiper>
			{data && data.length >= 5 && (
				<Button
					shape="circle"
					color="success"
					size="sm"
					className="absolute top-1/2 left-0 z-[999] -translate-y-1/2 text-base"
					onClick={() => swiperRef.current.swiper.slidePrev(500)}
				>
					<BsArrowLeft />
				</Button>
			)}
			{data && data.length >= 5 && (
				<Button
					shape="circle"
					color="success"
					size="sm"
					className="absolute top-1/2 right-0 z-[999] -translate-y-1/2 text-base"
					onClick={() => swiperRef.current.swiper.slideNext(500)}
				>
					<BsArrowRight />
				</Button>
			)}
		</div>
	);
};

export default AlbumSlider;

import { useFetchUserPlaylistsQuery } from "@/app/redux/api/playlistApi";
import PlaylistCard from "./PlaylistCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Navigation } from "swiper";
import Button from "../Atomics/Button";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import swiperBreakpoints from "@/config/swiperBreakpoint.config";

const PlaylistSlider = () => {
	console.log(import.meta.env.VITE_ADMIN_ID);
	const { data, isFetching, isLoading } = useFetchUserPlaylistsQuery({
		userId: import.meta.env.VITE_ADMIN_ID,
		skip: 0,
		limit: 10,
	});
	console.log(data);
	const swiperRef = useRef(null);
	return (
		<div className="relative">
			<Swiper
				modules={[Navigation]}
				breakpoints={swiperBreakpoints}
				className="playlist-slide container "
				ref={swiperRef}
			>
				{Array.isArray(data) &&
					data.map((playlist) => (
						<SwiperSlide key={playlist?._id}>
							<PlaylistCard playlist={playlist} />
						</SwiperSlide>
					))}
			</Swiper>
			{data && data.length > 5 && (
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
			{data && data.length > 5 && (
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

export default PlaylistSlider;

import swiperBreakpoints from "@/config/swiperBreakpoint.config";
import React, { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide, Navigation } from "swiper/react";
import Button from "./Button";

const Slider = ({ data, render }) => {
	const swiperRef = useRef();

	return (
		<div className="relative">
			<Swiper modules={[Navigation]} breakpoints={swiperBreakpoints} className="container">
				{render()}
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

export default Slider;

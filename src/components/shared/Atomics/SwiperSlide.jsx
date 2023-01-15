import tw from "tailwind-styled-components";
export const SwiperSlideContainer = tw.div`swiper`;
export const SwiperSlideWrapper = tw.div`swiper-wrapper container pb-10`;
export const SwiperSlide = tw.div`swiper-slide`;
export const SwiperButtonNext = tw.div`swiper-button-next right-5`;
export const SwiperButtonPrev = tw.div`swiper-button-prev right-5`;

const Slide = ({ data, config, render }) => {
	return (
		<SwiperSlideContainer className="artist-slider">
			<SwiperSlideWrapper>{render}</SwiperSlideWrapper>
			{/* slide buttons */}
			<SwiperButtonNext>
				<BsArrowLeftShort />
			</SwiperButtonNext>
			<SwiperButtonPrev>
				<BsArrowRightShort />
			</SwiperButtonPrev>
		</SwiperSlideContainer>
	);
};

export default Slide;

import { useFetchArtistsQuery } from "@/app/redux/api/playlistApi";
import Swiper from "swiper";
// import Swiper and modules styles
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import ArtistCard from "./ArtistCard";

const swiper = new Swiper(".artist-slider", {
	modules: [Navigation, Pagination],
	loop: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
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
	},
});

// export const SwiperSlideContainer = tw.div`swiper`;
// export const SwiperSlideWrapper = tw.div`swiper-wrapper container pb-10`;
// export const SwiperSlide = tw.div`swiper-slide`;
// export const SwiperButtonNext = tw.div`swiper-button-next right-5`;
// export const SwiperButtonPrev = tw.div`swiper-button-prev right-5`;

const ArtistSlide = () => {
	const artists = useFetchArtistsQuery();

	return (
		<Swiper>
			{Array.isArray(artists) &&
				artists.map((artist) => <SwiperSlide>{<ArtistCard artistData={artist} />}</SwiperSlide>)}
		</Swiper>
	);
};

export default ArtistSlide;

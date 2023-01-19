import tw from "tailwind-styled-components";

export const Card = tw.div`group card w-full bg-base-300 p-4 shadow-xl hover:bg-neutral`;
export const Figure = tw.figure`relative rounded-lg mask ${(props) => {
	switch (props.mask) {
		case "square":
			return "mask-square";
		case "circle":
			return "mask-circle";
		case "triangle":
			return "mask-triangle";
		case "start":
			return "mask-star";
		case "heart":
			return "mask-heart";
		default:
			return "mask-square";
	}
}}`;
export const CardTitle = tw.h1`card-title sm:text-base`;
export const CardBody = tw.div`card-body p-4`;
export const CardAction = tw.div`card-actions`;
export const FigureSkeleton = tw.div`mask mask-square w-full h-60 bg-neutral rounded-lg`;
export const CardTitleSkeleton = tw.h1`w-full h-2 rounded-full bg-neutral animate-pulse`;
export const CardTextSkeleton = tw.h1`w-1/2 h-2 rounded-full bg-neutral animate-pulse`;

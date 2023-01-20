import tw from "tailwind-styled-components";

const Loading = tw.div`loading ${(props) => {
	switch (props.size) {
		case "sm":
			return "loading-sm";
		case "md":
			return "loading-md";
		case "lg":
			return "loading-lg";
		default:
			return "loading-sm";
	}
}}`;
export default Loading;

import tw from "tailwind-styled-components";

const Grid = tw.div`grid ${(props) => `grid-cols-${props.template}`}`;

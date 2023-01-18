import React, { useContext } from "react";
import { BsPlayFill } from "react-icons/bs";
import tw from "tailwind-styled-components";
import Button from "./Button";

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

import React from "react";
import tw from "tailwind-styled-components";
export const MenuItem = ({ children, onClick }) => {
	return (
		<li onClick={onClick} className="truncate">
			<a role="menuitem">{children}</a>
		</li>
	);
};
export const Menu = tw.ul`menu p-1 ${(props) => {
	switch (props.direction) {
		case "vertical":
			return "vertical-menu";
		case "horizontal":
			return "horizontal-menu";
		default:
			return "vertical-menu";
	}
}}`;

import React from "react"
import tw from "tailwind-styled-components"
import Button from "./Button"

export const Dropdown = tw.div`dropdown ${(props) => {
    switch (props.position) {
        case "end":
            return "dropdown-end"
        case "right":
            return "dropdown-right dropdown-end"
        case "right-end":
            return "dropdown-right dropdown-end"
        case "left":
            return "dropdown-left"
        case "left-end":
            return "dropdown-left dropdown-end"
        case "top":
            return "dropdown-top"
        case "top-end":
            return "dropdown-top dropdown-end"
        case "bottom":
            return "dropdown-bottom"
        case "bottom-end":
            return "dropdown-bottom dropdown-end"
        default:
            return ""
    }
}}
	`
export const DropdownContent = tw.div`dropdown-content w-fit rounded-box`
// const Dropdown = ({
// 	children,
// 	dropdownButtonElement,
// 	buttonSize = "sm",
// 	buttonShape = "square",
// 	buttonColor = "transparent",
// }) => {
// 	return (
// 		<DropdownWrapper>
// 			<Button role="none" size={buttonSize} shape={buttonShape} color={buttonColor} tabIndex={0}>
// 				{dropdownButtonElement}
// 			</Button>
// 			<div tabIndex={0} className="dropdown-content w-fit">
// 				{children}
// 			</div>
// 		</DropdownWrapper>
// 	);
// };

// export default Dropdown;

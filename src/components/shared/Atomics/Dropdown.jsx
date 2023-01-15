import React from "react";
import tw from "tailwind-styled-components";

const DropdownWrapper = tw.div`dropdown`;

const Dropdown = ({
	children,
	dropdownButtonElement,
	buttonStyle,
	verticalPosition = "dropdown-bottom",
	horizontalPostion = "dropdown-end",
	gap = 6,
}) => {
	return (
		<DropdownWrapper className={`${verticalPosition} ${horizontalPostion} py-${gap}`}>
			<label tabIndex={0} className={`${buttonStyle}`}>
				{dropdownButtonElement}
			</label>
			<div tabIndex={0} className="dropdown-content w-fit">
				{children}
			</div>
		</DropdownWrapper>
	);
};

export default Dropdown;

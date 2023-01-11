import React from "react";

const Swap = ({ tw, swapOn, swapOff, checked, handleChange }) => {
	return (
		<label className={`swap  ${tw}`}>
			<input type="checkbox" checked={checked} onChange={(e) => handleChange(e)} />
			<div className="swap-on">{swapOn}</div>
			<div className="swap-off">{swapOff}</div>
		</label>
	);
};

export default Swap;

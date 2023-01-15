import React, { useEffect, useId, useRef, useState } from "react";

const InputRange = ({ max = 100, step = 1, handleChange, inputRef, labelRef = "#" }) => {
	const rangeProcessRef = useRef(null);

	useEffect(() => {
		rangeProcessRef.current.style.width = `${100 * (inputRef.current.value / max)}%`;
	});

	const onChange = (e) => {
		inputRef.current.value = e.target.value;
		rangeProcessRef.current.style.width = `${100 * (e.target.value / max)}%`;
		if (handleChange) {
			handleChange();
		}
	};

	return (
		<div className="range-container group self-center">
			<div className="range-progress group-hover:bg-success" ref={rangeProcessRef}></div>
			<input
				id={labelRef}
				type="range"
				min="0"
				className="my-range w-[-webkit-fill-available]"
				step={step}
				max={max}
				ref={inputRef}
				onInput={(e) => onChange(e)}
			/>
		</div>
	);
};

export default InputRange;

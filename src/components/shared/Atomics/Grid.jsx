import React from "react";

export const GridItem = ({ children, colSpan, tw }) => {
	return <div>{children}</div>;
};
export const Grid = ({ children, templateColumn, direction, gap }) => {
	return <div className={`grid grid-cols-${template}`}>{children}</div>;
};

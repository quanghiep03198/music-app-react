import React from "react";

export const MenuItem = ({ children, tw, handleClick }) => {
	return (
		<li className={`${tw}`} onClick={handleClick}>
			<p role="listitem" className="truncate break-words">
				{children}
			</p>
		</li>
	);
};

export const Menu = ({ children, horizontal, tw }) => {
	return (
		<ul className={`hover-bordered menu  p-1 ${horizontal ? "menu-horizontal" : "menu-vertical"} ${tw}`}>{children}</ul>
	);
};

import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { Menu, MenuItem } from "../Atomics/Menu";
import Logo from "/images/logo.png";
import SidebarMenu from "./SidebarMenu";

const DrawerSidebar = tw.aside`drawer-side`;
const DrawerOverlay = tw.label`drawer-overlay`;
const DrawerSideWrapper = tw.div`p-2 bg-neutral w-fit`;
const LogoImage = tw.img`max-w-[240px] h-[120px] object-contain -translate-x-2`;

const Sidebar = () => {
	return (
		<DrawerSidebar>
			<DrawerOverlay htmlFor="sidebar-toggle" />
			<DrawerSideWrapper>
				<Link to="/">
					<LogoImage src={Logo} alt="" />
				</Link>
				<SidebarMenu />
				<div className="divider"></div>
				<Menu>{/* user playlists */}</Menu>
			</DrawerSideWrapper>
		</DrawerSidebar>
	);
};

export default Sidebar;

import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { Menu } from "../Atomics/Menu";
import SidebarMenu from "./SidebarMenu";
import Logo from "/images/logo.png";

const DrawerSidebar = tw.aside`drawer-side`;
const DrawerOverlay = tw.label`drawer-overlay`;
const DrawerSideWrapper = tw.div`p-2 bg-neutral w-fit`;
const LogoImage = tw.img`max-w-[240px] h-[120px] object-contain -translate-x-2`;
import { memo } from "react";

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

export default memo(Sidebar);

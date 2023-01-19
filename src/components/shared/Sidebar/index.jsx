import { Link, useLocation } from "react-router-dom";
import tw from "tailwind-styled-components";
import { Menu, MenuItem } from "../Atomics/Menu";
import SidebarMenu from "./SidebarMenu";
import Logo from "/images/logo.png";

const DrawerSidebar = tw.aside`drawer-side`;
const DrawerOverlay = tw.label`drawer-overlay`;
const DrawerSideWrapper = tw.div`p-2 bg-base-300 w-fit`;
const LogoImage = tw.img`max-w-[240px] h-[120px] object-contain -translate-x-2`;
import { memo, useEffect, useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";

const Sidebar = () => {
	const overlayRef = useRef(null);
	const { pathname } = useLocation();
	useEffect(() => {
		overlayRef.current.click();
	}, [pathname]);

	return (
		<DrawerSidebar>
			<DrawerOverlay htmlFor="sidebar-toggle" ref={overlayRef} />
			<DrawerSideWrapper>
				<Link to="/">
					<LogoImage src={Logo} alt="" />
				</Link>
				{<SidebarMenu />}
				<div className="divider"></div>
				<Menu>
					{/* <MenuItem>
						<BsCloudUpload className="text-xl" /> Upload
					</MenuItem> */}
				</Menu>
			</DrawerSideWrapper>
		</DrawerSidebar>
	);
};

export default memo(Sidebar);

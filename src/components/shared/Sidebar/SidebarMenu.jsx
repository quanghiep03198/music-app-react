import { AppContext } from "@/components/context/AppProvider";
import { useContext } from "react";
import { BiLibrary } from "react-icons/bi";
import { BsHeart, BsHouse, BsSearch } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, MenuItem } from "../Atomics/Menu";

const SidebarMenu = () => {
	return (
		<Menu horizontal={false} tw={"min-w-[320px] text-lg"}>
			{/* #each */}
			<NavLink
				to="/"
				end
				accessKey=""
				className={({ isActive }) => {
					return isActive ? "text-success" : "text-base-content";
				}}
			>
				<MenuItem>
					<BsHouse className="text-xl" /> Home
				</MenuItem>
			</NavLink>

			<NavLink
				to="/liked-tracks"
				end
				className={({ isActive }) => {
					return isActive ? "text-success" : "text-base-content";
				}}
			>
				<MenuItem>
					<BsHeart className="text-xl" />
					Liked tracks
				</MenuItem>
			</NavLink>
			<NavLink
				to="/library"
				end
				className={({ isActive }) => {
					return isActive ? "text-success" : "text-base-content";
				}}
			>
				<MenuItem>
					<BiLibrary className="text-xl" />
					Library
				</MenuItem>
			</NavLink>
		</Menu>
	);
};

export default SidebarMenu;

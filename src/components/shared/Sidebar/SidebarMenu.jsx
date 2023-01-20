import { BiLibrary } from "react-icons/bi";
import { BsHeart, BsHouse } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
	return (
		<ul className="menu min-w-[320px] text-lg sm:text-base">
			<li>
				<NavLink
					to="/"
					className={({ isActive }) => {
						return isActive ? "text-success" : "text-base-content";
					}}
				>
					<BsHouse aria-hidden className="text-xl" /> Home
				</NavLink>
			</li>

			<li>
				<NavLink
					to="/liked-tracks"
					className={({ isActive }) => {
						return isActive ? "text-success" : "text-base-content";
					}}
				>
					<BsHeart aria-hidden className="text-xl" />
					Liked tracks
				</NavLink>
			</li>

			<li>
				<NavLink
					to="/library"
					className={({ isActive }) => {
						return isActive ? "text-success" : "text-base-content";
					}}
				>
					<BiLibrary aria-hidden className="text-xl" />
					Library
				</NavLink>
			</li>
		</ul>
	);
};

export default SidebarMenu;

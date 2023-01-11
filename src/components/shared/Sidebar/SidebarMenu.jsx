import React from "react";
import { Menu, MenuItem } from "../Atoms/Menu";
import { BsHouse, BsCloudUpload } from "react-icons/bs";
import { BiHeart, BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";
const SidebarMenu = () => {
	return (
		<Menu horizontal={false} tw={"min-w-[320px] text-lg"}>
			{/* #each */}
			<Link to="/" className="">
				<MenuItem>
					<BsHouse className="text-xl" /> Home
				</MenuItem>
			</Link>
			<Link to="/liked-tracks">
				<MenuItem>
					<BiHeart className="text-xl" />
					Liked tracks
				</MenuItem>
			</Link>
			<Link to="/library">
				<MenuItem>
					<BiLibrary className="text-xl" />
					Library
				</MenuItem>
			</Link>
			<MenuItem>
				<BsCloudUpload className="text-xl" /> Upload
			</MenuItem>
		</Menu>
	);
};

export default SidebarMenu;

import { AppContext } from "@/context/AppProvider";
import { useContext } from "react";
import { BsList, BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, NavLink, useMatches } from "react-router-dom";
import tw from "tailwind-styled-components";
import PageNavigator from "./PageNavigator";
import SearchBox from "./SearchBox";
import UserController from "./UserController";

const NavbarWrapper = tw.nav`navbar justify-between items-center p-5 bg-base-300/70`;
const Navbar = () => {
	const user = useSelector((state) => {
		return state.user;
	});

	return (
		<NavbarWrapper>
			<div className="flex items-center gap-4">
				<PageNavigator />
				<SearchBox />
			</div>
			<div className="flex items-center gap-4">
				<label htmlFor="sidebar-toggle" className="btn-circle btn hidden sm:inline-flex sm:btn-sm">
					<BsList aria-hidden />
				</label>
				{user !== null ? (
					<UserController />
				) : (
					<NavLink to="/login" className="btn-circle btn text-xl sm:btn-sm">
						<BsPerson aria-hidden />
					</NavLink>
				)}
			</div>
		</NavbarWrapper>
	);
};

export default Navbar;

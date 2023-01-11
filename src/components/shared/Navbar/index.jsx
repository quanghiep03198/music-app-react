import React from "react";
import { BsList, BsPerson, BsPower } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import PageNavigator from "./PageNavigator";
import SearchBox from "./SearchBox";
import UserController from "./UserController";

const NavbarWrapper = tw.nav`navbar justify-between items-center p-5 bg-base-200`;
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
				<label htmlFor="sidebar-toggle" className="hidden sm:inline-flex btn btn-circle">
					<BsList />
				</label>
				{user !== null ? (
					<UserController />
				) : (
					<Link to="/login" className="btn btn-circle text-xl">
						<BsPerson aria-hidden />
					</Link>
				)}
			</div>
		</NavbarWrapper>
	);
};

export default Navbar;

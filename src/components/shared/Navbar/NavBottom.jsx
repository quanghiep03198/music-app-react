import React from "react";
import { BiLibrary } from "react-icons/bi";
import { BsHeart, BsHouse, BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

const NavBottom = () => {
   return (
      <div className="btm-nav relative hidden bg-base-300 text-xl font-medium sm:flex [&>*:active]:bg-neutral">
         <NavLink to="/">
            <BsHouse />
         </NavLink>
         <NavLink to="/library">
            <BiLibrary />
         </NavLink>
         <NavLink to="/search">
            <BsSearch />
         </NavLink>
         <NavLink to="/liked-tracks">
            <BsHeart />
         </NavLink>
      </div>
   );
};

export default NavBottom;

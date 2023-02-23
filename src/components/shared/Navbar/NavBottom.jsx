import React from "react"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsHouse, BsSearch } from "react-icons/bs"
import { HiOutlineQueueList } from "react-icons/hi2"
import { Link, NavLink } from "react-router-dom"

const NavBottom = () => {
    return (
        <div className="btm-nav relative hidden bg-neutral-focus text-xl font-medium text-neutral-content sm:flex [&>*:where(.active)]:bg-neutral">
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
            <NavLink to="/queue">
                <HiOutlineQueueList />
            </NavLink>
        </div>
    )
}

export default NavBottom

import { MenuItem } from "@/components/customs/Atomics/Menu"
import React, { Fragment } from "react"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsPlusSquareDotted } from "react-icons/bs"
import { NavLink } from "react-router-dom"

const FeaturesMenuWithAuthenticated = () => {
    return (
        <Fragment>
            <MenuItem>
                <NavLink
                    to="/library"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : "text-base-content"
                    }}
                >
                    <BiLibrary aria-hidden className="text-xl" />
                    Library
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink
                    to="/liked-tracks"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : "text-base-content"
                    }}
                >
                    <BsHeart aria-hidden className="text-xl" />
                    Liked tracks
                </NavLink>
            </MenuItem>
            <MenuItem>
                <a role="menuitem">
                    <BsPlusSquareDotted /> Create playlist
                </a>
            </MenuItem>
        </Fragment>
    )
}

export default FeaturesMenuWithAuthenticated

import { MenuItem } from "@/components/customs/atoms/Menu"
import { Fragment } from "react"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsPlusSquareDotted, BsUpload } from "react-icons/bs"
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
                    Liked Tracks
                </NavLink>
            </MenuItem>
            <MenuItem>
                <a role="menuitem">
                    <BsUpload className="text-xl" /> Upload
                </a>
            </MenuItem>
            <MenuItem>
                <label role="menuitem" htmlFor="create-playlist-modal">
                    <BsPlusSquareDotted className="text-xl" /> Create playlist
                </label>
            </MenuItem>
        </Fragment>
    )
}

export default FeaturesMenuWithAuthenticated

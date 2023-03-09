import { MenuItem } from "@/components/customs/@core/Menu"
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
                        return isActive ? "text-success" : ""
                    }}>
                    <BiLibrary aria-hidden className="text-xl" />
                    Library
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink
                    to="/liked-tracks"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                    }}>
                    <BsHeart aria-hidden className="text-xl" />
                    Liked Tracks
                </NavLink>
            </MenuItem>
            <MenuItem>
                <label htmlFor="upload-track-modal" role="menuitem">
                    <BsUpload className="text-xl" /> Upload
                </label>
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

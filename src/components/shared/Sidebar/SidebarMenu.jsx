import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsHouse, BsSearch } from "react-icons/bs"
import { NavLink } from "react-router-dom"

const SidebarMenu = () => {
    return (
        <Menu className="min-w-[320px]">
            <MenuItem>
                <NavLink
                    to="/"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : "text-base-content"
                    }}
                >
                    <BsHouse aria-hidden className="text-xl" /> Home
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink
                    to="/search"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : "text-base-content"
                    }}
                >
                    <BsSearch aria-hidden className="text-xl" /> Search
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
        </Menu>
    )
}

export default SidebarMenu

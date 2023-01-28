import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsHouse, BsPlusSquareDotted, BsSearch } from "react-icons/bs"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import DefaultFeaturesMenu from "./DefaultFeaturesMenu"
import FeaturesMenuWithAuthenticated from "./FeaturesMenuWithAuthenticated"

const SidebarMenu = () => {
    const { userInfo } = useSelector((state) => state.auth)
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
            {userInfo ? (
                <FeaturesMenuWithAuthenticated />
            ) : (
                <DefaultFeaturesMenu />
            )}
        </Menu>
    )
}

export default SidebarMenu

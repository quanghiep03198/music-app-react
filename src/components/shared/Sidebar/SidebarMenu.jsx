import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { BsHouse, BsSearch } from "react-icons/bs"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import DefaultFeaturesMenu from "./DefaultFeaturesMenu"
import FeaturesMenuWithAuthenticated from "./FeaturesMenuWithAuthenticated"

const SidebarMenu = () => {
    const { authenticated } = useSelector((state) => state.auth)
    return (
        <Menu className="min-w-[320px] text-base text-base-content">
            <MenuItem>
                <NavLink
                    to="/"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                    }}
                >
                    <BsHouse aria-hidden className="text-xl" /> Home
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink
                    to="/search"
                    className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                    }}
                >
                    <BsSearch aria-hidden className="text-xl" /> Search
                </NavLink>
            </MenuItem>
            {authenticated ? <FeaturesMenuWithAuthenticated /> : <DefaultFeaturesMenu />}
        </Menu>
    )
}

export default SidebarMenu

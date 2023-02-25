import { logout } from "@/app/slices/authSlice"
import { BsPerson } from "react-icons/bs"
import { HiLogout } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Avatar from "../../customs/atoms/Avatar"
import { Dropdown, DropdownContent } from "../../customs/atoms/Dropdown"
import { Menu, MenuItem } from "../../customs/atoms/Menu"
import DefaultAvatar from "/images/default-avatar.png"

const UserController = ({ user }) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("persist:root")
    }

    return (
        <Dropdown position="bottom-end">
            <button className="flex items-center gap-2" tabIndex={0}>
                <Avatar size="xs">
                    <img src={user?.avatar || DefaultAvatar} />
                </Avatar>
                <span className="badge sm:hidden md:hidden">{user?.username}</span>
            </button>
            <DropdownContent tabIndex={0} className="py-4">
                <Menu className="min-w-[240px] bg-base-300 shadow-xl">
                    <MenuItem>
                        <Link to="/account">
                            <BsPerson /> Account <span className="badge hidden sm:inline-flex md:inline-flex">{user?.username}</span>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <a role="menuitem">
                            <HiLogout /> Logout
                        </a>
                    </MenuItem>
                </Menu>
            </DropdownContent>
        </Dropdown>
    )
}

export default UserController

import { logout } from "@/app/slices/authSlice"
import { BsPerson } from "react-icons/bs"
import { HiLogout } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Avatar from "../../customs/Atomics/Avatar"
import { Dropdown, DropdownContent } from "../../customs/Atomics/Dropdown"
import { Menu, MenuItem } from "../../customs/Atomics/Menu"

const UserController = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <Dropdown position="bottom-end">
            <button className="flex items-center gap-2" tabIndex={0}>
                <Avatar size="xs">
                    <img src={user?.avatar} className="ring-4 ring-neutral" />
                </Avatar>{" "}
                <span className="badge sm:hidden md:hidden">{user?.username}</span>
            </button>
            <DropdownContent tabIndex={0}>
                <Menu className="min-w-[240px] bg-base-300">
                    <MenuItem>
                        <Link to="/account/:id">
                            <BsPerson /> Account <span className="badge hidden sm:inline-flex md:inline-flex">{user?.username}</span>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>
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

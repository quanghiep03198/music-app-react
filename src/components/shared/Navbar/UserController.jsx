import { logout } from "@/app/slices/userSlice"
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
            <Avatar size="md" tabIndex={0} className="online">
                <img src={user?.avatar} />
            </Avatar>
            <DropdownContent tabIndex={0}>
                <Menu className="min-w-[240px] bg-base-300">
                    <MenuItem>
                        <Link to="/account/:id">
                            <BsPerson /> Account{" "}
                            <span className="badge">{user?.username}</span>
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

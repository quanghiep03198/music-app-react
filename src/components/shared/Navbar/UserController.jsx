import React from "react"
import { Link } from "react-router-dom"
import Avatar from "../../customs/Atomics/Avatar"
import { Dropdown, DropdownContent } from "../../customs/Atomics/Dropdown"
import { Menu, MenuItem } from "../../customs/Atomics/Menu"
import { HiLogout } from "react-icons/hi"
const UserController = ({ user }) => {
    return (
        <Dropdown>
            <Avatar imageUrl={user.avatar} tabIndex={0} />
            <DropdownContent tabIndex={0}>
                <Menu>
                    <MenuItem>
                        <Link to="/account/:id">{user.username}</Link>
                    </MenuItem>
                    <MenuItem>
                        <HiLogout /> Logout
                    </MenuItem>
                </Menu>
            </DropdownContent>
        </Dropdown>
    )
}

export default UserController

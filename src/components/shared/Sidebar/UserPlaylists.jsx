import { useFetchUserPlaylistsQuery } from "@/app/api/playlistApi"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import React from "react"
import { BsPlus, BsPlusSquareDotted } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserPlaylists = () => {
    const { authId } = useSelector((state) => state.auth)
    const { data, isFetching } = useFetchUserPlaylistsQuery({
        id: authId,
        query: { skip: 0, limit: 20 }
    })
    console.log(data)
    return (
        <Menu>
            <MenuItem>
                <a role="menuitem">
                    <BsPlusSquareDotted /> Create playlist
                </a>
            </MenuItem>
            {/* <MenuItem>
                <Link to={`/playlist${id}`}></Link>
            </MenuItem> */}
        </Menu>
    )
}

export default UserPlaylists

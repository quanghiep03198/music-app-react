import { useFetchUserPlaylistsQuery } from "@/app/api/playlistApi"
import { CardTextSkeleton } from "@/components/customs/Atomics/Card"
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
    return (
        <Menu>
            {isFetching &&
                [1, 2, 3].map((item) => <CardTextSkeleton key={item} />)}
            {Array.isArray(data) &&
                data.map((playlist) => (
                    <MenuItem key={playlist?._id}>
                        <Link to={`/playlist/${playlist?._id}`}>
                            {playlist?.title}
                        </Link>
                    </MenuItem>
                ))}
        </Menu>
    )
}

export default UserPlaylists

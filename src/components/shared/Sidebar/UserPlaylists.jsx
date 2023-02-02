import { useFetchUserPlaylistsQuery } from "@/app/services/playlistApi"
import { CardTextSkeleton } from "@/components/customs/atoms/Card"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import React from "react"
import { BsPlus, BsPlusSquareDotted } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserPlaylists = () => {
    const { credential } = useSelector((state) => state.auth)
    const { data, isFetching } = useFetchUserPlaylistsQuery({
        id: credential,
        params: { skip: 0, limit: 20 }
    })
    console.log(data)
    return (
        <div className="scroll max-h-full flex-1 ">
            <Menu>
                {isFetching && [1, 2, 3].map((item) => <CardTextSkeleton key={item} />)}
                {Array.isArray(data) &&
                    data.map((playlist) => (
                        <MenuItem key={playlist?._id}>
                            <Link to={`/playlist/${playlist?._id}`}>{playlist?.title}</Link>
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    )
}

export default UserPlaylists

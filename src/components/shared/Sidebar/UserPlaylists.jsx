import { useFetchUserPlaylistsQuery } from "@/app/services/playlistApi"
import { CardTextSkeleton } from "@/components/customs/atoms/Card"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { BsSoundwave } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

const UserPlaylists = () => {
    const { credential } = useSelector((state) => state.auth)
    const { data, isFetching } = useFetchUserPlaylistsQuery({
        id: credential,
        params: { skip: 0, limit: 20 }
    })
    return (
        <div className="scroll max-h-full flex-1 ">
            <Menu>
                {isFetching && [1, 2, 3].map((item) => <CardTextSkeleton key={item} />)}
                {Array.isArray(data) &&
                    data.map((playlist) => (
                        <MenuItem key={playlist?._id}>
                            <NavLink
                                to={`/playlist/${playlist?._id}`}
                                className={({ isActive }) => {
                                    return isActive ? "justify-between text-success" : "justify-between text-base-content"
                                }}
                            >
                                {playlist?.title}
                            </NavLink>
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    )
}

export default UserPlaylists

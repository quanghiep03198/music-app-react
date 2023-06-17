import { useFetchUserPlaylistsQuery } from "@/providers/api/playlistApi"
import { Menu } from "react-daisyui"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import tw from "tailwind-styled-components"
const UserPlaylists = () => {
   const { uid, authenticated } = useSelector((state) => state.auth)

   const { data, isFetching } = useFetchUserPlaylistsQuery(
      {
         id: uid,
         params: { skip: 0, limit: 20 }
      },
      { skip: !authenticated }
   )

   return (
      <Scroll>
         <Menu className="menu">
            {Array.isArray(data) &&
               data.map((playlist) => (
                  <Menu.Item key={playlist?._id} className="truncate">
                     <NavLink
                        to={`/playlists/${playlist?._id}`}
                        className={({ isActive }) => {
                           return isActive ? "justify-between text-success" : "justify-between text-base-content"
                        }}>
                        {playlist?.title}
                     </NavLink>
                  </Menu.Item>
               ))}
         </Menu>
      </Scroll>
   )
}

const Scroll = tw.div`scroll overflow-y-auto`

export default UserPlaylists

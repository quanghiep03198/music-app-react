import { useAddToPlaylistMutation, useFetchUserPlaylistsQuery, useUpdateUserPlaylistMutation } from "@/app/services/playlistApi"
import Button from "@/components/customs/atoms/Button"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { toast } from "react-toastify"

const PlaylistListModal = ({ trackToAdd }) => {
    const { credential, authenticated } = useSelector((state) => state.auth)
    const { trackToAddToPlaylist, setTrackToAddToPlaylist } = useContext(AppContext)
    const { data, isFetching } = useFetchUserPlaylistsQuery(
        {
            id: credential,
            params: { skip: 0, limit: 20 }
        },
        { skip: !authenticated }
    )
    const [addToPlaylist, isLoading] = useAddToPlaylistMutation()

    const handleAddToPlaylist = async (playlist) => {
        try {
            if (playlist.tracks.some((track) => track._id === trackToAddToPlaylist?._id)) {
                return
            }
            console.log(trackToAddToPlaylist)
            const response = await addToPlaylist(playlist._id, { track: trackToAddToPlaylist._id })
            console.log(response)
            toast.success(`Added to ${playlist.title}`)
        } catch (error) {}
    }

    return (
        <>
            <input type="checkbox" id="playlist-list-modal" className="modal-toggle" />
            <label htmlFor="playlist-list-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="mb-6 text-center text-xl font-medium capitalize">add to playlist</h3>

                    <div className="flex flex-col gap-1">
                        {data.map((playlist) => (
                            <label
                                className="label rounded-lg p-3 hover:bg-neutral/50 hover:duration-500"
                                key={playlist?._id}
                                onClick={() => handleAddToPlaylist(playlist)}
                            >
                                {playlist.title}
                                <Button size="sm" disabled={playlist.tracks.some((track) => track._id === trackToAddToPlaylist?._id)} color="success">
                                    Add to playlist
                                </Button>
                            </label>
                        ))}
                    </div>
                </label>
            </label>
        </>
    )
}

export default PlaylistListModal

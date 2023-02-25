import { useEditTrackListMutation, useFetchUserPlaylistsQuery } from "@/app/services/playlistApi"
import Button from "@/components/customs/atoms/Button"
import { AppContext } from "@/context/AppProvider"
import { Fragment, useContext, useState } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { toast } from "react-toastify"

const PlaylistListModal = () => {
    const { credential, authenticated } = useSelector((state) => state.auth)
    const [playlistToAdd, setPlaylistToAdd] = useState(null)
    const { trackToEditPlaylist } = useContext(AppContext)
    const { data } = useFetchUserPlaylistsQuery(
        {
            id: credential,
            params: { skip: 0, limit: 20 }
        },
        { skip: !authenticated }
    )
    const [addToPlaylist, { isLoading }] = useEditTrackListMutation()

    const handleAddToPlaylist = async (playlist) => {
        try {
            setPlaylistToAdd(playlist)
            if (playlist.tracks.some((track) => track._id === trackToEditPlaylist?._id)) {
                return
            }
            const response = await addToPlaylist({ id: playlist._id, payload: { track: trackToEditPlaylist._id } }).unwrap()
            console.log(response)
            if (response) toast.success(`Added to ${playlist.title}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <input type="checkbox" id="playlist-list-modal" className="modal-toggle" />
            <label htmlFor="playlist-list-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="mb-6 text-center text-xl font-medium capitalize">add to playlist</h3>

                    <div className="flex flex-col gap-1">
                        {Array.isArray(data) &&
                            data.map((playlist) => (
                                <label
                                    className="label rounded-lg p-3 hover:bg-neutral/50 hover:duration-500"
                                    key={playlist?._id}
                                    onClick={() => handleAddToPlaylist(playlist)}>
                                    {playlist.title}
                                    <Button
                                        size="sm"
                                        isLoading={isLoading && playlistToAdd._id === playlist._id}
                                        disabled={playlist.tracks.some((track) => track._id === trackToEditPlaylist?._id)}
                                        color="success">
                                        Add to playlist
                                    </Button>
                                </label>
                            ))}
                    </div>
                </label>
            </label>
        </Fragment>
    )
}

export default PlaylistListModal

import { useEditTrackListMutation } from "@/app/services/playlistApi"
import React from "react"
import { HiMinus } from "react-icons/hi2"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const RemoveFromPlaylistButton = ({ trackToRemove }) => {
    const { id } = useParams()
    const [removeTrackFromPlaylist] = useEditTrackListMutation()

    const handleRemoveTrackFromPlaylist = async () => {
        try {
            const { data } = await removeTrackFromPlaylist({ id: id, payload: { track: trackToRemove._id } })
            if (data) {
                toast.info("Removed track from this playlist!")
            }
        } catch (error) {
            toast.error("Failed to remove track from this playlist!")
        }
    }

    return (
        <label onClick={handleRemoveTrackFromPlaylist}>
            <HiMinus /> Remove from this playlist
        </label>
    )
}

export default RemoveFromPlaylistButton

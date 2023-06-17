import { AppContext } from "@/context/AppProvider"
import { useEditTrackListMutation, useFetchUserPlaylistsQuery } from "@/providers/api/playlistApi"
import { useContext, useState } from "react"
import { Button, Modal } from "react-daisyui"
import { HiXMark } from "react-icons/hi2"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"

const PlaylistListModal = () => {
   const { uid, authenticated } = useSelector((state) => state.auth)
   const [playlistToAdd, setPlaylistToAdd] = useState(null)
   const { trackToEditPlaylist, modalStates, handleToggleModal } = useContext(AppContext)

   const { data } = useFetchUserPlaylistsQuery(
      {
         id: uid,
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
         if (response) toast.success(`Added to ${playlist.title}`)
      } catch (error) {}
   }
   const handleCloseModal = () => {}
   return (
      <Modal open={modalStates.collectionModalState} onClickBackdrop={handleCloseModal}>
         <Button color="ghost" shape="circle" startIcon={HiXMark} />

         <Modal.Body className="modal-box relative">
            <h3 className="mb-6 text-center text-xl font-medium capitalize">add to playlist</h3>

            <Modal.Form>
               {Array.isArray(data) &&
                  data.map((playlist) => (
                     <label
                        className="label rounded-lg p-3 hover:bg-neutral/50 hover:duration-500"
                        key={playlist?._id}
                        onClick={() => handleAddToPlaylist(playlist)}>
                        {playlist.title}
                        <Button
                           isLoading={isLoading && playlistToAdd._id === playlist._id}
                           disabled={playlist.tracks.some((track) => track._id === trackToEditPlaylist?._id)}
                           color="success">
                           Add to playlist
                        </Button>
                     </label>
                  ))}
            </Modal.Form>
         </Modal.Body>
      </Modal>
   )
}

Modal.Form = tw.div`flex flex-col gap-1`

export default PlaylistListModal

import Typography from "@/components/customs/Typography"
import { AppContext, ModalActionEnum } from "@/context/AppProvider"
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
   const { trackToEditPlaylist, modalStates, handleToggleModal, setTrackToEditPlaylist } = useContext(AppContext)
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
         await addToPlaylist({ id: playlist._id, payload: { track: trackToEditPlaylist._id } })
         toast.success(`Added to ${playlist.title}`)
      } catch (error) {
         toast.error("Opps! Something went wrong!")
      }
   }

   const handleCloseModal = () => {
      handleToggleModal({ type: ModalActionEnum.TOGGLE_COLLECTION_MODAL })
      setTrackToEditPlaylist(null)
   }

   return (
      <Modal open={modalStates.collectionModalState} onClickBackdrop={handleCloseModal}>
         <Button color="ghost" shape="circle" className="absolute right-2 top-2" onClick={handleCloseModal}>
            <HiXMark className="text-lg" />
         </Button>

         <Modal.Body>
            <Typography size="xl" fontWeight="medium" align="center" className="mb-6 capitalize">
               add to playlist
            </Typography>

            <List>
               {Array.isArray(data) &&
                  data.map((playlist) => (
                     <List.Item key={playlist?._id} onClick={() => handleAddToPlaylist(playlist)}>
                        {playlist.title}
                        <Button
                           size="sm"
                           loading={isLoading && playlistToAdd._id === playlist._id}
                           disabled={playlist.tracks.some((track) => track._id === trackToEditPlaylist?._id)}
                           color="success">
                           Add to playlist
                        </Button>
                     </List.Item>
                  ))}
            </List>
         </Modal.Body>
      </Modal>
   )
}

const List = tw.div`flex flex-col gap-1`
List.Item = tw.div`label rounded-lg p-3 hover:bg-neutral/50 hover:duration-500`

export default PlaylistListModal

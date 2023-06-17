import { useUpdateTrackCollectionMutation } from "@/providers/api/collectionApi"
import { useEffect, useState } from "react"
import { Swap } from "react-daisyui"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"

const ToggleLikeButton = ({ track }) => {
   const [isLiked, setIsLiked] = useState(false)
   const authenticated = useSelector((state) => state.auth?.authenticated)
   const trackCollection = useSelector((state) => state.collections?.tracks)
   const [updateTrackCollection] = useUpdateTrackCollectionMutation()

   useEffect(() => {
      if (!authenticated) {
         setIsLiked(false)
      }
      if (Array.isArray(trackCollection) && authenticated) {
         let isLiked = trackCollection.some((item) => item._id === track._id)
         setIsLiked(isLiked)
      }
      console.log("trackCollection :>> ", trackCollection)
   }, [trackCollection, authenticated])

   const handleUpdateTrackColleciton = async (track) => {
      try {
         if (!authenticated) {
            toast.info("You have to login first!")
            return
         }
         await updateTrackCollection(track)
         setIsLiked(!isLiked)
         !isLiked ? toast.success("Added track to your library") : toast.info("Removed track from your library")
      } catch (error) {}
   }

   return (
      <Swap
         onElement={
            <SwapItem>
               <BsHeartFill className="text-success" /> Remove from your library
            </SwapItem>
         }
         onChange={() => handleUpdateTrackColleciton(track)}
         offElement={
            <SwapItem>
               <BsHeart /> Save to your library
            </SwapItem>
         }
         active={isLiked}
      />
   )
}

const SwapItem = tw.div`flex items-center gap-3`

export default ToggleLikeButton

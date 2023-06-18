import { addToQueue, removeFromQueue } from "@/providers/slices/queueSlice"
import { useEffect, useState } from "react"
import { Swap } from "react-daisyui"
import { BiPlus } from "react-icons/bi"
import { HiOutlineMinus } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"

const ToggleAddToQueueButton = ({ track }) => {
   const [isInQueue, setIsInQueue] = useState(false)
   const { nextup } = useSelector((state) => state.queue)
   const dispatch = useDispatch()

   useEffect(() => {
      let existedInQueue = Array.isArray(nextup) ? nextup?.some((item) => item._id === track._id) : false
      setIsInQueue(existedInQueue)
   }, [nextup])

   const handleToggleAddToQueue = (track) => {
      if (isInQueue) {
         dispatch(removeFromQueue(track))
         toast.info("Removed from queue!")
      } else {
         dispatch(addToQueue(track))
         toast.success("Added to queue!")
      }
      setIsInQueue(!isInQueue)
   }
   return (
      <Swap
         onChange={() => handleToggleAddToQueue(track)}
         onElement={
            <SwapItem>
               <HiOutlineMinus /> Remove from queue
            </SwapItem>
         }
         offElement={
            <SwapItem>
               <BiPlus /> Add to queue
            </SwapItem>
         }
         active={isInQueue}
      />
   )
}

const SwapItem = tw.div`flex items-center gap-3`

export default ToggleAddToQueueButton

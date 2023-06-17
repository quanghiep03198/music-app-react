import { setCurrentTrack } from "@/providers/reducers/queueSlice"
import { AppContext } from "@/context/AppProvider"
import { useContext, useEffect, useState } from "react"
import { BsPauseCircle, BsPlayCircle, BsShuffle, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import tw from "tailwind-styled-components"

import { Button, Swap } from "react-daisyui"

const AudioButtonGroup = ({ audioRef }) => {
   const { currentTrack, nextup } = useSelector((state) => state.queue)
   const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
   const [loopState, setLoopState] = useState(false)
   const [shuffleState, setShuffleState] = useState(false)
   const { playState, setPlayState } = useContext(AppContext)
   const dispatch = useDispatch()

   useEffect(() => {
      audioRef.current.addEventListener("ended", () => {
         handleChangeTrack(1)
      })
   })

   // loop
   const handleToggleLoop = (e) => {
      setLoopState(e.target.checked)
      audioRef.current.loop = e.target.checked
   }

   // shuffle play
   const handleToggleShuffle = (e) => {
      setShuffleState(e.target.checked)
   }

   // using closure to memorize newIndex variable
   const changeTrack = () => {
      let newIndex
      return function (increasedValue) {
         if (shuffleState) {
            newIndex = Math.floor(Math.random() * nextup.length)
            let currentIndex = nextup.findIndex((track) => track._id === currentTrack._id)
            while (currentIndex === newIndex) {
               newIndex = Math.floor(Math.random() * nextup.length)
            }
         } else {
            newIndex = currentTrackIndex + increasedValue
            if (newIndex < 0) newIndex = nextup.length - 1
            if (newIndex > nextup.length - 1) newIndex = 0
         }
         setCurrentTrackIndex(newIndex)
         dispatch(setCurrentTrack(nextup[newIndex]))
         dispatch(setPlayState(true))
      }
   }

   const handleChangeTrack = changeTrack()

   return (
      <ButtonGroup>
         <Swap
            onElement={<BsShuffle className="text-success" />}
            offElement={<BsShuffle />}
            className="w-fit text-xl"
            checked={shuffleState}
            onChange={handleToggleShuffle}
         />
         <Button color="ghost" className="text-2xl hover:bg-transparent" onClick={() => handleChangeTrack(-1)}>
            <BsSkipBackwardFill />
         </Button>
         <Swap
            offElement={<BsPlayCircle />}
            onElement={<BsPauseCircle />}
            rotate
            className="btn-ghost btn-circle btn w-fit text-4xl hover:bg-transparent"
            checked={playState}
            onChange={(e) => setPlayState(e.target.checked)}
         />
         <Button color="ghost" className="text-2xl hover:bg-transparent" onClick={() => handleChangeTrack(1)}>
            <BsSkipForwardFill />
         </Button>
         <Swap
            onElement={<RepeatIcon className="text-success" />}
            offElement={<RepeatIcon className="text-base-content" />}
            className="w-fit text-xl"
            checked={loopState}
            onChange={handleToggleLoop}
         />
      </ButtonGroup>
   )
}

const ButtonGroup = tw.div`flex items-center`
const RepeatIcon = tw.i`bi bi-repeat`

export default AudioButtonGroup

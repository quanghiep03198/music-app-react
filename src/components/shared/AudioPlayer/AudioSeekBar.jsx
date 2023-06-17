import ErrorBoundary from "@/components/error/ErrorBoundary"
import { AppContext } from "@/context/AppProvider"
import { timer } from "@/utils/formatter"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Range from "../../customs/Range"
import tw from "tailwind-styled-components"

const AudioSeekBar = ({ audioRef }) => {
   const [intervalState, setIntervalState] = useState(0)
   const [currentTime, setCurrentTime] = useState(0)
   const { currentTrack } = useSelector((state) => state.queue)
   const { playState } = useContext(AppContext)

   useEffect(() => {
      if (playState) {
         const currentInterval = setInterval(() => {
            setCurrentTime(audioRef.current.currentTime)
         }, 1)
         setIntervalState(currentInterval)
      } else {
         clearInterval(intervalState)
      }
   }, [playState, currentTrack])

   const getCurrentDuration = (e) => {
      audioRef.current.currentTime = e.target.value
      setCurrentTime(e.target.value)
   }

   return (
      <SeekbarWrapper>
         <Time>{timer(currentTime)}</Time>
         <Range type={"range"} value={currentTime} max={currentTrack?.duration} onChange={getCurrentDuration} />
         <Time>{currentTrack?.duration ? timer(currentTrack?.duration) : timer(0)}</Time>
      </SeekbarWrapper>
   )
}

const SeekbarWrapper = tw.div`flex min-w-full items-center justify-center gap-3`
const Time = tw.time`leading-1`

export default AudioSeekBar

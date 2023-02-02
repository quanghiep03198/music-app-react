import { AppContext } from "@/context/AppProvider"
import "@/index.css"
import { useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import tw from "tailwind-styled-components"
import AudioButtonGroup from "./AudioButtonGroup"
import AudioSeekBar from "./AudioSeekBar"
import TrackActions from "./TrackActions"
import TrackInfo from "./TrackInfo"

const AudioPlayerWrapper = tw.div`w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-start xl:items-start xxl:items-start flex-grow gap-10 p-4 bg-base-300`
const AudioControllerWrapper = tw.div`flex flex-col gap-1 justify-center items-center flex-1 sm:basis-full md:basis-full sm:order-3 md:order-3 sm:hidden`

const AudioPlayer = () => {
    const audioRef = useRef()
    const { currentTrack } = useSelector((state) => state.queue)
    const { playState, setPlayState } = useContext(AppContext)

    useEffect(() => {
        playState ? audioRef.current.play() : audioRef.current.pause()
    }, [playState, currentTrack])

    return (
        <AudioPlayerWrapper>
            <TrackInfo />
            <AudioControllerWrapper>
                <audio src={currentTrack?.trackSrc} preload="metadata" ref={audioRef} />
                <AudioSeekBar audioRef={audioRef} />
                <AudioButtonGroup audioRef={audioRef} />
            </AudioControllerWrapper>
            <TrackActions audioRef={audioRef} />
        </AudioPlayerWrapper>
    )
}

export default AudioPlayer

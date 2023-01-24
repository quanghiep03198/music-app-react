import { AppContext } from "@/context/AppProvider"
import "@/index.css"
import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import tw from "tailwind-styled-components"
import AudioButtonGroup from "./AudioButtonGroup"
import AudioSeekBar from "./AudioSeekBar"
import TrackActions from "./TrackActions"
import TrackInfo from "./TrackInfo"

const AudioPlayerWrapper = tw.div`w-full text-base-content flex flex-wrap xl:flex-nowrap xxl:flex-nowrap justify-between items-center xl:items-start xxl:items-start flex-grow gap-10 p-5 bg-base-200`
const AudioControllerWrapper = tw.div`flex flex-col gap-5 justify-center items-center flex-1 sm:basis-full md:basis-full sm:order-3 md:order-3`

const AudioPlayer = () => {
    const { playState } = useContext(AppContext)
    const audioRef = useRef()
    const { currentTrack } = useSelector((state) => state.queue)

    useEffect(() => {
        playState ? audioRef.current.play() : audioRef.current.pause()
    }, [playState, currentTrack])

    return (
        <AudioPlayerWrapper>
            <TrackInfo />
            <AudioControllerWrapper>
                <audio
                    src={currentTrack?.trackSrc}
                    preload="metadata"
                    ref={audioRef}
                />
                <AudioSeekBar audioRef={audioRef} />
                <AudioButtonGroup audioRef={audioRef} />
            </AudioControllerWrapper>
            <TrackActions audioRef={audioRef} />
        </AudioPlayerWrapper>
    )
}

export default AudioPlayer

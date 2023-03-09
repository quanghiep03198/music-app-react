import Button from "@/components/customs/@core/Button"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import { AppContext } from "@/context/AppProvider"
import { useContext, useEffect, useId, useState } from "react"
import { BsPauseFill, BsPlayFill, BsVolumeDown, BsVolumeMute, BsVolumeUp } from "react-icons/bs"
import { HiOutlineQueueList } from "react-icons/hi2"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
import Range from "../../customs/@core/Range"
import ToggleLikeTrackButton from "./ToggleLikeTrackButton"
const ActionsGroup = tw.div`flex justify-end items-center gap-4 basis-1/4 sm:flex-none md:flex-none `
const VolumeController = tw.div`flex items-center self-center gap-2 sm:hidden md:hidden`

const TrackActions = ({ audioRef }) => {
    const [volume, setVolume] = useState(0)
    const inputId = useId()
    const { playState, setPlayState } = useContext(AppContext)
    useEffect(() => {
        setVolume(audioRef.current.volume)
    }, [audioRef])

    const adjustVolume = (e) => {
        setVolume(e.target.value)
        audioRef.current.volume = e.target.value
    }
    return (
        <ErrorBoundary>
            <ActionsGroup>
                <VolumeController>
                    <label htmlFor="volume-range" className="text-2xl" id={inputId}>
                        {volume === 1 ? <BsVolumeUp /> : volume == 0 ? <BsVolumeMute /> : <BsVolumeDown />}
                    </label>
                    <Range value={volume} step={0.01} max={1} onChange={adjustVolume} id="volume-range" />
                </VolumeController>
                <Button shape="circle" size="sm" color="ghost" className="hidden text-xl sm:inline-flex" onClick={() => setPlayState(!playState)}>
                    {playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
                <ToggleLikeTrackButton />
                <Link to="/queue" className="hidden lg:block xl:block xxl:block">
                    <HiOutlineQueueList className="text-xl" />
                </Link>
            </ActionsGroup>
        </ErrorBoundary>
    )
}

export default TrackActions

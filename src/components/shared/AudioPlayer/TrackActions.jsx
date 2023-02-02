import Button from "@/components/customs/atoms/Button"
import ErrorBoundary from "@/components/customs/ErrorBoundary"
import { AppContext } from "@/context/AppProvider"
import { useContext, useEffect, useId, useState } from "react"
import { BsPauseFill, BsPlayFill, BsVolumeUp } from "react-icons/bs"
import { HiOutlineQueueList } from "react-icons/hi2"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
import Range from "../../customs/atoms/Range"
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
                    <label htmlFor="volume-range" className="text-xl" id={inputId}>
                        <BsVolumeUp />
                    </label>
                    <Range value={volume} step={0.01} max={1} onChange={adjustVolume} id="volume-range" />
                </VolumeController>
                <Button shape="circle" size="sm" className="hidden text-xl sm:inline-flex" onClick={() => setPlayState(!playState)}>
                    {playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
                <ToggleLikeTrackButton />
                <Link to="/queue">
                    <HiOutlineQueueList className="text-xl" />
                </Link>
            </ActionsGroup>
        </ErrorBoundary>
    )
}

export default TrackActions

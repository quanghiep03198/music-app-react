import {
    addToQueue,
    removeFromQueue,
    setCurrentTrack
} from "@/app/redux/slice/queueSlice"
import { AppContext } from "@/context/AppProvider"
import formatNumber from "@/utils/formatNumber"
import timer from "@/utils/timer"
import { useContext, useEffect, useState } from "react"
import {
    BsClock,
    BsHeart,
    BsPauseFill,
    BsPlayFill,
    BsPlusLg,
    BsThreeDots
} from "react-icons/bs"
import { HiOutlineMinus } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { useOutletContext } from "react-router-dom"
import tw from "tailwind-styled-components"
import Button from "../../customs/Atomics/Button"
import { Dropdown, DropdownContent } from "../../customs/Atomics/Dropdown"
import Swap from "../../customs/Atomics/Swap"
import SoundWave from "./SoundWave"
export const StyledTrackCard = tw.div`group track-card p-1 gap-2`

const TrackIndex = tw.span`group-hover:hidden w-full`

const TrackCard = ({ index, track }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCurrentTrack, setIsCurrentTrack] = useState(false)

    const [isInQueue, setIsInQueue] = useState()

    const dispatch = useDispatch()
    const { currentTrack, nextup } = useSelector((state) => state.queue)

    useEffect(() => {
        let isExisted = false
        if (Array.isArray(nextup)) {
            isExisted =
                nextup.find((item) => item?._id === track?._id) !== undefined
        }

        setIsInQueue(isExisted)
        let isCurrentTrack = currentTrack?._id === track?._id
        setIsPlaying(isCurrentTrack && playState)
        setIsCurrentTrack(isCurrentTrack)
    }, [currentTrack, playState])

    const togglePlay = (track) => {
        setIsPlaying(!isPlaying)
        setPlayState(!isPlaying)
        dispatch(setCurrentTrack(track))
    }
    const handleAddToQueue = () => {
        dispatch(addToQueue(track))
        setIsInQueue(true)
    }

    const handleRemoveFromQueue = () => {
        dispatch(removeFromQueue(track))
        setIsInQueue(false)
    }

    return (
        <StyledTrackCard className={isCurrentTrack && "bg-zinc-400/20"}>
            <div>
                <div className="relative text-center">
                    <SoundWave
                        track={track}
                        isPlaying={isPlaying && playState}
                    />
                    {!isPlaying && <TrackIndex>{index}</TrackIndex>}
                    <Button
                        shape="circle"
                        color="success"
                        className="hidden text-xl group-hover:inline-flex sm:btn-sm"
                        onClick={() => togglePlay(track)}
                    >
                        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                    </Button>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <img
                        src={track?.thumbnail}
                        className="h-14 w-14 rounded-md sm:h-12 sm:w-12"
                        loading="lazy"
                    />
                    <div>
                        <h5 className="truncate">{track?.title}</h5>
                        <p>
                            {Array.isArray(track.artists) &&
                                track.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                        </p>
                    </div>
                </div>
            </div>
            <div>{track.album?.title ?? ""}</div>
            <div>
                <div className="flex items-center gap-2">
                    <BsPlayFill /> {formatNumber(track?.listen)}
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <BsClock /> {timer(track?.duration)}
                </div>
            </div>
            <div>
                <Dropdown gap={6} position="bottom-end">
                    <Button
                        role="none"
                        size="sm"
                        shape="square"
                        color="transparent"
                        tabIndex={0}
                    >
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0}>
                        <ul className="menu rounded-lg bg-base-300">
                            <li>
                                <a role="button" className="truncate">
                                    <BsHeart /> Save to your library
                                </a>
                            </li>
                            {isInQueue ? (
                                <li onClick={handleRemoveFromQueue}>
                                    <a role="button" className="truncate">
                                        <HiOutlineMinus /> Remove from queue
                                    </a>
                                </li>
                            ) : (
                                <li onClick={handleAddToQueue}>
                                    <a role="button">
                                        <BsPlusLg /> Add to queue
                                    </a>
                                </li>
                            )}
                        </ul>
                    </DropdownContent>
                </Dropdown>
            </div>
        </StyledTrackCard>
    )
}

export default TrackCard

import { useFetchTrackCollectionQuery } from "@/app/api/collectionApi"
import {
    addToQueue,
    removeFromQueue,
    setCurrentTrack
} from "@/app/slices/queueSlice"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { AppContext } from "@/context/AppProvider"
import { formatNumber, timer } from "@/utils/formatter"
import { useContext, useEffect, useState } from "react"
import {
    BsClock,
    BsDownload,
    BsHeart,
    BsHeartFill,
    BsPauseFill,
    BsPlayFill,
    BsPlusLg,
    BsThreeDots
} from "react-icons/bs"
import { HiOutlineMinus } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import { Dropdown, DropdownContent } from "../../customs/Atomics/Dropdown"
import SoundWave from "./SoundWave"

const TrackCard = ({ index, track }) => {
    const { playState, setPlayState } = useContext(AppContext)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isCurrentTrack, setIsCurrentTrack] = useState(false)
    const likedTracks = useFetchTrackCollectionQuery(undefined)

    const [isInQueue, setIsInQueue] = useState()

    const dispatch = useDispatch()
    const { currentTrack, nextup } = useSelector((state) => state.queue)

    useEffect(() => {
        setIsLiked(
            likedTracks.data.findIndex((item) => item._id === track._id) >= 0
        )
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
        <div
            className={`track-card group gap-2 p-1 hover:bg-base-content/10 ${
                isCurrentTrack && "group bg-neutral"
            }`}
        >
            <div className="relative text-center">
                <SoundWave track={track} isPlaying={isPlaying && playState} />
                {!isPlaying && (
                    <span className="w-full group-hover:hidden">{index}</span>
                )}
                <Button
                    shape="circle"
                    color="success"
                    className="hidden text-xl group-hover:inline-flex sm:text-base sm:btn-sm"
                    onClick={() => togglePlay(track)}
                >
                    {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <img
                    src={track?.thumbnail}
                    className="h-14 w-14 rounded-md sm:h-12 sm:w-12"
                    loading="lazy"
                />
                <div>
                    <h6 className="truncate font-medium">{track?.title}</h6>
                    <p className="text-base-content/50">
                        {Array.isArray(track.artists) &&
                            track.artists.map((artist) => (
                                <Link to={`/artist/${artist?._id}`}>
                                    {artist.name}
                                </Link>
                            ))}
                    </p>
                </div>
            </div>

            <span>{track.album?.title ?? ""}</span>

            <time className="flex items-center gap-2">
                <BsPlayFill /> {formatNumber(track?.listen)}
            </time>

            <div className="flex items-center gap-2">
                <BsClock /> {timer(track?.duration)}
            </div>

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
                    <Menu className="bg-base-300">
                        {isLiked ? (
                            <MenuItem>
                                {" "}
                                <a role="button" className="truncate">
                                    <BsHeartFill className="text-success" />{" "}
                                    Remove from your library
                                </a>
                            </MenuItem>
                        ) : (
                            <MenuItem>
                                <a role="button" className="truncate">
                                    <BsHeart /> Save to your library
                                </a>
                            </MenuItem>
                        )}

                        {isInQueue ? (
                            <MenuItem onClick={handleRemoveFromQueue}>
                                <a role="button" className="truncate">
                                    <HiOutlineMinus /> Remove from queue
                                </a>
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={handleAddToQueue}>
                                <a role="button">
                                    <BsPlusLg /> Add to queue
                                </a>
                            </MenuItem>
                        )}
                        <MenuItem>
                            <a href={track?.downloadUrl} className="truncate">
                                <BsDownload /> Download
                            </a>
                        </MenuItem>
                    </Menu>
                </DropdownContent>
            </Dropdown>
        </div>
    )
}

export default TrackCard

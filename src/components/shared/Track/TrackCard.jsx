import { useFetchTrackCollectionQuery } from "@/app/services/collectionApi"
import { addToQueue, removeFromQueue, setCurrentTrack } from "@/app/slices/queueSlice"
import { Menu, MenuItem } from "@/components/customs/Atomics/Menu"
import { AppContext } from "@/context/AppProvider"
import { formatNumber, timer } from "@/utils/formatter"
import { useContext, useEffect, useState } from "react"
import { BsClock, BsDownload, BsHeart, BsHeartFill, BsPauseFill, BsPlayFill, BsPlusLg, BsThreeDots } from "react-icons/bs"
import { HiOutlineMinus } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Button from "../../customs/Atomics/Button"
import { Dropdown, DropdownContent } from "../../customs/Atomics/Dropdown"
import SoundWave from "./SoundWave"

const TrackCard = ({ index, track }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isCurrentTrack, setIsCurrentTrack] = useState(false)
    const [isInQueue, setIsInQueue] = useState()

    const { authenticated } = useSelector((state) => state.auth)
    const { playState, setPlayState } = useContext(AppContext)
    const { currentTrack, nextup } = useSelector((state) => state.queue)

    const dispatch = useDispatch()
    const { data: likedTracks } = useFetchTrackCollectionQuery(undefined, { skip: authenticated })

    useEffect(() => {
        setIsLiked(likedTracks?.find((item) => item._id === track._id) !== undefined)
        setIsInQueue(nextup?.find((item) => item?._id === track?._id) !== undefined)
        setIsCurrentTrack(currentTrack?._id === track?._id)
    }, [currentTrack, playState])

    const togglePlay = (track) => {
        if (!isCurrentTrack) {
            dispatch(setCurrentTrack(track))
            setPlayState(true)
            return
        }
        setPlayState(!playState)
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
        <div className={`track-card group gap-2 p-1 hover:bg-neutral/50 sm:text-sm ${isCurrentTrack && "group bg-neutral"}`}>
            <div role="cell" className="relative text-center">
                <SoundWave track={track} isPlaying={isCurrentTrack && playState} />
                {!(isCurrentTrack && playState) && <span className="w-full group-hover:hidden">{index}</span>}
                <Button
                    shape="circle"
                    color="success"
                    className="hidden text-xl group-hover:inline-flex sm:text-base sm:btn-sm"
                    onClick={() => togglePlay(track)}
                >
                    {isCurrentTrack && playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </div>

            <div role="cell" className="flex items-center gap-2">
                <img src={track?.thumbnail} className="h-14 w-14 rounded-md sm:h-12 sm:w-12" loading="lazy" />
                <div className="sm:text-sm">
                    <h6 className="truncate font-medium">{track?.title}</h6>
                    <p className="text-base-content/50">
                        {Array.isArray(track.artists) && track.artists.map((artist) => <Link to={`/artist/${artist?._id}`}>{artist.name}</Link>)}
                    </p>
                </div>
            </div>

            <div role="cell">
                <span>{track.album?.title ?? ""}</span>
            </div>

            <div role="cell">
                <time className="flex items-center gap-2">
                    <BsPlayFill /> {formatNumber(track?.listen)}
                </time>
            </div>

            <div role="cell">
                <div className="flex items-center gap-2">
                    <BsClock /> {timer(track?.duration)}
                </div>
            </div>

            <div role="cell">
                <Dropdown gap={6} position="bottom-end">
                    <Button role="none" size="sm" shape="square" color="transparent" tabIndex={0}>
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0}>
                        <Menu className="bg-base-300">
                            {isLiked ? (
                                <MenuItem>
                                    {" "}
                                    <a role="button" className="truncate">
                                        <BsHeartFill className="text-success" /> Remove from your library
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
        </div>
    )
}

export default TrackCard

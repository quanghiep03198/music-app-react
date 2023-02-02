import { useFetchTrackCollectionQuery } from "@/app/services/collectionApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import Avatar from "@/components/customs/atoms/Avatar"
import Button from "@/components/customs/atoms/Button"
import { Dropdown, DropdownContent } from "@/components/customs/atoms/Dropdown"
import HeroBanner from "@/components/customs/atoms/HeroBanner"
import { Menu, MenuItem } from "@/components/customs/atoms/Menu"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsX } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import LikedTracksListImage from "/images/liked-track-image.png"

const LikedTrack = () => {
    const { playState, setPlayState } = useContext(AppContext)
    const dispatch = useDispatch()
    const { data } = useFetchTrackCollectionQuery()
    const { currentPlaylist } = useSelector((state) => state.queue)
    const { user } = useSelector((state) => state.auth)
    const togglePlayPlaylist = () => {
        const payload = {
            _id: "liked_tracks",
            tracks: data
        }
        if (payload._id && payload._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(payload))
        }
        setPlayState(!playState)
    }
    return (
        <div className="flex flex-col gap-10">
            {/* Banner */}
            <HeroBanner heroImageUrl={LikedTracksListImage}>
                <h1 className="text-6xl font-bold capitalize sm:text-2xl">liked tracks</h1>
                <div className="mb-6 flex items-center gap-2">
                    <Avatar size="xs">
                        <img src={user?.avatar} />
                    </Avatar>
                    <span className="font-medium">{user?.username}</span>
                    <strong>-</strong>
                    <p className="my-2 text-lg sm:text-sm">{data?.length} tracks</p>
                </div>
            </HeroBanner>

            {/* Playlist actions */}
            <section className="flex items-center gap-4">
                <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
                    {playState ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
                <Dropdown position="bottom-left">
                    <Button color="transparent" className="text-2xl" tabIndex={0}>
                        <BsThreeDots />
                    </Button>
                    <DropdownContent tabIndex={0} className="bg-neutral">
                        <Menu>
                            <MenuItem>
                                <a role="menuitem">
                                    <BsPencil /> Edit playlist
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a role="menuitem" className="text-error">
                                    <BsX /> Delete this playlist
                                </a>
                            </MenuItem>
                        </Menu>
                    </DropdownContent>
                </Dropdown>
            </section>

            {/* Tracks list */}
            <TrackList data={data} />
        </div>
    )
}

export default LikedTrack
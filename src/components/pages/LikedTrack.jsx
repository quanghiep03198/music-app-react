import { useFetchTrackCollectionQuery } from "@/app/services/collectionApi"
import { setCurrentPlaylist } from "@/app/slices/queueSlice"
import Avatar from "@/components/customs/atoms/Avatar"
import Button from "@/components/customs/atoms/Button"
import HeroBanner from "@/components/customs/atoms/HeroBanner"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import LikedTracksListImage from "/images/liked-track-image.png"

const LikedTrack = () => {
    const { playState, setPlayState } = useContext(AppContext)
    const { currentPlaylist } = useSelector((state) => state.queue)
    const { user } = useSelector((state) => state.auth)
    const { data } = useFetchTrackCollectionQuery(undefined)

    const dispatch = useDispatch()

    const togglePlayPlaylist = () => {
        const payload = {
            listId: "liked_tracks",
            tracks: data
        }
        if (payload._id && payload._id !== currentPlaylist) {
            dispatch(setCurrentPlaylist(payload))
        }
        setPlayState(!playState)
    }
    return (
        <div className="flex h-screen flex-col gap-10">
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
            </section>

            {/* Tracks list */}
            <TrackList data={data} />
        </div>
    )
}

export default LikedTrack

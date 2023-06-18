import { useFetchTrackCollectionQuery } from "@/providers/api/collectionApi"
import { setCurrentPlaylist } from "@/providers/slices/queueSlice"
import HeroBanner from "@/components/customs/HeroBanner"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import LikedTracksListImage from "/images/liked-track-image.png"
import { Avatar, Button } from "react-daisyui"
import tw from "tailwind-styled-components"

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
      <Container>
         {/* Banner */}
         <HeroBanner heroImageUrl={LikedTracksListImage}>
            <h1 className="text-6xl font-bold capitalize sm:text-2xl">liked tracks</h1>
            <div className="mb-6 flex items-center gap-2">
               <Avatar shape="circle" size={36} src={user?.avatar} />
               <span className="font-medium">{user?.username}</span>
               <strong>-</strong>
               <p className="my-2 text-lg sm:text-sm">{data?.length} tracks</p>
            </div>
         </HeroBanner>

         {/* Playlist actions */}
         <div className="flex items-center gap-4">
            <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
               {playState ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
         </div>

         {/* Tracks list */}
         <TrackList data={data} />
      </Container>
   )
}

const Container = tw.div`flex h-screen flex-col gap-10`

export default LikedTrack

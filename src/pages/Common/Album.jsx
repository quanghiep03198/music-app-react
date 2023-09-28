import ErrorBoundary from "@/components/error/ErrorBoundary"
import TrackList from "@/components/shared/Track/TrackList"
import { AppContext } from "@/context/AppProvider"
import { useFetchSingleAlbumQuery } from "@/providers/api/albumApi"
import { setCurrentPlaylist } from "@/providers/reducers/queueSlice"
import { useContext } from "react"
import { Button, Dropdown } from "react-daisyui"
import { BsPauseFill, BsPlayFill, BsThreeDots } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import HeroBanner from "../../components/customs/HeroBanner"
import DefaultThumbnail from "/images/default-thumbnail.png"

const AlbumPage = () => {
   const { id } = useParams()
   const { data } = useFetchSingleAlbumQuery(id)
   const { playState, setPlayState } = useContext(AppContext)
   const currentPlaylist = useSelector((state) => state.queue?.currentPlaylist)
   const dispatch = useDispatch()
   const togglePlayPlaylist = () => {
      if (data.album._id && data.album._id !== currentPlaylist) {
         dispatch(
            setCurrentPlaylist({
               tracks: data.tracks,
               playlistId: data.album._id
            })
         )
      }
      setPlayState(!playState)
   }
   return (
      <ErrorBoundary>
         <HeroBanner heroImageUrl={data?.album?.image || DefaultThumbnail}>
            <div className="flex flex-col gap-4">
               <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{data?.album?.title}</h1>
               <p className="flex items-center gap-4 text-lg sm:text-sm">{Array.isArray(data?.tracks) ? data?.tracks?.length : 0} tracks</p>

               <Link className="font-semibold text-base-content hover:link">{data?.album?.artist?.name}</Link>

               <p className="text-base-content/50">
                  Relased at <span className="font-semibold text-base-content">{new Date(data?.album?.releaseDate).toLocaleDateString()}</span>
               </p>
            </div>
         </HeroBanner>
         <section className="flex items-center gap-3">
            <Button shape="circle" color="success" className="text-xl sm:text-sm" onClick={togglePlayPlaylist}>
               {playState ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
            <Dropdown open={false}>
               <Dropdown.Toggle color="ghost">
                  <BsThreeDots />
               </Dropdown.Toggle>
               <Dropdown.Menu className="rounded-lg p-0">
                  <Dropdown.Item className="whitespace-nowrap">Add to your library</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </section>
         <TrackList data={data?.tracks} />
      </ErrorBoundary>
   )
}

export default AlbumPage

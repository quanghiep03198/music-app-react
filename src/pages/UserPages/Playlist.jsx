import HeroBanner from "@/components/customs/HeroBanner"
import { useDeleteUserPlaylistMutation, useFetchSinglePlaylistQuery } from "@/providers/api/playlistApi"
import { setCurrentPlaylist } from "@/providers/reducers/queueSlice"
import { Fragment, useContext } from "react"
import { Button, Dropdown } from "react-daisyui"
import { BiPlus } from "react-icons/bi"
import { BsPauseFill, BsPencil, BsPlayFill, BsThreeDots, BsTrash } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { SkeletonCardTitle, SkeletonTextCard } from "../../components/customs/Card"
import TrackList from "../../components/shared/Track/TrackList"
import { AppContext } from "../../context/AppProvider"
import DefaultThumbnail from "/images/default-album-image.png"

const Playlist = () => {
   const { id } = useParams()
   const { data, isFetching } = useFetchSinglePlaylistQuery(id, { refetchOnMountOrArgChange: true })
   const { playState, setPlayState } = useContext(AppContext)
   const { currentPlaylist } = useSelector((state) => state.queue)
   const { uid } = useSelector((state) => state.auth)
   const [deletePlaylist] = useDeleteUserPlaylistMutation()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const togglePlayPlaylist = () => {
      if (data?._id && data?._id !== currentPlaylist) {
         dispatch(setCurrentPlaylist({ playlistId: data._id, tracks: data }))
      }
      setPlayState(!playState)
   }

   const handleDeletePlaylist = (id) => {
      deletePlaylist(id)
         .then(() => navigate("/"))
         .catch((error) => toast.error("Opps! Something went wrong!"))
   }

   return (
      <div className="flex h-screen flex-col gap-10">
         <section className="group relative">
            <HeroBanner heroImageUrl={data?.thumbnail !== "" ? data?.thumbnail : DefaultThumbnail}>
               {isFetching ? (
                  <div className="flex flex-col gap-3">
                     <SkeletonCardTitle />
                     <SkeletonTextCard />
                     <SkeletonTextCard />
                  </div>
               ) : (
                  <Fragment>
                     <small className="first-letter:uppercase">{data?.public ? "public playlist" : "private playlist"}</small>
                     <h1 className="text-6xl font-bold sm:text-4xl md:text-4xl ">{data?.title}</h1>
                     <p className="sm:text-sm">{data?.tracks?.length || 0} tracks</p>
                     <p>
                        <span>Created by </span>
                        <Link className="font-bold text-base-content hover:link">{data?.creator?.username}</Link>
                     </p>
                  </Fragment>
               )}
            </HeroBanner>
         </section>

         <section className="flex items-center gap-3">
            <Button shape="circle" color="success" className="text-xl sm:text-base" onClick={togglePlayPlaylist}>
               {playState && currentPlaylist === data?._id ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
            <Dropdown horizontal="right">
               <Dropdown.Toggle color="ghost" button shape="square" className="text-xl">
                  <BsThreeDots />
               </Dropdown.Toggle>
               <Dropdown.Menu className="whitespace-nowrap rounded-lg p-0">
                  <Dropdown.Item>
                     <BiPlus /> Add to queue
                  </Dropdown.Item>
                  {uid === data?.creator?._id && (
                     <Dropdown.Item>
                        <BsPencil /> Edit playlist
                     </Dropdown.Item>
                  )}
                  {uid === data?.creator?._id && (
                     <Dropdown.Item onClick={() => handleDeletePlaylist(id)} className="font-medium text-error">
                        <BsTrash className="text-xl" /> Delete this playlist
                     </Dropdown.Item>
                  )}
               </Dropdown.Menu>
            </Dropdown>
         </section>

         <section>
            <TrackList data={data?.tracks} status={{ isFetching: isFetching }} />
         </section>
      </div>
   )
}

export default Playlist

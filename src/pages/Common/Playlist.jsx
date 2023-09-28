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
import tw from "tailwind-styled-components"
import TrackList from "../../components/shared/Track/TrackList"
import { AppContext } from "../../context/AppProvider"
import DefaultThumbnail from "/images/default-thumbnail.png"
import Typography from "@/components/customs/Typography"
import Text from "@/components/customs/Text"

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
      try {
         deletePlaylist(id)
         navigate("/")
         toast.info("Deleted playlist!")
      } catch (error) {
         toast.error("Opps! Something went wrong!")
      }
   }

   return (
      <div className="flex h-screen flex-col gap-10">
         <section className="group relative">
            <HeroBanner heroImageUrl={data?.thumbnail ?? DefaultThumbnail}>
               {isFetching ? (
                  <div className="flex flex-col gap-3">
                     <Skeleton className="h-3 w-20" />
                     <Skeleton className="h-3 w-20" />
                     <Skeleton className="h-3 w-20" />
                  </div>
               ) : (
                  <Fragment>
                     <Text $as="small" fontWeight="normal" className="mb-0 first-letter:uppercase">
                        {data?.public ? "public playlist" : "private playlist"}
                     </Text>
                     <Typography size="6xl" fontWeight="bold" className="mb-6 sm:text-4xl md:text-4xl">
                        {data?.title}
                     </Typography>
                     <Text size="base" className="mb-1 sm:text-sm">
                        {data?.tracks?.length || 0} tracks
                     </Text>
                     <Text size="base" className="text-neutral-content" fontWeight="normal">
                        <span>Created by </span>
                        <Link className="font-bold text-base-content hover:link">{data?.creator?.username}</Link>
                     </Text>
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

         <TrackList data={data?.tracks} status={{ isFetching: isFetching }} />
      </div>
   )
}

const Skeleton = tw.div`animate-pulse rounded-full`

export default Playlist

import { Fragment, memo, useContext, useMemo, useRef, useState } from "react"
import { Button, Dropdown } from "react-daisyui"
import { BiPlus } from "react-icons/bi"
import { BsClock, BsDownload, BsPauseFill, BsPlayFill, BsThreeDots } from "react-icons/bs"
import { HiMinus } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import { AppContext, ModalActionEnum } from "@/context/AppProvider"
import useLazyRender from "@/hooks/useLazyRender"
import { useEditTrackListMutation } from "@/providers/api/playlistApi"
import { setCurrentTrack } from "@/providers/slices/queueSlice"
import { timer } from "@/utils/formatter"
import SkeletonTrackCard, { ThumbnailSkeleton } from "../Skeletons/SkelentonTrackCard"
import SoundWave from "./SoundWave"
import ToggleAddToQueueButton from "./ToggleAddToQueueButton"
import ToggleLikeButton from "./ToggleLikeButton"
import { Paths } from "@/configs/paths.config"
import DefaultThumbnail from "/images/default-thumbnail.png"
import classNames from "classnames"

const renderArtists = ({ artists, creator }) =>
   Array.isArray(artists) ? (
      artists.map((artist, index) => (
         <Fragment>
            <Link key={artist._id} to={Paths.ARTIST.replace(":id", artists._id)}>
               {artist.name}
            </Link>
            {artists.length > 0 && index < artists.length - 1 && ", "}
         </Fragment>
      ))
   ) : (
      <Link>{creator.username}</Link>
   )

const TrackCard = ({ index, track, isPlaylistCreator }) => {
   const location = useLocation()
   const params = useParams()
   const { playState, setPlayState, handleToggleModal, setTrackToEditPlaylist } = useContext(AppContext)
   const { currentTrack } = useSelector((state) => state.queue)
   const trackCardRef = useRef(null)
   const isScrollToView = useLazyRender(trackCardRef)
   const canRemoveFromPlaylist = useMemo(() => location.pathname.includes(Paths.PLAYLIST) && isPlaylistCreator, [location, isPlaylistCreator])
   const isCurrentTrack = useMemo(() => currentTrack?._id === track?._id, [currentTrack])
   const [isLoadingImage, setIsLoadingImage] = useState(true)
   const dispatch = useDispatch()
   const [removeTrackFromPlaylist] = useEditTrackListMutation()

   const togglePlay = (track) => {
      if (!isCurrentTrack) {
         dispatch(setCurrentTrack(track))
         setPlayState(true)
         return
      }
      setPlayState(!playState)
   }

   const handleRemoveFromPlaylist = async (track) => {
      try {
         await removeTrackFromPlaylist({ id: params.id, payload: { track: track._id } })
         toast.info("Removed track from this playlist!")
      } catch (error) {}
   }

   const handleGetTrackToAddPlaylist = () => {
      setTrackToEditPlaylist(track)
      handleToggleModal({ type: ModalActionEnum.TOGGLE_COLLECTION_MODAL })
   }

   return (
      <div ref={trackCardRef}>
         {isScrollToView ? (
            <Track ref={trackCardRef}>
               <Track.Item role="cell" className="relative text-center">
                  <SoundWave track={track} isPlaying={isCurrentTrack && playState} />
                  {!(isCurrentTrack && playState) && <span className={`w-full group-hover:hidden ${isCurrentTrack && "text-success"}`}>{index}</span>}
                  <Button
                     shape="circle"
                     color="success"
                     className="hidden text-xl sm:btn-sm group-hover:inline-flex sm:text-base"
                     onClick={() => togglePlay(track)}>
                     {isCurrentTrack && playState ? <BsPauseFill /> : <BsPlayFill />}
                  </Button>
               </Track.Item>
               <Track.Item role="cell" className="flex items-center gap-2">
                  {isLoadingImage && <Track.ThumbnailSkeleton />}
                  {
                     <img
                        alt="thumbnail"
                        src={track?.thumbnail || track?.alternativeThumbnail}
                        loading="eager"
                        onLoad={() => setIsLoadingImage(false)}
                        onError={({ currentTarget }) => {
                           currentTarget.onerror = null // prevents looping
                           currentTarget.src = DefaultThumbnail
                        }}
                        className={classNames("h-14 w-14 rounded-md object-cover sm:h-12 sm:w-12", { hidden: isLoadingImage })}
                     />
                  }
                  <div className="sm:text-sm">
                     <h6 className={`truncate font-medium capitalize ${isCurrentTrack && "text-success"}`}>{track?.title}</h6>
                     <p className="text-base-content/50">{renderArtists({ artists: track.artists, creator: track.creator })}</p>
                  </div>
               </Track.Item>
               <Track.Item role="cell">{track.album?.title ?? ""}</Track.Item>
               <Track.Item role="cell" className="flex items-center gap-2">
                  <BsClock /> {timer(track?.duration)}
               </Track.Item>
               <Track.Item role="cell">
                  <Dropdown horizontal="left">
                     <Dropdown.Toggle color="ghost" size="sm" shape="square" button={false}>
                        <Button size="sm" shape="square" color="ghost">
                           <BsThreeDots />
                        </Button>
                     </Dropdown.Toggle>
                     <Dropdown.Menu className="whitespace-nowrap rounded-lg bg-base-100 p-0">
                        <Dropdown.Item>
                           <ToggleLikeButton track={track} />
                        </Dropdown.Item>
                        <Dropdown.Item>
                           <ToggleAddToQueueButton track={track} />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleGetTrackToAddPlaylist(track)}>
                           <BiPlus /> Add to playlist
                        </Dropdown.Item>
                        {canRemoveFromPlaylist && (
                           <Dropdown.Item onClick={() => handleRemoveFromPlaylist(track)}>
                              <HiMinus /> Remove from this playlist
                           </Dropdown.Item>
                        )}
                        <Dropdown.Item variant="link" href={track?.downloadUrl}>
                           <BsDownload /> Download
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </Track.Item>
            </Track>
         ) : (
            <SkeletonTrackCard />
         )}
      </div>
   )
}

export const Track = tw.div`group
                            grid 
                            min-h-[60px]
                            grid-cols-[5%,40%,20%,20%,5%]
                            items-center
                            justify-between
                            gap-0 
                            sm:gap-2
                            rounded-lg 
                            p-1 
                            hover:bg-neutral/25
                            sm:grid-cols-[10%,80%,10%]
                            sm:text-sm
                            md:grid-cols-[10%,80%,10%]
                            lg:grid-cols-[10%,80%,10%]
                            sm:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
                            md:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden
                            lg:[&>:not(:first-child):not(:nth-child(2)):not(:last-child)]:hidden duration-300`

Track.Item = ({ ...props }) => <div {...props}>{props.children}</div>
Track.ThumbnailSkeleton = tw.div`animate-pulse h-14 w-14 rounded-lg bg-neutral`

export default memo(TrackCard)

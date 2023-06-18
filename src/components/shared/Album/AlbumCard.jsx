import { Figure } from "@/components/customs/Card"
import { AppContext } from "@/context/AppProvider"
import { useUpdateAlbumsCollectionMutation } from "@/providers/api/collectionApi"
import { setCurrentPlaylist } from "@/providers/slices/queueSlice"
import axios from "axios"
import classNames from "classnames"
import { memo, useContext, useEffect, useState } from "react"
import { Button, Card, Swap } from "react-daisyui"
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import DefaultAlbumThumbnail from "/images/default-thumbnail.png"

const AlbumCard = ({ albumData }) => {
   const { playState, setPlayState } = useContext(AppContext)
   const dispatch = useDispatch()
   const [updateAlbumCollection, { isLoading }] = useUpdateAlbumsCollectionMutation()
   const albumsCollection = useSelector((state) => state.collections?.albums)
   const { currentPlaylist } = useSelector((state) => state.queue)
   const [isLiked, setIsLiked] = useState(false)
   const [isLoadingImage, setIsLoadingImage] = useState(true)

   useEffect(() => {
      let isLiked = Array.isArray(albumsCollection) && albumsCollection?.some((album) => album._id === albumData._id)
      setIsLiked(isLiked)
   }, [])

   const playThisAlbum = async () => {
      if (albumData._id !== currentPlaylist) {
         const { tracks } = await axios.get(`/albums/${albumData._id}`)
         if (!Array.isArray(tracks) || tracks.length === 0) {
            toast.info("Album has no track!")
            return
         }
         dispatch(setCurrentPlaylist({ listId: albumData._id, tracks: tracks, ...albumData }))
         setPlayState(true)
      } else {
         setPlayState(!playState)
      }
   }

   const handleToggleAddToLibrary = async (album) => {
      try {
         await updateAlbumCollection(album)
         setIsLiked(!isLiked)
         !isLiked ? toast.success("Added to your library!") : toast.info("Removed from your library!")
      } catch (error) {
         toast.error(error.message)
      }
   }

   return (
      <Card className="group max-w-[280px] rounded-lg bg-base-300 p-3">
         <Figure shape="square">
            {isLoadingImage && <Skeleton className="aspect-[1] w-full" />}
            <Figure.Image
               src={albumData?.image}
               onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = DefaultAlbumThumbnail
               }}
               alt="thumbnail"
               loading="eager"
               className={classNames({ hidden: isLoadingImage })}
               onLoad={() => setIsLoadingImage(false)}
            />
            <Button
               shape="circle"
               color="success"
               className="sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 sm:btn-sm group-hover:translate-y-0 group-hover:opacity-100"
               onClick={playThisAlbum}>
               {playState && currentPlaylist === albumData?._id ? <BsPauseFill /> : <BsPlayFill />}
            </Button>
         </Figure>
         <Card.Body className="px-0 py-4">
            <div className="label p-0">
               <Card.Title tag={Link} to={`/albums/${albumData?._id}`} className="flex-1 truncate text-lg hover:link sm:text-base">
                  {albumData?.title}
               </Card.Title>

               {isLoading ? (
                  <BsHeartFill className="animate-pulse text-xl text-success" />
               ) : (
                  <Swap
                     offElement={<BsHeart className="text-xl" />}
                     onElement={<BsHeartFill className="text-xl text-success" />}
                     onChange={() => handleToggleAddToLibrary(albumData)}
                     active={isLiked}
                  />
               )}
            </div>
            <Link to={`/artist/${albumData?.artist?._id}`} className="truncate text-base-content/50 hover:link sm:text-sm">
               {albumData?.artist?.name}
            </Link>
         </Card.Body>
      </Card>
   )
}

const Skeleton = tw.div`animate-pulse`
Figure.Image = tw.img`aspect-square min-w-full object-cover`

export default memo(AlbumCard)

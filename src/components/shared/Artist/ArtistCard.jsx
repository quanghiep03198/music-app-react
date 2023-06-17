import { useUpdateArtistsCollectionMutation } from "@/providers/api/collectionApi"
import classNames from "classnames"
import { memo, useEffect, useState } from "react"
import { Card, Swap, Tooltip } from "react-daisyui"
import { BsPersonPlusFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import { Figure, SkeletonImage } from "../../customs/Card"
import AlternativeLogo from "/images/alt-logo.png"

const ArtistCard = ({ artistData, isFetching }) => {
   const authenticated = useSelector((state) => state.auth?.authenticated)
   const [isLoadingImage, setIsLoadingImage] = useState(true)
   const artistCollection = useSelector((state) => state.collections?.artists)
   const [updateArtistCollection, { isLoading }] = useUpdateArtistsCollectionMutation()
   const [isFollowed, setIsFollowed] = useState(false)

   useEffect(() => {
      setIsFollowed(() => (Array.isArray(artistCollection) ? artistCollection?.some((artist) => artist._id === artistData._id) : false))
   }, [artistCollection])

   const handleToggleFollowArtist = async (artist) => {
      try {
         if (!authenticated) {
            toast.info("You have to login first")
            return
         }
         await updateArtistCollection({ artist: artist._id })
         setIsFollowed(!isFollowed)
         !isFollowed ? toast.success(`You've followed ${artist.name}`) : toast.info(`You've unfollowed ${artist.name}`)
      } catch (error) {
         toast.info(error.message)
      }
   }

   return (
      <Card className="group max-w-[280rem] bg-base-300 p-3 duration-300">
         <Figure mask="circle">
            <Figure.Overlay>
               <Swap
                  offElement={
                     <Tooltip position="top" message="Unfollow">
                        <BsPersonPlusFill className="text-3xl text-neutral-content" />
                     </Tooltip>
                  }
                  onElement={
                     <Tooltip position="top" message="Follow">
                        <BsPersonPlusFill className="text-3xl text-success" />
                     </Tooltip>
                  }
                  onChange={() => handleToggleFollowArtist(artistData)}
                  active={isFollowed}
                  className={classNames({ "pointer-events-none": !authenticated })}
               />
            </Figure.Overlay>
            {isLoadingImage && <SkeletonImage tw="min-w-full" />}
            <img
               src={artistData?.avatar}
               onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = AlternativeLogo
               }}
               alt="thumbnail"
               onLoad={() => setIsLoadingImage(false)}
               loading="eager"
               className={classNames("aspect-[1] object-cover", {
                  hidden: isLoadingImage
               })}
            />
         </Figure>

         <Card.Body className="px-0 py-4">
            <Card.Title tag={Link} to={`/artists/${artistData._id}`} className="hover:link">
               {artistData.name}
            </Card.Title>
            <Card.Text>{artistData.desc ?? "Artist"}</Card.Text>
         </Card.Body>
      </Card>
   )
}

Card.Text = tw.p`truncate text-base-content/50 sm:text-sm`
Figure.Overlay = tw.div`absolute top-0 right-0 left-0 bottom-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 duration-300 group-hover:opacity-100`

export default memo(ArtistCard)

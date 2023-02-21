import { useFetchArtistsCollectionQuery, useUpdateArtistsCollectionMutation } from "@/app/services/collectionApi"
import Tooltip from "@/components/customs/atoms/Tooltip"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { useEffect, useRef, useState } from "react"
import { BsPersonPlusFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import tw from "tailwind-styled-components"
import { Card, CardBody, CardTitle, Figure, SkeletonImage } from "../../customs/atoms/Card"
import Swap from "../../customs/atoms/Swap"
import SkeletonCard from "../Skeletons/SkeletonCard"
import AlternativeLogo from "/images/alt-logo.png"

const Overlay = tw.div`absolute top-0 right-0 left-0 bottom-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 duration-300 group-hover:opacity-100`

const ArtistCard = ({ artistData, isFetching }) => {
    const cardRef = useRef(null)
    const isScrolledToView = useRenderOnScroll(cardRef)
    const authenticated = useSelector((state) => state.auth?.authenticated)
    const [isLoadingImage, setIsLoadingImage] = useState(true)

    const { data } = useFetchArtistsCollectionQuery(undefined, {
        skip: !authenticated
    })

    const [updateArtistCollection, { isLoading }] = useUpdateArtistsCollectionMutation()
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        setIsFollowed(() => {
            return Array.isArray(data) ? data?.find((artist) => artist._id === artistData._id) !== undefined : false
        })
    }, [data])

    const handleToggleFollowArtist = async (artist) => {
        try {
            const response = await updateArtistCollection(artist)
            if (response.status === 401) throw new Error(response.message)

            setIsFollowed(!isFollowed)
            !isFollowed ? toast.success(`You've followed ${artist.name}`) : toast.info(`You've unfollowed ${artist.name}`)
        } catch (error) {
            toast.info(error.message)
        }
    }

    return (
        <div ref={cardRef}>
            {!isScrolledToView ? (
                <SkeletonCard mask="circle" />
            ) : (
                <Card>
                    <Figure mask="circle">
                        <Overlay>
                            <Swap
                                swapon={
                                    <Tooltip data-tip="Unfollow">
                                        <BsPersonPlusFill className="text-3xl text-success" />
                                    </Tooltip>
                                }
                                swapoff={
                                    <Tooltip data-tip="Follow">
                                        <BsPersonPlusFill className="text-3xl text-neutral-content" />
                                    </Tooltip>
                                }
                                onChange={() => handleToggleFollowArtist(artistData)}
                                checked={isFollowed}
                            />
                        </Overlay>
                        {isLoadingImage && <SkeletonImage tw="min-w-full aspect-[1]" />}
                        <img
                            src={artistData?.avatar}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null // prevents looping
                                currentTarget.src = AlternativeLogo
                            }}
                            onLoad={() => setIsLoadingImage(false)}
                            className={isLoadingImage ? "hidden" : "aspect-[1] min-w-full object-cover"}
                            loading="lazy"
                        />
                    </Figure>

                    <CardBody>
                        <label className="label p-0">
                            <Link to={`/artist/${artistData._id}`}>
                                <CardTitle>{artistData.name}</CardTitle>
                            </Link>
                        </label>
                        <p className="truncate text-base-content/50 sm:text-sm">{artistData.desc ?? "Artist"}</p>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}

export default ArtistCard

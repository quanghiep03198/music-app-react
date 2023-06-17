import { useCallback, useState } from "react"
import { Hero } from "react-daisyui"
import { SkeletonImage } from "./Card"
import DefaultAlbumThumbnail from "/images/default-album-image.png"
import tw from "tailwind-styled-components"
import classNames from "classnames"

const HeroBanner = ({ children, heroImageUrl, heroImageMask }) => {
   const [isLoadingImage, setIsLoadingImage] = useState(true)

   const handleOnLoadImage = useCallback(() => {
      setIsLoadingImage(false)
   })

   return (
      <Hero className="glass relative place-content-start rounded-xl sm:place-content-center">
         <Hero.Content className="hero-content sm:flex-col">
            {isLoadingImage && <SkeletonImage tw="min-w-[16rem]" />}

            <Image
               src={heroImageUrl}
               onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = DefaultAlbumThumbnail
               }}
               onLoad={handleOnLoadImage}
               className={classNames({
                  "rounded-circle": heroImageMask === "circle",
                  hidden: isLoadingImage
               })}
            />

            <Box>{children}</Box>
         </Hero.Content>
      </Hero>
   )
}

const Box = tw.div`flex flex-1 flex-col gap-2`
const Image = tw.img`aspect-square w-[16rem] rounded-lg object-cover shadow-2xl sm:w-[12rem]`

export default HeroBanner

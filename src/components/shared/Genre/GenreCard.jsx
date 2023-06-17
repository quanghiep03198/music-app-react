import { Card, SkeletonCardTitle } from "@/components/customs/Card"
import useLazyRender from "@/hooks/useLazyRender"
import { useRef } from "react"
import { Link } from "react-router-dom"
import Logo from "/images/logo.png"
import tw from "tailwind-styled-components"
import { HiOutlineMusicalNote } from "react-icons/hi2"
const SkeltonGenreCard = tw.div`max-w-full aspect-square rounded-lg bg-neutral animate-pulse`

const GenreCard = ({ data }) => {
   const cardRef = useRef()
   const isScrollToView = useLazyRender(cardRef)

   return (
      <Link to={`/genres/${data?._id}`} ref={cardRef}>
         {isScrollToView ? (
            <Card className="to glass aspect-square max-w-full bg-no-repeat text-neutral transition-all hover:cursor-pointer">
               <h3 className="text-xl font-semibold text-base-content hover:link sm:text-lg">{data?.name}</h3>
               <img src={Logo} className="absolute bottom-1 left-1 max-w-[8rem] object-cover" />
            </Card>
         ) : (
            <SkeltonGenreCard>
               <SkeletonCardTitle />
            </SkeltonGenreCard>
         )}
      </Link>
   )
}

export default GenreCard

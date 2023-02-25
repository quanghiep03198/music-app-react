import { Card, SkeletonCardTitle } from "@/components/customs/atoms/Card"
import useRenderOnScroll from "@/hooks/useRenderOnScroll"
import { useRef } from "react"
import { Link } from "react-router-dom"
import Logo from "/images/logo.png"
import tw from "tailwind-styled-components"
import { HiOutlineMusicalNote } from "react-icons/hi2"
const SkeltonGenreCard = tw.div`max-w-full aspect-square rounded-lg bg-neutral animate-pulse`

const GenreCard = ({ data }) => {
    const cardRef = useRef()
    const isScrollToView = useRenderOnScroll(cardRef)

    return (
        <Link to={`/genres/${data?._id}`} ref={cardRef}>
            {isScrollToView ? (
                <Card className="to neutral-focus aspect-square max-w-full  bg-cover bg-no-repeat transition-all hover:cursor-pointer">
                    <h3 className="text-xl font-semibold text-base-content hover:link sm:text-lg">{data?.name}</h3>
                    <img src={Logo} className="absolute bottom-1 left-1 max-w-[96px] object-cover" />
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

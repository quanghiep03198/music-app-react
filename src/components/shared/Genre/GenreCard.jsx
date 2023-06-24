import { useRef } from "react"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
import Logo from "/images/logo.png"
import { Card } from "react-daisyui"

const GenreCard = ({ data }) => {
   const cardRef = useRef()

   return (
      <Link to={`/genres/${data?._id}`} ref={cardRef}>
         <Card className="glass aspect-square rounded-lg p-3">
            <Card.Title>{data?.name}</Card.Title>
            <Card.Image src={Logo} className="absolute bottom-3 right-3 max-w-[6rem]" />
         </Card>
      </Link>
   )
}

export default GenreCard

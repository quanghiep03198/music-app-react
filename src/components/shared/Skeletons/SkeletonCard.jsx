import { Card } from "react-daisyui"
import tw from "tailwind-styled-components"
import { SkeletonImage } from "../../customs/Card"

const getShape = (shape) => {
   switch (shape) {
      case "square":
         return "aspect-square"
      case "circle":
         return "rounded-full"
      default:
         return "aspect-square"
   }
}

const SkeletonCard = ({ mask, ...props }) => (
   <Card className="pointer-events-none max-w-[280px] rounded-lg bg-base-300 p-3 duration-300 hover:cursor-grab" {...props}>
      <div className={getShape(mask)}>
         <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <Card.Body className="px-0 py-4">
         <Skeleton className="h-2 w-1/2" />
         <Skeleton className="h-2 w-1/3" />
      </Card.Body>
   </Card>
)

const Skeleton = tw.div`rounded-full bg-neutral animate-pulse`

export default SkeletonCard

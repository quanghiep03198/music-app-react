import tw from "tailwind-styled-components"

export const Figure = tw.figure`relative rounded-lg mask ${(props) => {
   switch (props.mask) {
      case "square":
         return "mask-square"
      case "circle":
         return "mask-circle"
      case "triangle":
         return "mask-triangle"
      case "start":
         return "mask-star"
      case "heart":
         return "mask-heart"
      default:
         return "mask-square"
   }
}}`

export const SkeletonImage = tw.div`max-w-full aspect-square animate-pulse bg-neutral flex justify-center items-center p-16 rounded-lg text-neutral-content ${(
   props
) => props.tw}`
export const SkeletonCardTitle = tw.h1`w-1/2 h-3 rounded-full bg-neutral animate-pulse`
export const SkeletonTextCard = tw.h1`w-1/3 h-2 rounded-full bg-neutral animate-pulse`

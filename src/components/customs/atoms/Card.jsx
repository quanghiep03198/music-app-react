import tw from "tailwind-styled-components"

export const Card = tw.div`group card rounded-lg max-w-[280px] p-3 shadow-xl ${(props) =>
    props.skeleton ? "bg-base-100" : "bg-base-100 hover:bg-neutral/20"} hover:cursor-grab`

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
export const CardTitle = tw.h1`card-title sm:text-base truncate text-lg`
export const CardBody = tw.div`card-body px-0 py-4`
export const CardAction = tw.div`card-actions justify-end`

export const SkeletonFigure = tw.div`rounded-lg mask ${(props) => {
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
export const SkeletonImage = tw.div`max-w-full aspect-square animate-pulse bg-neutral/20 flex justify-center items-center p-16 rounded-lg text-neutral-content ${(
    props
) => props.tw}`
export const SkeletonCardTitle = tw.h1`w-1/2 h-3 rounded-full bg-neutral/20 animate-pulse`
export const SkeletonTextCard = tw.h1`w-1/3 h-2 rounded-full bg-neutral/20 animate-pulse`

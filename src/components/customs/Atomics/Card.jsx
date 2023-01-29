import tw from "tailwind-styled-components"

export const Card = tw.div`group card rounded-lg w-full p-4 sm:p-2 shadow-xl ${(props) =>
    props.skeleton ? "bg-base-100" : "bg-base-100 hover:bg-neutral"} hover:cursor-grab`

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
export const CardTitle = tw.h1`card-title sm:text-base truncate`
export const CardBody = tw.div`card-body px-0 py-4`
export const CardAction = tw.div`card-actions`

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
export const SkeletonImage = tw.div`h-60 max-w-full animate-pulse bg-neutral`
export const CardTitleSkeleton = tw.h1`w-24 h-2 rounded-full bg-neutral animate-pulse`
export const CardTextSkeleton = tw.h1`w-24 h-2 rounded-full bg-neutral animate-pulse`

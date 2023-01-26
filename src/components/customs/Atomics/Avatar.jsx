import React from "react"

import tw from "tailwind-styled-components"

const Avatar = tw.div`avatar [&>img]:rounded-full [&>img]:object-cover ${(
    props
) => {
    switch (props.size) {
        case "sm":
            return "[&>img]:w-10 [&>img]:h-10"
        case "md":
            return "[&>img]:w-12 [&>img]:h-12"
        case "lg":
            return "[&>img]:w-16 [&>img]:h-16"

        default:
            return "[&>img]:w-12 [&>img]:h-12"
    }
}}	${(props) => (props.online ? "online" : "")}`

export default Avatar

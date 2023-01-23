import React from "react"
import tw from "tailwind-styled-components"
export const MenuItem = tw.li`truncate`
export const Menu = tw.ul`menu rounded-xl p-1 ${(props) => {
    switch (props.direction) {
        case "vertical":
            return "vertical-menu"
        case "horizontal":
            return "horizontal-menu"
        default:
            return "vertical-menu"
    }
}}`

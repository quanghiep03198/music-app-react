import tw from "tailwind-styled-components"

export const MenuItem = tw.li`truncate w-full sm:text-sm `
export const Menu = tw.ul`menu items-stretch rounded-lg p-1 ${(props) => {
    switch (props.direction) {
        case "vertical":
            return "vertical-menu"
        case "horizontal":
            return "horizontal-menu"
        default:
            return "vertical-menu"
    }
}}`

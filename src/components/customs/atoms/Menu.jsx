import tw from "tailwind-styled-components"

<<<<<<< HEAD
export const MenuItem = tw.li`truncate w-full sm:text-sm font-normal `
=======
export const MenuItem = tw.li`truncate w-full sm:text-sm `
>>>>>>> 249c10de1e8d8f3d0612943a04dc3e5a84ae8728
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

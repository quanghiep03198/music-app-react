import tw from "tailwind-styled-components"

const Grid = tw.div`grid 

${(props) => {
    return `gap-${props["space-x"]}`
}}
${(props) => {
    return `gap-${props["space-y"]}`
}}

${(props) => {
    switch (props.direction) {
        case "row":
            return "grid-flow-row"
        case "col":
            return "grid-flow-col"
        default:
            return "grid-flow-row"
    }
}}

${(props) => {
    if (!props.breakpoints) {
        return "grid-flow-col auto-cols-max"
    }
    return Object.keys(props.breakpoints)
        .map((key) => `${key}:grid-cols-${props.breakpoints[key]}`)
        .join(" ")
}}
`

export default Grid

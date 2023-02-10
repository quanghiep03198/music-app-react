import React from "react"
import tw from "tailwind-styled-components"

const SwapLabel = tw.label`swap ${(props) => {
    switch (props.effect) {
        case "rotate":
            return "swap-rotate"
        case "flip":
            return "swap-flip"
        case "none":
            return ""
        default:
            return ""
    }
}}`
const Swap = ({ tw, swapon, swapoff, checked, onChange, effect }) => {
    return (
        <SwapLabel effect={effect} className={`${tw}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                    if (onChange) onChange(e)
                }}
            />
            <div className="swap-on">{swapon}</div>
            <div className="swap-off">{swapoff}</div>
        </SwapLabel>
    )
}

export default Swap

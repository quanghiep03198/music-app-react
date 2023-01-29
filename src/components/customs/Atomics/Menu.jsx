import React from "react"
import { useRef } from "react"
import { useId } from "react"
import { useState } from "react"
import tw from "tailwind-styled-components"
export const MenuItem = tw.li`truncate w-full  sm:text-xs`
export const Menu = tw.ul`menu items-stretch rounded-xl p-1 ${(props) => {
    switch (props.direction) {
        case "vertical":
            return "vertical-menu"
        case "horizontal":
            return "horizontal-menu"
        default:
            return "vertical-menu"
    }
}}`
export const SwapMenuItem = (swapOnElement, swapOffElement, onChange) => {
    const id = useId()
    const swapTogglerRef = useRef(null)
    const [swapState, setSwapState] = useState(false)
    const handleSwap = (e) => {
        setSwapState(e.target.checked)
        onChange()
    }
    return (
        <>
            <input type="checkbox" id={id} checked={swapState} className="hidden" onChange={(e) => handleSwap(e)} />
            {swapState ? (
                <MenuItem>
                    <label htmlFor={id}>{swapOnElement}</label>
                </MenuItem>
            ) : (
                <MenuItem>
                    <label htmlFor={id}>{swapOffElement}</label>
                </MenuItem>
            )}
        </>
    )
}

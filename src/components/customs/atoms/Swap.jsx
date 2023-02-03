import React from "react"

const Swap = ({ tw, swapon, swapoff, checked, onChange }) => {
    return (
        <label className={`swap  ${tw}`}>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e)} />
            <div className="swap-on">{swapon}</div>
            <div className="swap-off">{swapoff}</div>
        </label>
    )
}

export default Swap

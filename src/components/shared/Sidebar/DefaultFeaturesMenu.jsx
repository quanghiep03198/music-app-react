import { MenuItem } from "@/components/customs/@core/Menu"
import React, { Fragment } from "react"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsPlusSquareDotted } from "react-icons/bs"
import { toast } from "react-toastify"

const DefaultFeaturesMenu = () => {
    return (
        <Fragment>
            <MenuItem onClick={() => toast.info("You have to signin to you this features")}>
                <a role="menuitem">
                    <BiLibrary aria-hidden className="text-xl" />
                    Library
                </a>
            </MenuItem>
            <MenuItem onClick={() => toast.info("You have to signin to you this features")}>
                <a role="menuitem">
                    <BsHeart aria-hidden className="text-xl" />
                    Liked tracks
                </a>
            </MenuItem>
            <MenuItem onClick={() => toast.info("You have to signin to you this features")}>
                <a role="menuitem">
                    <BsPlusSquareDotted /> Create playlist
                </a>
            </MenuItem>
        </Fragment>
    )
}

export default DefaultFeaturesMenu

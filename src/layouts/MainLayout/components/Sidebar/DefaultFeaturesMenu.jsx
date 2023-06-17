import { Fragment } from "react"
import { Menu } from "react-daisyui"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsPlusSquareDotted } from "react-icons/bs"
import { toast } from "react-toastify"

const DefaultFeaturesMenu = () => {
   return (
      <Fragment>
         <Menu.Item onClick={() => toast.info("You have to signin to you this features")}>
            <a role="menuitem">
               <BiLibrary aria-hidden className="text-xl" />
               Library
            </a>
         </Menu.Item>
         <Menu.Item onClick={() => toast.info("You have to signin to you this features")}>
            <a role="menuitem">
               <BsHeart aria-hidden className="text-xl" />
               Liked tracks
            </a>
         </Menu.Item>
         <Menu.Item onClick={() => toast.info("You have to signin to you this features")}>
            <a role="menuitem">
               <BsPlusSquareDotted /> Create playlist
            </a>
         </Menu.Item>
      </Fragment>
   )
}

export default DefaultFeaturesMenu

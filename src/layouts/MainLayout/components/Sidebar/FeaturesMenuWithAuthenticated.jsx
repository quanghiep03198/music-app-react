import { AppContext, ModalActionEnum } from "@/context/AppProvider"
import { Fragment, useContext } from "react"
import { Menu } from "react-daisyui"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsPlusSquareDotted, BsUpload } from "react-icons/bs"
import { NavLink } from "react-router-dom"

const FeaturesMenuWithAuthenticated = () => {
   const { handleToggleModal } = useContext(AppContext)
   return (
      <Fragment>
         <Menu.Item>
            <NavLink
               to="/library"
               className={({ isActive }) => {
                  return isActive ? "text-success" : ""
               }}>
               <BiLibrary aria-hidden className="text-xl" />
               Library
            </NavLink>
         </Menu.Item>
         <Menu.Item>
            <NavLink
               to="/liked-tracks"
               className={({ isActive }) => {
                  return isActive ? "text-success" : ""
               }}>
               <BsHeart aria-hidden className="text-xl" />
               Liked Tracks
            </NavLink>
         </Menu.Item>
         <Menu.Item onClick={() => handleToggleModal({ type: ModalActionEnum.TOGGLE_UPLOAD_MODAL })}>
            <label>
               <BsUpload className="text-xl" /> Upload
            </label>
         </Menu.Item>
         <Menu.Item onClick={() => handleToggleModal({ type: ModalActionEnum.TOGGLE_CREATE_PLAYLIST_MODAL })}>
            <label>
               <BsPlusSquareDotted className="text-xl" /> Create playlist
            </label>
         </Menu.Item>
      </Fragment>
   )
}

export default FeaturesMenuWithAuthenticated

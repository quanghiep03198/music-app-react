import { Paths } from "@/configs/paths.config"
import { BottomNavigation } from "react-daisyui"
import { BiLibrary } from "react-icons/bi"
import { BsHeart, BsHouse, BsSearch } from "react-icons/bs"
import { HiOutlineQueueList } from "react-icons/hi2"
import { NavLink } from "react-router-dom"

const NavBottom = () => {
   return (
      <BottomNavigation className="relative hidden bg-neutral-focus text-xl font-medium text-neutral-content sm:flex [&>*:where(.active)]:bg-neutral">
         <NavLink to="/">
            <BsHouse />
         </NavLink>
         <NavLink to={Paths.LIBRARY}>
            <BiLibrary />
         </NavLink>
         <NavLink to={Paths.SEARCH}>
            <BsSearch />
         </NavLink>
         <NavLink to={Paths.LIKED_TRACKS}>
            <BsHeart />
         </NavLink>
         <NavLink to={Paths.QUEUE}>
            <HiOutlineQueueList />
         </NavLink>
      </BottomNavigation>
   )
}

export default NavBottom

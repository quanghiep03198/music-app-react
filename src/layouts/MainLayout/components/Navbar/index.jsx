import { useFetchUserDataQuery } from "@/providers/api/authApi"
import { BsPerson, BsPlusSquareDotted, BsUpload } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import PageNavigator from "./PageNavigator"
import SearchBox from "./SearchBox"
import UserController from "./UserController"
import { Tooltip } from "react-daisyui"
import { Paths } from "@/configs/paths.config"

const Navbar = () => {
   const { authenticated } = useSelector((state) => state.auth)
   const { data } = useFetchUserDataQuery(undefined, { skip: !authenticated, refetchOnMountOrArgChange: true })
   const { pathname } = useLocation()

   return (
      <NavHeader className="bg-opacity-0 backdrop-blur-3xl">
         <NavHeader.Item>
            <PageNavigator />
            {pathname === "/search" && <SearchBox />}
         </NavHeader.Item>
         <NavHeader.Item>
            <Tooltip message="Upload track" position="bottom">
               <label htmlFor="upload-track-modal" role="menuitem" className="btn-ghost btn-circle btn hidden text-lg sm:btn-sm sm:inline-flex">
                  <BsUpload />
               </label>
            </Tooltip>
            <Tooltip message="Create playlist" position="bottom">
               <label htmlFor="create-playlist-modal" className="btn-ghost btn-circle btn hidden text-lg sm:btn-sm sm:inline-flex" role="menuitem">
                  <BsPlusSquareDotted className="text-xl" />
               </label>
            </Tooltip>

            {authenticated ? (
               <UserController user={data} />
            ) : (
               <Link to={Paths.LOGIN} className="btn-circle btn text-xl sm:btn-sm">
                  <BsPerson aria-hidden />
               </Link>
            )}
         </NavHeader.Item>
      </NavHeader>
   )
}

const NavHeader = tw.nav`navbar justify-between items-center p-5 gap-6 backdrop-blur-3xl bg-opacity-0`

NavHeader.Item = tw.div`flex items-center gap-4 bg-transparent backdrop-blur-3xl bg-opacity-0`

export default Navbar

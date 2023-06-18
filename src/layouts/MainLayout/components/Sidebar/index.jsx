import { Divider } from "react-daisyui"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import tw from "tailwind-styled-components"
import SidebarMenu from "./SidebarMenu"
import UserPlaylists from "./UserPlaylists"
import Logo from "/images/logo.png"

const Sidebar = () => {
   const { authenticated } = useSelector((state) => state.auth)
   return (
      <Aside>
         <Link to="/">
            <Image src={Logo} loading="eager" />
         </Link>

         <SidebarMenu />
         <Divider />
         {authenticated && <UserPlaylists />}
      </Aside>
   )
}

const Aside = tw.aside`p-2 bg-base-300 w-fit h-full flex flex-col overflow-y-hidden text-neutral-content `
const Image = tw.img`max-w-[200px] aspect-[2/1] object-contain -translate-x-2`

export default Sidebar

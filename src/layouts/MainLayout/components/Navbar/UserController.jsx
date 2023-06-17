import { logout } from "@/providers/reducers/authSlice"
import { BsPerson } from "react-icons/bs"
import { HiLogout } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Avatar, Badge, Dropdown } from "react-daisyui"
import DefaultAvatar from "/images/default-avatar.png"

const UserController = ({ user }) => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(logout())
      localStorage.removeItem("persist:root")
   }

   return (
      <Dropdown vertical="bottom" end>
         <Dropdown.Toggle className="flex items-center gap-2" button={false}>
            <Avatar online shape="circle" size={40} src={user?.avatar || DefaultAvatar} />
            <Badge className="sm:hidden md:hidden">{user?.username}</Badge>
         </Dropdown.Toggle>
         <Dropdown.Menu className="min-w-[200px] whitespace-nowrap rounded-lg p-0">
            <Dropdown.Item>
               <Link to="/account" className="inline-flex items-center gap-3">
                  <BsPerson /> Account <span className="badge hidden sm:inline-flex md:inline-flex">{user?.username}</span>
               </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
               <HiLogout /> Logout
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   )
}

export default UserController

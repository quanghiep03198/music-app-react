import { useFetchUserDataQuery } from "@/providers/api/authApi"
import { useRef } from "react"
import { Menu } from "react-daisyui"
import { BsKey, BsPencil, BsPerson } from "react-icons/bs"
import { NavLink } from "react-router-dom"

import tw from "tailwind-styled-components"

const DrawerSidebar = tw.aside`drawer-side`
const DrawerOverlay = tw.label`drawer-overlay`
const DrawerSideWrapper = tw.div`p-2 min-w-[320px] flex flex-col gap-6 overflow-y-hidden bg-base-300`

const Sidebar = () => {
   const overlayRef = useRef()
   const { data, isFetching } = useFetchUserDataQuery()

   return (
      <DrawerSidebar>
         <DrawerOverlay htmlFor="sidebar-toggle" ref={overlayRef} />{" "}
         <Menu>
            <Menu.Item>
               <NavLink
                  to="/account"
                  className={({ isActive }) => {
                     return isActive ? "text-success" : ""
                  }}>
                  <BsPerson aria-hidden className="text-xl" /> Overall
               </NavLink>
               <NavLink
                  to="/account/edit-info"
                  className={({ isActive }) => {
                     return isActive ? "text-success" : ""
                  }}>
                  <BsPencil aria-hidden className="text-xl" /> Edit Info
               </NavLink>
               <NavLink
                  to="/account/edit-info"
                  className={({ isActive }) => {
                     return isActive ? "text-success" : ""
                  }}>
                  <BsKey aria-hidden className="text-xl" /> Change Password
               </NavLink>
            </Menu.Item>
         </Menu>
         <DrawerSideWrapper>
            <Menu>
               <Menu.Item>
                  <NavLink
                     to="/account"
                     className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                     }}>
                     <BsPerson aria-hidden className="text-xl" /> Overall
                  </NavLink>
                  <NavLink
                     to="/account/edit-info"
                     className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                     }}>
                     <BsPencil aria-hidden className="text-xl" /> Edit Info
                  </NavLink>
                  <NavLink
                     to="/account/edit-info"
                     className={({ isActive }) => {
                        return isActive ? "text-success" : ""
                     }}>
                     <BsKey aria-hidden className="text-xl" /> Change Password
                  </NavLink>
               </Menu.Item>
            </Menu>
         </DrawerSideWrapper>
      </DrawerSidebar>
   )
}

export default Sidebar

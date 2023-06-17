import { HiBars3CenterLeft } from "react-icons/hi2"
import { useSelector } from "react-redux"
import UserController from "../../MainLayout/components/Navbar/UserController"
import Logo from "/images/logo.png"

const Navbar = () => {
   const { user } = useSelector((state) => state.auth)

   return (
      <div className=" bg-base-300 text-neutral-content">
         <div className="navbar mx-auto w-full max-w-7xl">
            <div className="navbar-start">
               <div className="hidden flex-none sm:block md:block">
                  <label htmlFor="my-drawer-3" className="btn-ghost btn-sm btn-square btn">
                     <HiBars3CenterLeft />
                  </label>
               </div>
               <div className="mx-2 flex-1 px-2">
                  <img src={Logo} className="max-w-[10rem]" />
               </div>
            </div>
            <div className="navbar-center sm:hidden md:hidden">
               <ul className="flex flex-row items-center gap-3 [&>li]:btn-ghost [&>li]:btn">
                  {/* <!-- Navbar menu content here --> */}
                  <li>
                     <a>Premium</a>
                  </li>
                  <li>
                     <a>Support</a>
                  </li>
                  <li>
                     <a>Download</a>
                  </li>
               </ul>
            </div>
            <div className="navbar-end">
               <UserController user={user} />
            </div>{" "}
         </div>
      </div>
   )
}

export default Navbar

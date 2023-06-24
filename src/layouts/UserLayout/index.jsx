import { useFetchUserDataQuery } from "@/providers/api/authApi"
import { LoadingWrapper } from "@/components/shared/Loading/LazyLoadingScreen"
import { Suspense, useEffect, useRef } from "react"
import { BsKey, BsPencil, BsPerson } from "react-icons/bs"
import { Link, Outlet, useLocation } from "react-router-dom"
import Loading from "../../components/customs/Loading"
import ErrorBoundary from "../../components/error/ErrorBoundary"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Menu } from "react-daisyui"
import tw from "tailwind-styled-components"

const Account = () => {
   const { data } = useFetchUserDataQuery(undefined, { refetchOnMountOrArgChange: true })
   const { pathname } = useLocation()
   const sidebarTogglerRef = useRef(null)

   useEffect(() => {
      if (sidebarTogglerRef.current) {
         sidebarTogglerRef.current.checked = false
      }
   }, [pathname])
   return (
      <ErrorBoundary>
         <div className="drawer">
            <div className="drawer-content flex min-h-screen flex-col justify-between">
               <Navbar user={data} />
               <div className="bg-neutral ">
                  <div className="mx-auto grid h-screen max-w-7xl grid-cols-[1fr,3fr] items-stretch gap-4 bg-base-100 sm:grid-cols-1">
                     <Aside>
                        <Menu>
                           <Menu.Item>
                              <Link to="/account">
                                 <BsPerson /> Overall
                              </Link>
                           </Menu.Item>
                           <Menu.Item>
                              <Link to="/account">
                                 <BsPencil /> Edit profile
                              </Link>
                           </Menu.Item>
                           <Menu.Item>
                              <Link to="/account/change-password">
                                 <BsKey /> Change password
                              </Link>
                           </Menu.Item>
                        </Menu>
                     </Aside>
                     <div className="p-3">
                        <Suspense
                           fallback={
                              <LoadingWrapper>
                                 <Loading />
                              </LoadingWrapper>
                           }>
                           <Outlet />
                        </Suspense>
                     </div>
                  </div>
               </div>
               <Footer />
            </div>
         </div>
      </ErrorBoundary>
   )
}

const Aside = tw.aside`bg-base-200 p-3 sm:hidden md:hidden`

export default Account

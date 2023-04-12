import { useFetchUserDataQuery } from "@/app/services/authApi"
import { Suspense, useEffect, useRef } from "react"
import { HiBars3CenterLeft } from "react-icons/hi2"
import { Link, Outlet, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import Loading from "../customs/@core/Loading"
import ErrorBoundary from "../customs/ErrorBoundary"
import AccountLayoutNavbar from "../shared/Account/AccountNavbar"
import AccountLayoutSidebar from "../shared/Account/AccountLayoutSidebar"
import AccountLayoutFooter from "../shared/Account/AccountLayoutFooter"
import { LoadingWrapper } from "@/App"
import { BsKey, BsPencil, BsPerson } from "react-icons/bs"

const Account = () => {
    const { data } = useFetchUserDataQuery(undefined)
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
                <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex min-h-screen flex-col justify-between">
                    <AccountLayoutNavbar use={data} />
                    <div className="bg-neutral ">
                        <div className="mx-auto grid h-screen max-w-7xl grid-cols-[1fr,3fr] items-stretch gap-4 bg-base-100 sm:grid-cols-1">
                            <aside className="bg-base-200 p-3 sm:hidden md:hidden">
                                <ul className="menu">
                                    <li>
                                        <Link to="/account">
                                            <BsPerson /> Overall
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/account">
                                            <BsPencil /> Edit profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/account/change-password">
                                            <BsKey /> Change password
                                        </Link>
                                    </li>
                                </ul>
                            </aside>
                            <Suspense
                                fallback={
                                    <LoadingWrapper>
                                        <Loading />
                                    </LoadingWrapper>
                                }>
                                <div className="p-3">
                                    <Outlet />
                                </div>
                            </Suspense>
                        </div>
                    </div>
                    <AccountLayoutFooter />
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default Account

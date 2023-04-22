import { useFetchUserDataQuery } from "@/redux/api/authApi"
import { LoadingWrapper } from "@/components/shared/Loading/LazyLoadingScreen"
import { Suspense, useEffect, useRef } from "react"
import { BsKey, BsPencil, BsPerson } from "react-icons/bs"
import { Link, Outlet, useLocation } from "react-router-dom"
import Loading from "../components/customs/@core/Loading"
import ErrorBoundary from "../components/customs/ErrorBoundary"
import AccountLayoutFooter from "../components/shared/Account/AccountLayoutFooter"
import AccountLayoutNavbar from "../components/shared/Account/AccountNavbar"

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

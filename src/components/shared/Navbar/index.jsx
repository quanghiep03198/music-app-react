import { useFetchUserDataQuery } from "@/app/services/authApi"
import Swap from "@/components/customs/atoms/Swap"
import { ThemeContext } from "@/context/ThemeProvider"
import { useContext } from "react"
import { BsList, BsMoon, BsPerson, BsSun, BsUpload } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import PageNavigator from "./PageNavigator"
import SearchBox from "./SearchBox"
import UserController from "./UserController"

const NavbarWrapper = tw.nav`navbar justify-between items-center p-5 gap-6`
const Navbar = () => {
    const { authenticated, accessToken } = useSelector((state) => state.auth)
    const { data } = useFetchUserDataQuery(undefined)
    const { isDarkTheme, setTheme } = useContext(ThemeContext)
    const { pathname } = useLocation()

    return (
        <NavbarWrapper>
            <div className="flex items-center gap-4">
                <PageNavigator />
                {pathname === "/search" && <SearchBox />}
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="sidebar-toggle" className="btn-circle btn hidden sm:inline-flex sm:btn-sm">
                    <BsList aria-hidden />
                </label>
                <label htmlFor="upload-track-modal" role="menuitem" className="btn-circle btn hidden sm:inline-flex sm:btn-sm">
                    <BsUpload />
                </label>
                <Swap
                    effect="rotate"
                    swapoff={<BsMoon />}
                    swapon={<BsSun />}
                    tw="btn btn-circle btn-sm btn-ghost text-lg"
                    onChange={() => setTheme(!isDarkTheme)}
                />
                {authenticated ? (
                    <UserController user={data} />
                ) : (
                    <Link to="/login" className="btn-circle btn text-xl sm:btn-sm">
                        <BsPerson aria-hidden />
                    </Link>
                )}
            </div>
        </NavbarWrapper>
    )
}

export default Navbar

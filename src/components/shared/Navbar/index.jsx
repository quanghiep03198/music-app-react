import { useFetchUserDataQuery } from "@/app/services/authApi"
import Swap from "@/components/customs/atoms/Swap"
import Tooltip from "@/components/customs/atoms/Tooltip"
import { ThemeContext } from "@/context/ThemeProvider"
import { useContext } from "react"
import { BsList, BsMoon, BsPerson, BsPlusSquareDotted, BsSun, BsUpload } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import tw from "tailwind-styled-components"
import PageNavigator from "./PageNavigator"
import SearchBox from "./SearchBox"
import UserController from "./UserController"

const NavbarWrapper = tw.nav`navbar justify-between items-center p-5 gap-6`
const Navbar = () => {
    const { authenticated } = useSelector((state) => state.auth)
    const { data } = useFetchUserDataQuery(undefined, { skip: !authenticated })
    const { isDarkTheme, setTheme } = useContext(ThemeContext)
    const { pathname } = useLocation()

    return (
        <NavbarWrapper>
            <div className="flex items-center gap-4">
                <PageNavigator />
                {pathname === "/search" && <SearchBox />}
            </div>
            <div className="flex items-center gap-4">
                <Tooltip data-tip="Upload track" position="bottom">
                    <label htmlFor="upload-track-modal" role="menuitem" className="btn-ghost btn-circle btn hidden text-lg sm:inline-flex sm:btn-sm">
                        <BsUpload />
                    </label>
                </Tooltip>
                <Tooltip data-tip="Create playlist" position="bottom">
                    <label htmlFor="create-playlist-modal" className="btn-ghost btn-circle btn hidden text-lg sm:inline-flex sm:btn-sm" role="menuitem">
                        <BsPlusSquareDotted className="text-xl" />
                    </label>
                </Tooltip>
                {/* <Swap
                    effect="rotate"
                    swapoff={<BsMoon />}
                    swapon={<BsSun />}
                    tw="btn btn-circle btn-sm btn-ghost text-lg"
                    onChange={() => setTheme(!isDarkTheme)}
                /> */}
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

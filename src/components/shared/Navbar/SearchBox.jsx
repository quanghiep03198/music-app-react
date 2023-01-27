import Loading from "@/components/customs/Atomics/Loading"
import { AppContext } from "@/context/AppProvider"
import axios from "@/app/axios/axios.config"
import { useContext, useEffect, useId, useRef, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import Button from "../../customs/Atomics/Button"

const SearchBox = () => {
    const id = useId()
    const navigate = useNavigate()
    const { setSearchResult } = useContext(AppContext)
    const [searchValue, setSearchValue] = useState("")
    const typingTimeoutRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (searchValue === "") setSearchResult(null)
    }, [searchValue])

    const handleSearch = (e) => {
        try {
            setSearchValue(e.target.value)
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
            setIsLoading(true)
            typingTimeoutRef.current = setTimeout(async () => {
                const data = await axios.post(`/search`, {
                    keyword: e.target.value
                })
                setIsLoading(false)
                setSearchResult(data)
                if (e.target.value === "") setSearchResult(null)
            }, 300)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <form
            className="flex items-center gap-1 rounded-full border border-neutral bg-base-200 px-2 "
            onSubmit={(e) => {
                e.preventDefault()
            }}
        >
            {isLoading ? (
                <Loading size="xs" />
            ) : (
                <Button
                    type="button"
                    shape="circle"
                    size="sm"
                    color="transparent"
                    className="text-lg"
                >
                    <BsSearch />
                </Button>
            )}

            <input
                type="search"
                className={`input input-sm rounded-full bg-transparent focus:outline-none`}
                id={id}
                placeholder="Search ..."
                value={searchValue}
                onFocus={() => navigate("/search")}
                onChange={(e) => handleSearch(e)}
            />
        </form>
    )
}

export default SearchBox

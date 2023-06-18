import Loading from "@/components/customs/Loading"
import axios from "@/configs/axios.config"
import { AppContext } from "@/context/AppProvider"
import useDebounce from "@/hooks/userDebounce"
import { useContext, useId } from "react"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
   const id = useId()
   const navigate = useNavigate()
   const { setSearchResult } = useContext(AppContext)

   async function handleSearch(searchTerm) {
      try {
         const data = await axios.get(`/search`, {
            params: {
               keyword: searchTerm
            }
         })

         setSearchResult(data)
         if (searchTerm === "") setSearchResult(null)
      } catch (error) {}
   }

   const [debounceSearch, isLoading] = useDebounce(handleSearch, 500)

   return (
      <form
         className="flex items-center gap-1 rounded-full border border-neutral bg-base-200 px-2 "
         onSubmit={(e) => {
            e.preventDefault()
         }}>
         <label htmlFor="" className="basis-1/6">
            {isLoading ? <Loading size="xs" /> : <BsSearch className="text-lg" />}
         </label>

         <input
            type="search"
            className={`input input-sm basis-5/6 rounded-full bg-transparent focus:outline-none`}
            id={id}
            placeholder="Search ..."
            onFocus={() => navigate("/search")}
            onChange={(e) => debounceSearch(e.target.value)}
         />
      </form>
   )
}

export default SearchBox

import Loading from "@/components/customs/Loading"
import axios from "@/configs/axios.config"
import { Paths } from "@/configs/paths.config"
import { AppContext } from "@/context/AppProvider"
import useDebounce from "@/hooks/userDebounce"
import { useContext, useEffect, useId, useRef } from "react"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import tw from "tailwind-styled-components"

const SearchBox = () => {
   const id = useId()
   const navigate = useNavigate()
   const { setSearchResult } = useContext(AppContext)
   const inputRef = useRef(null)
   useEffect(() => inputRef.current.focus())
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
      <Form>
         <Form.Label htmlFor={id}>{isLoading ? <Loading size="xs" /> : <BsSearch className="text-lg" />}</Form.Label>
         <Form.Input ref={inputRef} type="search" id={id} placeholder="Search ..." onChange={(e) => debounceSearch(e.target.value)} />
      </Form>
   )
}

const Form = tw.form`flex items-center gap-1 rounded-full border border-neutral bg-base-200 px-2 `
Form.Label = tw.label`basis-1/6`
Form.Input = tw.input`input input-sm basis-5/6 rounded-full bg-transparent focus:outline-none`

export default SearchBox

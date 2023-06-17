import { useEffect, useState } from "react"

const useLazyRender = (elementRef) => {
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      if (elementRef.current) {
         const observer = new IntersectionObserver(
            (entries, observer) => {
               entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                     setIsVisible(true)
                     observer.unobserve(elementRef.current)
                  }
               })
            },
            {
               root: null,
               rootMargin: "0px 0px 0px 0px", // breakpoint start to view
               threshold: 0 // space to view
            }
         )
         observer.observe(elementRef.current)
      }
   }, [elementRef])
   return isVisible
}

export default useLazyRender

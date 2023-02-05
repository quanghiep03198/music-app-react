import { clearConfigCache } from "prettier"
import { useState, useEffect } from "react"

const OPTIONS = {
    root: null,
    rootMargin: "0px 0px 0px 0px", // breakpoint start to view
    threshold: 0 // space to view
}

const useRenderOnScroll = (elementRef) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (elementRef.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setIsVisible(true)
                            observer.unobserve(elementRef.current)
                        }, 100)
                    }
                })
            }, OPTIONS)
            observer.observe(elementRef.current)
        }
    }, [elementRef])

    return isVisible
}

export default useRenderOnScroll

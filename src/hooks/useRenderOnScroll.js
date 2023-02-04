import { useEffect, useState } from "react"

const OPTIONS = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 1
}

const useRenderOnScroll = (elementRef) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (elementRef.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer.unobserve(elementRef.current)
                    }
                })
            }, OPTIONS)
            observer.observe(elementRef.current)
        }
    }, [elementRef])
    console.log("is visible:>>", isVisible)
    return isVisible
}

export default useRenderOnScroll

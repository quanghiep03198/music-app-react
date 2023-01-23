const debounce = (callback, timeout) => {
    timeout = timeout || 0
    let timerId
    return () => {
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            callback()
        }, timeout)
    }
}
export default debounce

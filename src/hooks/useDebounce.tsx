import { useState, useEffect } from "react"

/**
 * 防抖hooks
 * @param inputValue 
 * @param delay 
 */
const useDebounce = (inputValue: any, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(inputValue)

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounceValue(inputValue)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [inputValue, delay])

    return debounceValue
}

export default useDebounce
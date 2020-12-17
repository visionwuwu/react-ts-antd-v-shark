import { useEffect, RefObject } from "react"

const useClickOutside = (ref: RefObject<HTMLInputElement>, handler: Function) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener("click", listener, false)
        return () => {
            document.removeEventListener("click", listener, false)
        }
    }, [ref, handler])
}

export default useClickOutside

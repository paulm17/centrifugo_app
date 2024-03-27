import { useRef, useEffect } from "react"

export function useNotFirstRender() {
  const notFirstRender = useRef(false)

  useEffect(() => {
    notFirstRender.current = true
  }, [])

  return notFirstRender.current
}

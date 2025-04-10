
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Default to desktop for SSR
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    mql.addEventListener("change", handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      mql.removeEventListener("change", handleResize)
    }
  }, [])

  return isMobile
}

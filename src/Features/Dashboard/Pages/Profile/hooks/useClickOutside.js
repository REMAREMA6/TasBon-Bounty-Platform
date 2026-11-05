import { useEffect, useRef } from 'react'

/**
 * Calls `handler` when the user clicks/taps anywhere outside `ref`.
 * Pass `enabled` so the listener is only attached while the popup is open.
 *
 * Usage:
 *   const ref = useRef(null)
 *   useClickOutside(ref, () => setOpen(false), open)
 *   return <div ref={ref}> ... </div>
 */
export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    function onPointerDown(event) {
      const el = ref.current
      if (!el || el.contains(event.target)) return
      handler()
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [ref, handler, enabled])
}

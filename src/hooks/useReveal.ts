import { useEffect, useRef } from "react"
import { reduceMotion } from "../scene/pointer"

/** Fades in every `.reveal` inside the returned element the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>(".reveal")
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((e) => (e.dataset.in = "1"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { (en.target as HTMLElement).dataset.in = "1"; io.unobserve(en.target) }
      }),
      { threshold: 0.2 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  return ref
}

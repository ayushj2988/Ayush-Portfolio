import { useEffect, useRef } from "react"
import { reduceMotion } from "../scene/pointer"

/** The diagonal band of light from the reference poster. It drifts with the pointer. */
export default function Beam() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduceMotion) return
    const move = (e: PointerEvent) => {
      const x = (e.clientX / innerWidth) * 2 - 1, y = (e.clientY / innerHeight) * 2 - 1
      if (ref.current) ref.current.style.transform = `translate(${x * 90}px, ${y * 30}px)`
    }
    addEventListener("pointermove", move)
    return () => removeEventListener("pointermove", move)
  }, [])
  return <div ref={ref} className="beam" aria-hidden="true" />
}

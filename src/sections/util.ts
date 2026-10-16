import type { CSSProperties } from "react"

/** Sets the tilt (--rot, in degrees) and fade-in order (--i) used by `.reveal` elements. */
export const at = (rot: number, i: number) => ({ "--rot": `${rot}deg`, "--i": i }) as CSSProperties

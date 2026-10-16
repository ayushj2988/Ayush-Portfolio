/** Smoothed pointer position (-1..1), shared by the rig and every item. */
export const ptr = { x: 0, y: 0 }
/** 0 at the top of the page, 1 once the desk has scrolled fully out of view. */
export const scroll = { p: 0 }
export const reduceMotion = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches

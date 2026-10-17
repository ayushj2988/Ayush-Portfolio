import { SITE } from "../config"
import type { ProjectId } from "../data/projects"
import * as D from "./draw"

export type Action =
  | { type: "project"; id: ProjectId }
  | { type: "external"; url: string }
  | { type: "route"; to: string }
  | { type: "mail"; address: string }

export type DeskItem = {
  key: string; w: number; h: number; draw: D.Draw
  x: number; y: number; rot: number; depth: number
  animated?: boolean
  action?: Action
}

/**
 * Everything on the desk, back to front. Scene units: the desk is 16 wide and 10 tall,
 * with (0, 0) in the middle and y pointing up.
 */
const all: DeskItem[] = [
  // back layer: pencils and stars
  { key: "pencil-1", w: 6, h: 0.42, draw: D.drawPencil, x: -5.8, y: -2.6, rot: -0.62, depth: 0.5 },
  { key: "pencil-2", w: 6, h: 0.42, draw: D.drawPencil, x: -6.6, y: -3.9, rot: -0.42, depth: 0.5 },
  { key: "star-1", w: 1.9, h: 1.9, draw: D.drawStar, x: -7, y: 4, rot: 0.15, depth: 0.9 },
  { key: "star-2", w: 1.3, h: 1.3, draw: D.drawStar, x: 6.7, y: 0.5, rot: -0.3, depth: 0.8 },
  // the nameplate
  { key: "name", w: 7.4, h: 2.8, draw: D.drawName, x: 0, y: 0.3, rot: 0, depth: 0.4 },
  // projects
  { key: "nova", w: 3.2, h: 3.6, draw: D.drawNova, x: 5.6, y: 3.1, rot: -0.12, depth: 0.7, action: { type: "project", id: "nova" } },
  { key: "climate", w: 2.8, h: 3.2, draw: D.drawClimate, x: -4.6, y: 3.2, rot: 0.1, depth: 0.8, action: { type: "project", id: "climate" } },
  { key: "sketch", w: 3.4, h: 3.6, draw: D.drawSketch, x: -0.8, y: -3.2, rot: -0.08, depth: 0.6, action: { type: "project", id: "sketch" } },
  { key: "radar", w: 4, h: 3, draw: D.drawRadar, x: 5.2, y: -2.9, rot: 0.15, depth: 0.6, animated: true, action: { type: "project", id: "radar" } },
  { key: "playnex", w: 1.7, h: 2.7, draw: D.drawPlayne, x: 2.05, y: -3.5, rot: 0.12, depth: 0.7, action: { type: "project", id: "playnex" } },
  { key: "notetube", w: 1.9, h: 2.1, draw: D.drawNoteTube, x: 2.5, y: 3.2, rot: -0.1, depth: 0.7, action: { type: "project", id: "notetube" } },
  // tape labels
  { key: "tape-software", w: 1.9, h: 0.5, draw: D.labelDraw("software", "#ee8a3b"), x: -2.9, y: 2.1, rot: -0.05, depth: 0.5 },
  { key: "tape-2026", w: 1.9, h: 0.5, draw: D.labelDraw("2026", "#ee8a3b"), x: -3.3, y: -1.4, rot: 0.04, depth: 0.5 },
  // links
  { key: "github", w: 1.3, h: 1.45, draw: D.stickerDraw("GitHub", "GH", "#24292f"), x: -1.3, y: 3.7, rot: -0.12, depth: 0.8, action: { type: "external", url: SITE.github } },
  { key: "linkedin", w: 1.3, h: 1.45, draw: D.stickerDraw("LinkedIn", "in", "#0a66c2"), x: -5.6, y: 0.4, rot: 0.1, depth: 0.8, action: { type: "external", url: SITE.linkedin } },
  { key: "leetcode", w: 1.3, h: 1.45, draw: D.stickerDraw("LeetCode", "LC", "#f89f1b"), x: 0.3, y: 3.8, rot: 0.1, depth: 0.8, action: { type: "external", url: SITE.leetcode } },
  { key: "resume", w: 1.3, h: 1.45, draw: D.stickerDraw("Resume", "PDF", "#d94a4a"), x: -5.0, y: -1.0, rot: 0.12, depth: 0.8, action: { type: "route", to: SITE.resumeRoute } },
  { key: "contact", w: 3, h: 1.2, draw: D.drawContact(SITE.email), x: 3.4, y: -1.3, rot: -0.06, depth: 0.7, action: { type: "mail", address: SITE.email } },
]

/** Link stickers with an empty url are left off the desk. */
export const items = all.filter((i) => !(i.action?.type === "external" && !i.action.url))

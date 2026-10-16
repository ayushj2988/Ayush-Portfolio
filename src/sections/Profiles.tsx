import type { CSSProperties } from "react"
import { Link } from "react-router-dom"
import { SITE } from "../config"
import { useReveal } from "../hooks/useReveal"
import { at } from "./util"

type Sticker = { label: string; glyph: string; color: string; note: string; href: string; kind: "external" | "route" | "mail"; rot: number }

const stickers: Sticker[] = [
  { label: "GitHub", glyph: "GH", color: "#24292f", note: "Repositories and contributions", href: SITE.github, kind: "external", rot: -3 },
  { label: "LeetCode", glyph: "LC", color: "#f89f1b", note: "Solved problems and coding activity", href: SITE.leetcode, kind: "external", rot: 2.5 },
  { label: "LinkedIn", glyph: "in", color: "#0a66c2", note: "Professional profile", href: SITE.linkedin, kind: "external", rot: -1.5 },
  { label: "Resume", glyph: "PDF", color: "#d94a4a", note: "Read it or download the PDF", href: SITE.resumeRoute, kind: "route", rot: 3 },
  { label: "Email", glyph: "@", color: "#2f8f55", note: "Write to me directly", href: `mailto:${SITE.email}`, kind: "mail", rot: -2.2 },
]

function Body({ s }: { s: Sticker }) {
  return (
    <>
      <span className="pin" aria-hidden="true" />
      <span className="emblem" style={{ background: s.color }} aria-hidden="true">{s.glyph}</span>
      <strong>{s.label}</strong>
      <small>{s.note}</small>
    </>
  )
}

export default function Profiles() {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} className="section" id="profiles" aria-labelledby="profiles-title">
      <h2 id="profiles-title" className="section-title reveal" style={at(-1.5, 0)}>Coding profiles</h2>
      <div className="stickers">
        {stickers.filter((s) => s.href).map((s, i) => {
          const props = { className: "sticker reveal", style: at(s.rot, i) as CSSProperties }
          return s.kind === "route" ? (
            <Link key={s.label} to={s.href} {...props}><Body s={s} /></Link>
          ) : s.kind === "mail" ? (
            <a key={s.label} href={s.href} {...props}><Body s={s} /></a>
          ) : (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" {...props}><Body s={s} /></a>
          )
        })}
      </div>
    </section>
  )
}

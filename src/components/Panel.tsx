import { useEffect, useRef } from "react"
import type { Project } from "../data/projects"

type Props = { project: Project | null; onClose: () => void }

/** A real link once you add the url in config.ts, a greyed-out button until then. */
function ProjectLink({ href, tone = "yellow", children }: { href: string; tone?: "yellow" | "orange"; children: string }) {
  const cls = `btn btn-${tone}`
  return href ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <button className={cls} disabled aria-disabled="true" title="Link coming soon">{children}</button>
  )
}

export default function Panel({ project, onClose }: Props) {
  const ref = useRef<HTMLElement>(null)
  const returnTo = useRef<Element | null>(null)

  useEffect(() => {
    if (!project) return
    returnTo.current = document.activeElement
    ref.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    addEventListener("keydown", onKey)
    return () => {
      removeEventListener("keydown", onKey)
      ;(returnTo.current as HTMLElement | null)?.focus?.()
    }
  }, [project, onClose])

  return (
    <aside ref={ref} className={`panel${project ? " open" : ""}`} role="dialog" aria-labelledby="panel-title" tabIndex={-1} aria-hidden={!project}>
      {project && (
        <>
          <button className="x" onClick={onClose} aria-label="Close project">×</button>
          <h2 id="panel-title">{project.title}</h2>
          <p className="meta">{project.meta}</p>
          <p className="lead">{project.lead}</p>
          <ul className="points">{project.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <ul className="stack">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="panel-links">
            <ProjectLink href={project.live}>Live demo</ProjectLink>
            <ProjectLink href={project.github} tone="orange">GitHub</ProjectLink>
          </div>
        </>
      )}
    </aside>
  )
}

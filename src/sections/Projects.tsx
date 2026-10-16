import type { CSSProperties } from "react"
import { useReveal } from "../hooks/useReveal"
import { projects, type ProjectId } from "../data/projects"

const look: Record<ProjectId, { rot: number }> = {
  playnex: { rot: -1.2 }, nova: { rot: 1.4 }, climate: { rot: -1.1 }, sketch: { rot: 1.3 }, radar: { rot: -1.5 },
}

function Visual({ id }: { id: ProjectId }) {
  if (id === "climate")
    return (
      <div className="vis vis-climate" aria-hidden="true">
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <polyline points="10,85 50,62 80,70 120,40 160,28 192,10" fill="none" stroke="#1d1b2e" strokeWidth="3" strokeLinejoin="round" />
          {[[10, 85], [50, 62], [80, 70], [120, 40], [160, 28], [192, 10]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#ee8a3b" stroke="#1d1b2e" strokeWidth="2" />)}
        </svg>
      </div>
    )
  return <div className={`vis vis-${id}`} aria-hidden="true" />
}

type Props = { onSelect: (id: ProjectId) => void }

export default function Projects({ onSelect }: Props) {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} className="section" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-title reveal" style={{ "--rot": "1.5deg", "--i": 0 } as CSSProperties}>Projects</h2>
      <div className="cards">
        {Object.values(projects).map((p, i) => (
          <button
            key={p.id}
            className={`card card-${p.id} reveal`}
            style={{ "--rot": `${look[p.id].rot}deg`, "--i": i } as CSSProperties}
            onClick={() => onSelect(p.id)}
            aria-label={`${p.title}: see details`}
          >
            {p.status && <span className="badge">{p.status}</span>}
            <Visual id={p.id} />
            <h3>{p.title}</h3>
            <p>{p.lead}</p>
            <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            <span className="more">See details</span>
          </button>
        ))}
      </div>
    </section>
  )
}

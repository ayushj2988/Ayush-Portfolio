import { useReveal } from "../hooks/useReveal"
import { at } from "./util"

const groups = [
  { title: "Languages", items: ["Python", "C++", "C", "Java (coursework)"], rot: -1.2 },
  { title: "Databases", items: ["MySQL", "LiveSQL", "MongoDB"], rot: 1.1 },
  { title: "Web and APIs", items: ["HTML", "CSS", "React", "Flask", "FastAPI", "REST API design"], rot: -0.8 },
  { title: "Vision and ML", items: ["OpenCV", "YOLOv8", "Random Forest"], rot: 1.4 },
  { title: "Practices", items: ["Git", "Debugging", "Algorithm design", "Complexity analysis", "Technical documentation"], rot: -1.3 },
  { title: "Working with people", items: ["Presentations", "Report writing", "Teamwork", "Cross-functional coordination"], rot: 0.9 },
]

export default function Skills() {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} className="section" id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-title reveal" style={at(1.5, 0)}>Skills</h2>
      <div className="skill-grid">
        {groups.map((g, i) => (
          <div key={g.title} className="paper skill reveal" style={at(g.rot, i % 3)}>
            <h3>{g.title}</h3>
            <ul className="stack">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useCallback, useEffect, useState } from "react"
import Beam from "../components/Beam"
import Panel from "../components/Panel"
import { projects, type ProjectId } from "../data/projects"
import Desk from "../scene/Desk"
import About from "../sections/About"
import Contact from "../sections/Contact"
import Profiles from "../sections/Profiles"
import Projects from "../sections/Projects"
import Skills from "../sections/Skills"

/** The canvas draws text, so wait for the handwriting font first. */
function useFonts() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    Promise.all([
      document.fonts.load("700 40px Gaegu"),
      document.fonts.load("400 40px Gaegu"),
    ]).catch(() => {}).then(() => setReady(true))
  }, [])
  return ready
}

function useScrolled(px = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > px)
    on()
    addEventListener("scroll", on, { passive: true })
    return () => removeEventListener("scroll", on)
  }, [px])
  return scrolled
}

export default function Home() {
  const [selected, setSelected] = useState<ProjectId | null>(null)
  const ready = useFonts()
  const scrolled = useScrolled()
  const close = useCallback(() => setSelected(null), [])

  return (
    <main className={`page${selected ? " has-panel" : ""}`}>
      <section className="hero" aria-label="Intro">
        <h1 className="sr-only">Ayush Kumar Joshi, software portfolio, 2026</h1>
        {ready && <Desk selected={selected} onSelect={setSelected} />}
        <Beam />
        <p className={`scroll-cue${scrolled ? " gone" : ""}`} aria-hidden="true">scroll down</p>
      </section>
      <div className="flow">
        <About />
        <Skills />
        <Projects onSelect={setSelected} />
        <Profiles />
        <Contact />
      </div>
      <Panel project={selected ? projects[selected] : null} onClose={close} />
    </main>
  )
}

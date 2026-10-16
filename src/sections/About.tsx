import { at } from "./util"
import { useReveal } from "../hooks/useReveal"


export default function About() {
  const root = useReveal<HTMLElement>()
  return (
    <section ref={root} className="section" id="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title reveal" style={at(-2, 0)}>About me</h2>

      <div className="about-grid">
        <div className="paper reveal" style={at(-0.8, 1)}>
          <p>
            I’m Ayush, a computer science student at Chandigarh University (B.E. CSE, class of 2028).
            I like building things that work from end to end: the model, the API behind it, and the screen you use it on.
          </p>
          <p>
            My foundation is C++ and data structures and algorithms. For projects I mostly work in Python with Flask and
            FastAPI on top of SQL databases, and I use React for the front end.
          </p>
        </div>

        <dl className="sticky reveal" style={at(2, 2)}>
          <dt>Studying</dt><dd>B.E. CSE, Chandigarh University, 2024 to 2028</dd>
          <dt>Practice</dt><dd>235+ problems solved on LeetCode</dd>
          <dt>Looking for</dt><dd>A software development internship</dd>
        </dl>
      </div>

    </section>
  )
}

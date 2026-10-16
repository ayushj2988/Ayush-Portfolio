import { useRef, useState, type FormEvent } from "react"
import { SITE } from "../config"
import { useReveal } from "../hooks/useReveal"
import { at } from "./util"

type Status = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  const root = useReveal<HTMLElement>()
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = form.current!
    const d = new FormData(f)
    if (d.get("company")) return // hidden field: only bots fill it in
    const name = String(d.get("name")).trim()
    const email = String(d.get("email")).trim()
    const message = String(d.get("message")).trim()

    // No form service connected yet: fall back to the visitor's own email app.
    if (!SITE.contactEndpoint) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`)
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`)
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus("sending")
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, ...(SITE.contactAccessKey ? { access_key: SITE.contactAccessKey } : {}) }),
      })
      if (!res.ok) throw new Error(String(res.status))
      f.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section ref={root} className="section contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title reveal" style={at(1.5, 0)}>Say hi</h2>

      <div className="about-grid">
        <form ref={form} className="paper form reveal" style={at(-0.6, 1)} onSubmit={onSubmit}>
          <label>Your name
            <input name="name" required autoComplete="name" maxLength={80} />
          </label>
          <label>Your email
            <input name="email" type="email" required autoComplete="email" maxLength={120} />
          </label>
          <label>Message
            <textarea name="message" required minLength={10} maxLength={2000} rows={5} />
          </label>
          {/* honeypot */}
          <input className="sr-only" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn btn-yellow send" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status === "sent" && "Sent. Thanks, I’ll get back to you soon."}
            {status === "error" && <>That didn’t go through. You can email me directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</>}
          </p>
        </form>

        <dl className="sticky reveal" style={at(2, 2)}>
          <dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
          {SITE.linkedin && <><dt>LinkedIn</dt><dd><a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">ayushjoshi09</a></dd></>}
          {SITE.github && <><dt>GitHub</dt><dd><a href={SITE.github} target="_blank" rel="noopener noreferrer">ayushj2988</a></dd></>}
        </dl>
      </div>
    </section>
  )
}

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SITE } from "../config"

type Status = "checking" | "ok" | "missing"

export default function Resume() {
  const url = `${import.meta.env.BASE_URL}${SITE.resumeFile}`
  const [status, setStatus] = useState<Status>("checking")

  useEffect(() => {
    let alive = true
    // Dev servers and SPA hosts answer 200 with index.html for missing files,
    // so check the content type, not just the status code.
    fetch(url, { method: "HEAD" })
      .then((r) => alive && setStatus(r.ok && (r.headers.get("content-type") ?? "").includes("pdf") ? "ok" : "missing"))
      .catch(() => alive && setStatus("missing"))
    return () => { alive = false }
  }, [url])

  const actions = (
    <>
      <a className="btn btn-yellow" href={url} target="_blank" rel="noopener noreferrer">Open in New Tab</a>
      <a className="btn btn-orange" href={url} download={SITE.resumeDownloadName}>Download PDF</a>
    </>
  )

  return (
    <main className="reader">
      <header className="reader-bar">
        <Link to="/" className="back">← Back to Portfolio</Link>
        <h1>My Resume</h1>
        {status === "ok" && <div className="actions">{actions}</div>}
      </header>

      <section className="reader-body" aria-live="polite">
        {status === "checking" && <p className="note">Loading resume…</p>}

        {status === "missing" && (
          <div className="note note-card" role="alert">
            <h2>Resume not found</h2>
            <p>Add your PDF at <code>public/resume.pdf</code> and reload this page.</p>
          </div>
        )}

        {status === "ok" && (
          <object className="pdf" data={`${url}#view=FitH`} type="application/pdf" aria-label="Resume PDF">
            <div className="note note-card">
              <h2>This device can’t show PDFs here</h2>
              <p>Open the file in a new tab or download it instead.</p>
              <div className="actions">{actions}</div>
            </div>
          </object>
        )}
      </section>
    </main>
  )
}

export type G = CanvasRenderingContext2D
/** Paints one desk object. Origin is the object's top-left; w and h are in pixels. */
export type Draw = (g: G, w: number, h: number, sweep: number) => void

const INK = "#1d1b2e"

function lift(g: G, fill: string, stroke = true) {
  g.save()
  g.shadowColor = "rgba(0,0,0,.34)"; g.shadowBlur = 16; g.shadowOffsetY = 8
  g.fillStyle = fill; g.fill()
  g.restore()
  if (stroke) { g.strokeStyle = INK; g.lineWidth = 3; g.lineJoin = "round"; g.stroke() }
}
function box(g: G, w: number, h: number, fill: string, r = 10) {
  g.beginPath(); g.roundRect(0, 0, w, h, r); lift(g, fill)
}
function torn(g: G, w: number, h: number) {
  let s = 7
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280
  const n = 40
  g.beginPath()
  for (let i = 0; i <= n; i++) g.lineTo((w * i) / n, (r() - 0.5) * h * 0.08)
  for (let i = 1; i < 7; i++) g.lineTo(w + (r() - 0.5) * h * 0.03, (h * i) / 7)
  for (let i = n; i >= 0; i--) g.lineTo((w * i) / n, h + (r() - 0.5) * h * 0.08)
  for (let i = 6; i > 0; i--) g.lineTo((r() - 0.5) * h * 0.03, (h * i) / 7)
  g.closePath()
}
function starPath(g: G, r: number, cx: number, cy: number) {
  g.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, q = i % 2 ? r * 0.5 : r
    g.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q)
  }
  g.closePath()
}
function txt(g: G, s: string, x: number, y: number, size: number, weight = 700, col = INK, al: CanvasTextAlign = "left") {
  g.font = `${weight} ${size}px Gaegu, cursive`
  g.fillStyle = col; g.textAlign = al; g.textBaseline = "alphabetic"
  g.fillText(s, x, y)
}
const dot = (g: G, x: number, y: number, r: number) => { g.arc(x, y, r, 0, 7) }

/* ---------- decor ---------- */
export const drawPencil: Draw = (g, w, h) => {
  g.beginPath(); g.rect(60, 0, w - 60, h); lift(g, "#2c50a8")
  g.beginPath(); g.moveTo(0, h / 2); g.lineTo(60, 0); g.lineTo(60, h); g.closePath(); lift(g, "#e8c9a0")
  g.beginPath(); g.moveTo(0, h / 2); g.lineTo(16, h * 0.35); g.lineTo(16, h * 0.65); g.closePath()
  g.fillStyle = INK; g.fill()
  g.fillStyle = "#c9ccd6"; g.fillRect(w - 70, 3, 26, h - 6)
}
export const drawStar: Draw = (g, w, h) => {
  starPath(g, w / 2, w / 2, h / 2 + h * 0.03); lift(g, "#f7d34a")
  g.fillStyle = INK; g.beginPath(); dot(g, w * 0.42, h * 0.5, w * 0.03); dot(g, w * 0.58, h * 0.5, w * 0.03); g.fill()
  g.lineWidth = 2.5; g.strokeStyle = INK; g.beginPath(); g.arc(w / 2, h * 0.55, w * 0.06, 0.2, Math.PI - 0.2); g.stroke()
}
export const drawName: Draw = (g, w, h) => {
  torn(g, w, h); lift(g, "#f7f2e4", false)
  txt(g, "Ayush Kumar Joshi", w / 2, h * 0.55, 92, 700, INK, "center")
  txt(g, "software portfolio, 2026", w / 2, h * 0.78, 40, 400, "#4a4760", "center")
}
export const labelDraw = (s: string, col: string): Draw => (g, w, h) => {
  g.beginPath(); g.rect(0, 0, w, h); lift(g, col)
  txt(g, s, w / 2, h * 0.72, 34, 700, INK, "center")
}

/* ---------- projects ---------- */
export const drawNova: Draw = (g, w, h) => {
  box(g, w, h, "#fbfaf5", 6)
  const px = 18, py = 18, pw = w - 36, ph = h - 100
  const gr = g.createLinearGradient(0, py, 0, py + ph)
  gr.addColorStop(0, "#0f1530"); gr.addColorStop(1, "#1d2a55")
  g.fillStyle = gr; g.fillRect(px, py, pw, ph)
  g.fillStyle = "#3a4366"; g.beginPath(); dot(g, w / 2, py + ph * 0.5, ph * 0.26); g.fill()
  g.fillStyle = "#0f1530"; g.beginPath(); dot(g, w / 2 - 22, py + ph * 0.46, 5); dot(g, w / 2 + 22, py + ph * 0.46, 5); g.fill()
  g.strokeStyle = "#3ddc84"; g.lineWidth = 3
  const bx = w / 2 - 62, by = py + ph * 0.5 - 72
  g.strokeRect(bx, by, 124, 140)
  g.fillStyle = "#3ddc84"; g.fillRect(bx, by - 20, 70, 20)
  txt(g, "face 0.94", bx + 4, by - 5, 17, 700, "#0f1530")
  txt(g, "NOVA-Face", w / 2, h - 26, 48, 700, INK, "center")
}
export const drawClimate: Draw = (g, w, h) => {
  box(g, w, h, "#fbe27a", 4)
  txt(g, "Climate", 18, 52, 44); txt(g, "analytics", 18, 92, 44)
  g.strokeStyle = INK; g.lineWidth = 3; g.beginPath()
  ;[[20, 210], [70, 180], [110, 190], [160, 140], [205, 120], [250, 70]].forEach(([a, b], i) => (i ? g.lineTo(a, b + 20) : g.moveTo(a, b + 20)))
  g.stroke()
  txt(g, "ask it anything", 18, h - 18, 28, 400, "#6b5a10")
}
export const drawSketch: Draw = (g, w, h) => {
  box(g, w, h, "#f3e6c4", 6)
  g.fillStyle = INK; for (let i = 0; i < 9; i++) { g.beginPath(); dot(g, 28 + i * 34, 10, 7); g.fill() }
  g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); dot(g, w / 2, 150, 70); g.stroke()
  g.lineWidth = 1.5
  for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(w / 2 - 60 + i * 6, 120 + i * 7); g.lineTo(w / 2 + 10 + i * 5, 95 + i * 8); g.stroke() }
  g.beginPath(); dot(g, w / 2 - 24, 140, 8); dot(g, w / 2 + 24, 140, 8); g.stroke()
  txt(g, "image → sketch", w / 2, h - 22, 44, 700, INK, "center")
  g.beginPath(); g.roundRect(14, h - 110, 70, 50, 10); lift(g, "#cfd2da")
}
export const drawRadar: Draw = (g, w, h, sweep) => {
  box(g, w, h, "#2b2a35", 18)
  const cx = w * 0.36, cy = h * 0.5, R = h * 0.36
  g.fillStyle = "#0e2a1c"; g.beginPath(); dot(g, cx, cy, R); g.fill()
  g.strokeStyle = "rgba(61,220,132,.55)"; g.lineWidth = 2
  ;[1, 0.66, 0.33].forEach((k) => { g.beginPath(); dot(g, cx, cy, R * k); g.stroke() })
  g.save(); g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, R, sweep - 0.5, sweep); g.closePath()
  g.fillStyle = "rgba(61,220,132,.5)"; g.fill(); g.restore()
  g.fillStyle = "#b8ffd6"
  ;[[0.4, -0.9], [0.62, 0.7], [0.25, 2.2]].forEach(([k, a]) => { g.beginPath(); dot(g, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, 5); g.fill() })
  g.fillStyle = "#ee8a3b"; g.beginPath(); g.roundRect(w * 0.7, h * 0.18, w * 0.22, h * 0.14, 8); g.fill()
  g.fillStyle = "#4a4a58"; ;[0, 1, 2].forEach((i) => { g.beginPath(); dot(g, w * 0.74 + i * w * 0.09, h * 0.5, 13); g.fill() })
  txt(g, "Radar", w * 0.8, h * 0.84, 36, 700, "#e8e6f0", "center")
}

/* ---------- links ---------- */
export const drawContact = (email: string): Draw => (g, w, h) => {
  box(g, w, h, "#fbfaf5", 12)
  g.fillStyle = "#2f8f55"; g.beginPath(); dot(g, 22, h / 2, 7); g.fill()
  txt(g, "say hi", 44, 54, 46); txt(g, email, 44, 96, 28, 400, "#4a4760")
}
export const stickerDraw = (label: string, glyph: string, color: string): Draw => (g, w, h) => {
  box(g, w, h, "#fbfaf5", 8)
  g.fillStyle = "#d94a4a"; g.beginPath(); dot(g, w / 2, 14, 8); g.fill()
  g.fillStyle = color; g.beginPath(); g.roundRect(w / 2 - 32, 32, 64, 64, 16); g.fill()
  txt(g, glyph, w / 2, 78, 38, 700, "#fff", "center")
  txt(g, label, w / 2, h - 14, 28, 700, INK, "center")
}

export const drawPlayne: Draw = (g, w, h) => {
  box(g, w, h, "#2b1f4a", 22)
  const gr = g.createLinearGradient(0, 14, w, h * 0.7)
  gr.addColorStop(0, "#6b3fd4"); gr.addColorStop(1, "#e0489b")
  g.beginPath(); g.roundRect(12, 14, w - 24, h - 96, 14); g.fillStyle = gr; g.fill()
  txt(g, "PlayneX", w / 2, 62, 36, 700, "#fff", "center")
  // little controller
  const cx = w / 2, cy = h * 0.38
  g.fillStyle = "rgba(255,255,255,.92)"; g.beginPath(); g.roundRect(cx - 38, cy - 18, 76, 36, 16); g.fill()
  g.fillStyle = "#2b1f4a"; g.fillRect(cx - 26, cy - 3, 14, 5); g.fillRect(cx - 21.5, cy - 8, 5, 15)
  g.beginPath(); dot(g, cx + 14, cy, 5); dot(g, cx + 26, cy - 5, 5); g.fill()
  // pass and like buttons
  const by = h - 44
  g.lineWidth = 3; g.strokeStyle = INK
  g.beginPath(); dot(g, w * 0.3, by, 22); g.fillStyle = "#fff"; g.fill(); g.stroke()
  g.strokeStyle = "#d94a4a"; g.lineWidth = 5; g.lineCap = "round"
  g.beginPath(); g.moveTo(w * 0.3 - 8, by - 8); g.lineTo(w * 0.3 + 8, by + 8); g.moveTo(w * 0.3 + 8, by - 8); g.lineTo(w * 0.3 - 8, by + 8); g.stroke()
  g.strokeStyle = INK; g.lineWidth = 3
  g.beginPath(); dot(g, w * 0.7, by, 22); g.fillStyle = "#fff"; g.fill(); g.stroke()
  const hx = w * 0.7, hy = by - 2, k = 9
  g.beginPath(); g.moveTo(hx, hy + k); g.bezierCurveTo(hx - k * 1.8, hy - k * 0.2, hx - k * 0.7, hy - k * 1.5, hx, hy - k * 0.5)
  g.bezierCurveTo(hx + k * 0.7, hy - k * 1.5, hx + k * 1.8, hy - k * 0.2, hx, hy + k); g.closePath()
  g.fillStyle = "#2f8f55"; g.fill()
}

export const drawNoteTube: Draw = (g, w, h) => {
  box(g, w, h, "#fbfaf5", 8)
  g.beginPath(); g.roundRect(14, 14, w - 28, 82, 10); g.fillStyle = "#e24b4b"; g.fill()
  g.strokeStyle = INK; g.lineWidth = 3; g.stroke()
  g.beginPath(); g.moveTo(w / 2 - 12, 39); g.lineTo(w / 2 + 16, 55); g.lineTo(w / 2 - 12, 71); g.closePath()
  g.fillStyle = "#fff"; g.fill()
  g.strokeStyle = INK; g.lineWidth = 3; g.lineCap = "round"
  for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(18, 120 + i * 17); g.lineTo(w - 18 - (i === 2 ? 56 : 0), 120 + i * 17); g.stroke() }
  txt(g, "NoteTube", w / 2, h - 12, 34, 700, INK, "center")
}

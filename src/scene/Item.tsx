import { useEffect, useMemo, useRef } from "react"
import { useFrame, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import type { Draw } from "./draw"
import { ptr, reduceMotion, scroll } from "./pointer"

const S = 100 // canvas pixels per scene unit
const PAD = 24 // room around the object for its shadow

export type ItemProps = {
  w: number; h: number; draw: Draw
  x: number; y: number; rot?: number
  /** How far this object drifts with the pointer. Higher = closer to the viewer. */
  depth: number
  index: number
  animated?: boolean
  active?: boolean
  onSelect?: () => void
}

export default function Item({ w, h, draw, x, y, rot = 0, depth, index, animated, active, onSelect }: ItemProps) {
  const mesh = useRef<THREE.Mesh>(null!)
  const hover = useRef(false)
  const sweep = useRef(0)

  const art = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = w * S + PAD * 2; c.height = h * S + PAD * 2
    const g = c.getContext("2d")!
    const paint = () => {
      g.clearRect(0, 0, c.width, c.height)
      g.save(); g.translate(PAD, PAD); draw(g, w * S, h * S, sweep.current); g.restore()
    }
    paint()
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return { paint, tex, aw: c.width / S, ah: c.height / S }
  }, [w, h, draw])

  useEffect(() => () => art.tex.dispose(), [art])

  const delay = index * 0.07

  useFrame((state, dt) => {
    const m = mesh.current
    const live = reduceMotion || state.clock.elapsedTime > delay
    const hv = hover.current || !!active
    const k = reduceMotion ? 0 : 1
    const tx = x + ptr.x * depth * 0.35 * k
    const ty = live ? y + ptr.y * depth * 0.35 * k + (hv ? 0.18 : 0) + scroll.p * (1.2 + depth * 1.5) * k : y + 9
    m.position.x = THREE.MathUtils.damp(m.position.x, tx, 8, dt)
    m.position.y = THREE.MathUtils.damp(m.position.y, ty, live ? 8 : 6, dt)
    m.rotation.z = THREE.MathUtils.damp(m.rotation.z, hv ? rot * 0.35 : rot, 8, dt)
    const s = THREE.MathUtils.damp(m.scale.x, hv ? 1.07 : 1, 10, dt)
    m.scale.set(s, s, 1)
    if (animated && !reduceMotion) {
      sweep.current += dt * (hv ? 4.5 : 1.2)
      art.paint(); art.tex.needsUpdate = true
    }
  })

  const interactive = !!onSelect
  const handlers = interactive
    ? {
        onPointerOver: (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); hover.current = true; document.body.style.cursor = "pointer" },
        onPointerOut: () => { hover.current = false; document.body.style.cursor = "" },
        onClick: (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect() },
      }
    : {}

  return (
    <mesh ref={mesh} position={[x, reduceMotion ? y : y + 9, index * 0.01]} rotation={[0, 0, rot]} renderOrder={index} {...handlers}>
      <planeGeometry args={[art.aw, art.ah]} />
      <meshBasicMaterial map={art.tex} transparent depthTest={false} />
    </mesh>
  )
}

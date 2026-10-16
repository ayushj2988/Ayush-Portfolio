import { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useNavigate } from "react-router-dom"
import type { ProjectId } from "../data/projects"
import Item from "./Item"
import { items, type Action } from "./items"
import { ptr, scroll } from "./pointer"

/** Fits the whole desk, with a little margin, on screen, smooths the pointer, and slides the view aside when a panel is open. */
function Rig({ shift }: { shift: boolean }) {
  const { camera, size } = useThree()
  const lastPan = useRef(0)
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera
    cam.zoom = Math.min(size.width / 17, size.height / 12)
    cam.updateProjectionMatrix()
    // The mat grid is CSS, so tell it how big half a scene unit is on screen.
    document.documentElement.style.setProperty("--cell", `${cam.zoom * 0.5}px`)
  }, [camera, size])
  useFrame((state, dt) => {
    ptr.x = THREE.MathUtils.damp(ptr.x, state.pointer.x, 4, dt)
    ptr.y = THREE.MathUtils.damp(ptr.y, state.pointer.y, 4, dt)
    scroll.p = THREE.MathUtils.damp(scroll.p, THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1), 6, dt)
    const target = shift && size.width > 800 ? 2.2 : 0
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target, 4, dt)
    // Slide the CSS mat along with the camera so the grid and the objects move together.
    const pan = -camera.position.x * (camera as THREE.OrthographicCamera).zoom
    if (Math.abs(pan - lastPan.current) > 0.2) {
      lastPan.current = pan
      document.documentElement.style.setProperty("--pan", `${pan.toFixed(1)}px`)
    }
  })
  return null
}

type Props = { selected: ProjectId | null; onSelect: (id: ProjectId | null) => void }

export default function Desk({ selected, onSelect }: Props) {
  const navigate = useNavigate()

  const run = (a: Action) => {
    if (a.type === "project") onSelect(a.id)
    else if (a.type === "route") navigate(a.to)
    else if (a.type === "mail") window.location.href = `mailto:${a.address}`
    else window.open(a.url, "_blank", "noopener,noreferrer")
  }

  return (
    <Canvas flat orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], near: 0.1, far: 50 }} onPointerMissed={() => onSelect(null)}>
      <Rig shift={selected !== null} />
      {items.map((it, i) => (
        <Item
          key={it.key} index={i}
          w={it.w} h={it.h} draw={it.draw} x={it.x} y={it.y} rot={it.rot} depth={it.depth}
          animated={it.animated}
          active={it.action?.type === "project" && it.action.id === selected}
          onSelect={it.action ? () => run(it.action!) : undefined}
        />
      ))}
    </Canvas>
  )
}

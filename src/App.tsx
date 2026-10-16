import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Resume from "./pages/Resume"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

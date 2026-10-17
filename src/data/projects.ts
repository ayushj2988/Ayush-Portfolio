import { SITE } from "../config"

export type ProjectId = "notetube" | "playnex" | "nova" | "climate" | "sketch" | "radar"

export type Project = {
  id: ProjectId
  title: string
  meta: string
  lead: string
  points: string[]
  stack: string[]
  status?: string
  live: string
  github: string
}

export const projects: Record<ProjectId, Project> = {
  notetube: {
    id: "notetube", title: "NoteTube", meta: "Side project, in progress", status: "building now",
    lead: "Turn a YouTube lecture into notes you can actually study from.",
    points: [
      "Takes a YouTube lecture and turns it into study notes, flashcards and quizzes.",
      "Built with React, TypeScript and Vite.",
      "A procedural 3D background (react-three-fiber and drei) sits behind a liquid-glass interface.",
      "Currently redesigning the whole interface.",
    ],
    stack: ["React", "TypeScript", "Vite", "react-three-fiber", "drei"],
    live: SITE.projects.notetube.live, github: SITE.projects.notetube.github,
  },
  playnex: {
    id: "playnex", title: "PlayneX", meta: "Side project, in progress", status: "building now",
    lead: "Swipe through games like you swipe through profiles.",
    points: [
      "A game-discovery app that works like Tinder for games: swipe right on the ones you like, left on the ones you don't.",
      "Your likes and dislikes decide which games it recommends next.",
      "Built with React and Vite, with framer-motion handling the swipe gestures.",
      "Moving the Discover screen to react-three-fiber for smoother swiping.",
    ],
    stack: ["React", "Vite", "framer-motion", "react-three-fiber"],
    live: SITE.projects.playnex.live, github: SITE.projects.playnex.github,
  },
  nova: {
    id: "nova", title: "NOVA-Face", meta: "Research project, Jun 2026",
    lead: "Face detection that still works after dark.",
    points: [
      "Low-light face detection pipeline built on YOLOv8 and served through FastAPI.",
      "Closes the gap between models trained on daylight images and real nighttime footage.",
      "Two-person team: I owned the backend, the API and the front-end integration, from the SQL dataset pipeline to a testable model.",
      "Also wrote the documentation and literature review.",
    ],
    stack: ["Python", "YOLOv8", "FastAPI", "SQL"], live: SITE.projects.nova.live, github: SITE.projects.nova.github,
  },
  climate: {
    id: "climate", title: "Climate Analytics", meta: "B.E. project, Chandigarh University, 2026",
    lead: "Ask the data a question in plain English.",
    points: [
      "Full-stack platform: React front end, Flask backend.",
      "Random Forest model predicts climate trends; a Groq-hosted LLaMA model answers natural-language questions about the results.",
      "Caught and fixed an exposed API key and bad environment-variable handling in a pre-submission review.",
      "Prepared the viva deep-dive and wrote the final report.",
    ],
    stack: ["React", "Flask", "Random Forest", "LLaMA"], live: SITE.projects.climate.live, github: SITE.projects.climate.github,
  },
  sketch: {
    id: "sketch", title: "Image to Sketch", meta: "Live web app, Dec 2025",
    lead: "Drop in a photo, get a pencil drawing.",
    points: [
      "Full-stack app that turns images into pencil-style sketches.",
      "OpenCV handles the image processing; a Flask API serves it.",
      "I built the processing logic, the error handling and the API design.",
    ],
    stack: ["OpenCV", "Flask", "Python"], live: SITE.projects.sketch.live, github: SITE.projects.sketch.github,
  },
  radar: {
    id: "radar", title: "IoT Radar", meta: "Hardware project, Jan to Apr 2025",
    lead: "A real-time radar from an ultrasonic sensor.",
    points: [
      "HC-SR04 ultrasonic sensor on an Arduino Uno, drawing live distance and direction in Processing IDE.",
      "Debugged sensor noise and timing issues until the data stream was stable.",
    ],
    stack: ["Arduino Uno", "HC-SR04", "Processing"], live: SITE.projects.radar.live, github: SITE.projects.radar.github,
  },
}

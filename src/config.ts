/**
 * One place for every link on the site.
 * Social links come from your resume. Project buttons stay greyed out
 * until you paste a url into live or github.
 */
export const SITE = {
  name: "Ayush Kumar Joshi",
  email: "ayush2988j@gmail.com",
  github: "https://github.com/ayushj2988",
  linkedin: "https://www.linkedin.com/in/ayushjoshi09/",
  leetcode: "https://leetcode.com/u/ayushjoshi09_/",
  resumeRoute: "/resume",
  resumeFile: "resume.pdf",
  /**
   * Contact form delivery. Browsers can't send email on their own, so the form posts to a
   * form service. Paste its endpoint here (Formspree: https://formspree.io/f/xxxx).
   * For Web3Forms use https://api.web3forms.com/submit and put your key in contactAccessKey.
   * While contactEndpoint is empty, the form opens the visitor's email app instead.
   */
  contactEndpoint: "" as string,
  contactAccessKey: "" as string,
  resumeDownloadName: "Ayush_Kumar_Joshi_Resume.pdf",
  projects: {
    notetube: { live: "", github: "" }, // NoteTube
    playnex: { live: "", github: "" }, // PlayneX
    nova:    { live: "", github: "" }, // NOVA-Face
    climate: { live: "", github: "" }, // Climate Analytics
    sketch:  { live: "", github: "" }, // Image to Sketch
    radar:   { live: "", github: "" }, // IoT Radar
  },
} as const

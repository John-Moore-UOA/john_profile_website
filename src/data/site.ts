export const site = {
  name: 'John Moore',
  role: 'Master of Engineering candidate, Bioengineering',
  lab: { name: 'Empathic Computing Lab', url: 'https://empathiccomputing.org/' },
  uni: 'University of Auckland',
  location: 'Auckland, New Zealand',
  lede: 'I build empathic, context-aware, intelligent AI systems that interact with people and sense how they feel, using physiological sensors and machine learning.',
  abi: { name: 'Auckland Bioengineering Institute', url: 'https://www.auckland.ac.nz/en/abi.html' },
  masters: {
    when: 'March 2026 – February 2027',
    length: 'One-year Master of Engineering',
    title: 'A Therapist-in-the-Loop VR System for Cognitive Rehabilitation with an Embodied AI Coach',
    // The two halves of the project as shown on the home page. Each links to its own project page.
    parts: [
      {
        project: 'masters-empathic-avatar',
        name: 'Empathic Virtual Character',
        line: 'The coach inside the headset',
        blurb: 'An AI-driven embodied character that coaches a patient through cooking tasks in a VR kitchen, with EEG and GSR sensing.',
      },
      {
        project: 'realtime-study-dashboard',
        name: 'Therapist Console',
        line: 'Eyes and hands on the session, live',
        blurb: "Live physiological streams, a mirror of the patient's VR view, and manual controls for the room and the AI assistant, so the therapist can watch a session and step in.",
        image: '/images/dashboard/console-controls.png',
        alt: 'Console panels: manual controls for the room and the AI assistant, a session report dialog, and step-by-step task progress.',
      },
    ] as { project: string; name: string; line: string; blurb: string; image?: string; alt?: string }[],
  },
  email: '', // TODO: add public email
  links: {
    github: 'https://github.com/John-Moore-UOA',
    linkedin: 'https://linkedin.com/in/johnmoore03',
    orcid: 'https://orcid.org/0009-0001-6046-8794',
  },
};

export const experience = [
  { org: 'University of Auckland', title: 'Graduate Teaching Assistant', when: 'Jul 2026 – now', note: 'Run labs and supervise undergraduate teaching assistants.' },
  { org: 'University of Auckland', title: 'Teaching Assistant', when: 'Feb 2024 – Jul 2026', note: 'SOFTENG 281 (Java & OOP), SOFTENG 283 (testing & QA), tutoring across SOFTENG 206–284 and COMPSYS 201; CS210, CS225, CS111.' },
  { org: 'Tauranga City Council', title: 'Data Engineer', when: 'Nov 2024 – Feb 2025', note: 'Built a Stats NZ → Power BI pipeline on Microsoft Fabric with a GIS map of Tauranga by SA1/SA2/SA3/Ward, plus adoption guidelines for the BI team.' },
  { org: 'Tait Communications', title: 'Software Engineer', when: 'Nov 2023 – Feb 2024', note: 'Wrote C++ for a radio communication protocol and built a portal for viewing device statistics.' },
  { org: 'WDCC', title: 'Technical Lead', when: 'Feb – Nov 2024', note: 'Led a ten-person team building an event sign-up and attendance platform for the UoA Volunteers Club.', url: '/projects/volunteers-club/' },
  { org: 'WDCC', title: 'Website Developer', when: 'Feb – Nov 2023', note: 'Built features for the Virtual Patient Simulator, a diagnosis-practice tool for the Faculty of Medical and Health Sciences.', url: '/projects/vps/' },
];

export const education = [
  { title: 'Master of Engineering — Bioengineering', org: 'University of Auckland', when: '2026 – 2027', note: 'AI, machine learning, mixed reality, requirements engineering.' },
  { title: 'BE(Hons) First Class — Software Engineering', org: 'University of Auckland', when: '2022 – 2025', note: '' },
];

export const skills = [
  { group: 'Research & HCI', items: ['Human-computer interaction', 'User-centred design', 'User study design', 'Usability testing', 'Requirements engineering', 'Stakeholder interviews', 'Physiological computing', 'Affective computing', 'Mixed-methods analysis'] },
  { group: 'XR & Graphics', items: ['Unity', 'C#', 'Meta Quest / OpenXR', 'XR Interaction Toolkit', 'Netcode for GameObjects', 'Character Creator avatars', 'Real-time lip sync & facial animation', 'Three.js / WebGL'] },
  { group: 'AI & Data', items: ['PyTorch', 'Machine learning', 'LLM agents', 'Prompt engineering', 'Speech-to-text & text-to-speech', 'Computer vision', 'EEG & GSR signal processing', 'Lab Streaming Layer (LSL)', 'Power BI'] },
  { group: 'Software', items: ['Python', 'TypeScript', 'React', 'Node.js', 'C++', 'REST & WebSocket APIs', 'LiveKit / WebRTC', 'MCP servers', 'Firebase', 'Azure', 'Google Cloud Run', 'Docker', 'CI/CD', 'Agile delivery'] },
];

export const publications = [
  {
    title: 'Understanding Changes of Emotion and Cognitive Effort in VR',
    venue: 'IEEE Transactions on Visualization and Computer Graphics',
    year: 2026,
    type: 'Journal article',
    authors: 'Riku Otono, John Moore, Jingruo Chen, Zane Karai, Kunal Gupta, Peta Murphy, Jo Nunnerley, Mark Billinghurst',
    url: 'https://doi.org/10.1109/TVCG.2026.3747477',
    doi: '10.1109/TVCG.2026.3747477',
  },
  {
    title: 'Using an Empathic Virtual Agent to Regulate Cognitive Load in a Virtual Reality Simulation of Daily Living',
    venue: "VRST '26: ACM Symposium on Virtual Reality Software and Technology",
    year: 2026,
    type: 'Conference paper',
    authors: 'Riku Otono, Emmeline Montané, Jingruo Chen, John Moore, Zane Zarathushtra Karai, Om Patel, Puthikun Kim, Shaojun Li, Chris Valenzuela, Kunal Gupta et al.',
    url: 'https://doi.org/10.1145/3822517.3849907',
    doi: '10.1145/3822517.3849907',
  },
];

export const certifications = [
  { title: 'Deep Learning and PyTorch', org: 'NVIDIA', when: 'May 2026' },
  { title: 'Student Representative', org: 'University of Auckland', when: '2025' },
  { title: 'Committee Member', org: 'Auckland University Tramping Club', when: '2026' },
];

// People outside software I have designed with and for. Each links to its project page.
export const clients = [
  {
    who: 'Rehabilitation therapists',
    title: 'Masters research',
    points: ['Requirements drawn from therapy practice', 'Their language, built into the agent', 'Iterated with clinical feedback'],
    project: 'masters-empathic-avatar',
  },
  {
    who: 'Medical & Health Sciences faculty',
    title: 'Virtual Patient Simulator',
    points: ['Built around how educators teach', 'Authoring tools for non-developers', 'Trialled with pharmacy students'],
    project: 'vps',
  },
  {
    who: 'Volunteers Club executives',
    title: 'Event management system',
    points: ['Co-designed with weekly check-ins', 'Mapped their real event process', 'Replaced spreadsheets with one tool'],
    project: 'volunteers-club',
  },
];

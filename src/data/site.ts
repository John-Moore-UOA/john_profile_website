export const site = {
  name: 'John Moore',
  role: 'Master of Engineering candidate, Bioengineering',
  lab: { name: 'Empathic Computing Lab', url: 'https://empathiccomputing.org/' },
  uni: 'University of Auckland',
  location: 'Auckland, New Zealand',
  lede: 'I build empathic, intelligent AI systems that interact with people and sense how they feel, using physiological sensors and machine learning.',
  abi: { name: 'Auckland Bioengineering Institute', url: 'https://www.auckland.ac.nz/en/abi.html' },
  masters: { when: 'March 2026 – February 2027', length: 'One-year Master of Engineering' },
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
  { org: 'WDCC', title: 'Technical Lead', when: 'Feb – Nov 2024', note: 'Led a ten-person team building a full-stack platform for the UoA Volunteers Club.', url: 'https://wdcc.co.nz/projects/volunteers/2024' },
  { org: 'WDCC', title: 'Website Developer', when: 'Feb – Nov 2023', note: 'Virtual patient simulator for the Faculty of Health.', url: 'https://wdcc.co.nz/projects/vps/2025' },
];

export const education = [
  { title: 'Master of Engineering — Bioengineering', org: 'University of Auckland', when: '2026 – 2027', note: 'AI, machine learning, mixed reality, requirements engineering.' },
  { title: 'BE(Hons) First Class — Software Engineering', org: 'University of Auckland', when: '2022 – 2025', note: '' },
];

export const skills = [
  { group: 'Research & HCI', items: ['Human-computer interaction', 'User study design', 'Requirements engineering', 'Physiological computing', 'Affective computing'] },
  { group: 'XR & Graphics', items: ['Unity', 'C#', 'Meta Quest / OpenXR', 'Netcode for GameObjects', 'Character Creator avatars', 'Three.js'] },
  { group: 'AI & Data', items: ['PyTorch', 'LLM agents', 'Text-to-speech', 'Lab Streaming Layer (LSL)', 'EEG', 'Power BI'] },
  { group: 'Software', items: ['Python', 'TypeScript', 'React', 'C++', 'LiveKit / WebRTC', 'MCP servers', 'Azure', 'Docker'] },
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
  // TODO (John): add the second publication (title, venue, year, link).
];

export const certifications = [
  { title: 'Deep Learning and PyTorch', org: 'NVIDIA', when: 'May 2026' },
  { title: 'Student Representative', org: 'University of Auckland', when: '2025' },
  { title: 'Committee Member', org: 'Auckland University Tramping Club', when: '2026' },
];

export const SCREEN_BACKGROUND_URL =
  'https://lh3.googleusercontent.com/aida/AP1WRLuFgqIMOxTO1OVoigN5QqNGr1Exhr-tz_37818Gru9SzWNr0iTlKzh-PADc_UTZjzzFiPDk8TirU6L-Ku_A3-IOuvHEN3Ip0PnfhbLehUQVZAtXp-QFhzA_V6ni7SsVlonFHfmRNxSsprLhj1oi-r3QjfGhj-IdLa00-tLB95PgGdXHFTO074sCI-yd6jrLERarp8EK25jL7hZTADCLE7g7-mZjAmBajVMroJJTpY_zLwciwhD8Ks3gySc';

export const PERSONAL_INFO = {
  fullName: 'Farhan Triputra Ramadhan, S.Kom',
  shortName: 'Farhan Triputra',
  title: 'Software Engineer & Full-Stack / Mobile Developer',
  degree: 'Bachelor of Computer Science (S.Kom) — BINUS University (GPA: 3.45 / 4.00)',
  email: 'farhantriputra31@gmail.com',
  phone: '+6282233878422',
  location: 'Malang, East Java, Indonesia',
  github: 'https://github.com/FarhanTZ',
  githubUsername: 'FarhanTZ',
  linkedin: 'https://linkedin.com/in/farhan-triputra-ramadhan-a70b67332',
  bio: 'Software Engineer with a Computer Science background specializing in mobile development (Flutter) and backend architecture (Laravel, Go, Python). Experienced in architecting multi-role Event Booking Systems, CPG visitor tracking platforms, Clean Architecture with Cubit state management, and high-performance RESTful APIs.',
};

export const PROJECTS_DATA = [
  {
    id: 'mcc-event-booking',
    title: 'Event Booking System (MCC)',
    description: 'Multi-role venue reservation system separating workflows across Marketing, Front Office, Media Production, Duty Officer, & Super Admin.',
    fullDetails:
      'Architected an integrated multi-role venue reservation system for Malang Creative Center. Features Multi-Booking capabilities, automated room verification workflows, QR Code check-in/out integration, and 360° virtual room inspection tours.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCj7Rt9Q7WkqVUfZt6dlZ-aozKFxH9l-Ie05UAUMq2QWCPVHcejnrw0Qy1UxkPQ84fqFqK_bw_QQF_lrffYLjzeG9H65FNNVQQhmv7RyjMlmnUkhutVuqub8EwT7syw1VGVPmPWZmMuMplVhb6mJFCRZbaZdcyzHNjnJXs4_O9i20CbVlzIOodF3LF9SrE51ks648BwR2La7EOOucaZLoh0jMfWk2LC8pK4kj-ZyL88r7JFw6iv4OD4',
    tags: ['Laravel', 'Go', 'MySQL', 'QR Code', '360° VR Tour'],
    featured: true,
    stats: {
      stars: 142,
      commits: 380,
      complexity: 'HIGH',
    },
    role: 'Full-Stack / Software Engineer',
  },
  {
    id: 'cpg-visitor-counter',
    title: 'CPG Visitor Counter & Analytics',
    description: 'Real-time visitor counting system using AI computer vision (YOLOv8s) & digital form customization dashboard.',
    fullDetails:
      'Engineered an integrated visitor counting system utilizing AI computer vision (YOLOv8s) via surveillance streams and custom Front Office digital forms. Developed a real-time data visualization dashboard for cross-divisional monitoring to streamline operational analytics.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPWhmUXDdjki6_is_hIHe89F7Berp_Rfc991dZ29x7FjOXoxbO8edqsBV8PGLrFl6nnVUrX-_d_VObFfQZtxWyJq4p5X8zEFCuKcAq2onkPNPMdEaMrADCZ_BaVvgffGUMk7zZibFMrm2GjzaHMLRUETco2Q3Wf-Asikt-EmuESxON7Ab_whlugbLbPd_8tqz9redtozPtT-o4hYwOces_L7hhbjbhOMXLxpEMRjbiLodNcygxR41X',
    tags: ['Python', 'YOLOv8s AI', 'Dashboard', 'REST API'],
    featured: true,
    stats: {
      stars: 210,
      commits: 415,
      complexity: 'EXTREME',
    },
    role: 'Software Engineer / Full-Stack',
  },
  {
    id: 'glupulse-mobile',
    title: 'Glupulse — Health Monitoring App',
    description: 'Health monitoring mobile application built with Flutter using Clean Architecture & Cubit state management.',
    fullDetails:
      'Led the mobile engineering team in constructing a health monitoring application in Flutter. Implemented Clean Architecture with Cubit state management for real-time data streaming, ensuring an optimized and highly responsive user experience.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    tags: ['Flutter (Dart)', 'Clean Architecture', 'Cubit', 'REST API'],
    featured: true,
    stats: {
      stars: 185,
      commits: 290,
      complexity: 'HIGH',
    },
    role: 'Lead & Front-End Developer',
  },
  {
    id: 'chiptune-synth-32',
    title: 'Chiptune_Synth_32',
    description: 'Browser-based 8-bit FM synthesizer & tracker with retro GameBoy audio channels.',
    fullDetails:
      'A Web Audio API synthesizer capable of emulating GameBoy DMG sound chips (Pulse 1, Pulse 2, Custom Wave, and Noise). Allows exporting tracks as MIDI and WAV files.',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    tags: ['Web Audio API', 'React', 'Audio Engine'],
    featured: false,
    stats: {
      stars: 94,
      commits: 180,
      complexity: 'MEDIUM',
    },
    role: 'Software Engineer',
  },
];

export const SKILLS_DATA = [
  {
    category: 'MOBILE & FRONTEND',
    skills: [
      { name: 'Flutter (Dart)', level: 95, icon: 'smartphone', description: 'Expert in cross-platform mobile apps, Clean Architecture & Cubit state management.' },
      { name: 'React 19 & JavaScript', level: 92, icon: 'code', description: 'Modern reactive component architecture, custom hooks, and state engines.' },
      { name: 'Tailwind CSS v4', level: 94, icon: 'palette', description: 'Design systems, modern utility patterns, and responsive UI tokens.' },
      { name: 'Clean Architecture & Cubit', level: 95, icon: 'account_tree', description: 'Decoupled domain layers, robust data mappers, and reactive state.' },
    ],
  },
  {
    category: 'BACKEND & DATABASE',
    skills: [
      { name: 'Laravel (PHP)', level: 94, icon: 'dns', description: 'Multi-role authentication, Eloquent ORM, RESTful APIs, and QR Code integrations.' },
      { name: 'Go (Golang)', level: 90, icon: 'speed', description: 'High-performance microservices, REST APIs, and concurrent routines.' },
      { name: 'Python & AI (YOLOv8s)', level: 88, icon: 'psychology', description: 'Computer vision, automated object detection, and data stream processing.' },
      { name: 'MySQL & PostgreSQL', level: 92, icon: 'database', description: 'Relational database schema optimization, indexing, and complex queries.' },
    ],
  },
  {
    category: 'TOOLS & CERTIFICATIONS',
    skills: [
      { name: 'Git & Postman', level: 96, icon: 'terminal', description: 'Version control, collaborative workflows, and REST API documentation.' },
      { name: 'IT Asset & Systems Audit', level: 90, icon: 'build', description: 'Technical operational support, building IT infrastructure, & asset auditing.' },
      { name: 'Bilingual Communication', level: 92, icon: 'translate', description: 'Native Indonesian & Professional English (Brilliant English Course certified).' },
    ],
  },
];

export const WORK_EXPERIENCE = [
  {
    role: 'Software Engineer (IT Support Division)',
    company: 'Malang Creative Center (MCC)',
    period: 'Feb 2025 – Feb 2026',
    location: 'Malang, Indonesia',
    points: [
      'Developed an integrated multi-role Event Booking System with Multi-Booking, QR Code Check-in/out, and 360° VR exploration.',
      'Built a CPG visitor tracking ecosystem featuring digital form customization and real-time analytical dashboards.',
      'Designed and deployed scalable RESTful APIs (Laravel/Go) and optimized database schemas.',
      'Executed daily IT asset auditing, inventory tracking, and technical operational support across building infrastructure.',
    ],
  },
  {
    role: 'Customer Service Officer',
    company: 'Brilliant English Course',
    period: 'Jun 2026 (1 Month)',
    location: 'Kediri, Indonesia',
    points: [
      'Provided bilingual course consultations (Indonesian & English) to prospective students responsive and professionally.',
      'Managed student registrations, class scheduling, and resolved technical and operational inquiries daily.',
    ],
  },
];

export const EDUCATION = {
  institution: 'BINUS University',
  degree: 'Bachelor of Computer Science (S.Kom)',
  major: 'Computer Science',
  gpa: '3.45 / 4.00',
  graduation: 'Graduated: May 2026',
  thesis: 'Artificial Intelligence-Based Health Application for Food and Activity Recommendations for Diabetes Patients',
};

export const CERTIFICATIONS = [
  'Introduction to JavaScript Certificate — Great Learning Academy (March 2024)',
  'Creative Builder Certificate — RRQ x Minetourn Bedwars Tournament Season 4',
  'Pre-Basic Course Certificate — Brilliant English Course',
  'Basic Course Certificate — Brilliant English Course',
  'Speak First Class Certificate — The Daffodils',
  'Listen and Talk Class Certificate — The Daffodils',
  'Step One Class Certificate — The Daffodils',
  'Pronunciation Class Certificate — The Daffodils',
];

export const PLAYER_STATS_DATA = {
  name: 'Farhan Triputra Ramadhan, S.Kom',
  title: 'SR_SOFTWARE_ENGINEER',
  level: 25,
  exp: 9450,
  maxExp: 10000,
  hp: 100,
  maxHp: 100,
  mp: 120,
  maxMp: 120,
  stats: {
    str: 94, // Coding Strength (Flutter, Laravel, Go)
    int: 96, // AI & CS Intelligence (BINUS S.Kom, YOLOv8)
    agi: 92, // Build Speed & Architecture (Clean Arch, Cubit)
    vit: 95, // Debug Stamina & IT Support
  },
  inventory: [
    { name: 'Flutter & VS Code +10', type: 'Weapon', effect: '+25 Mobile & Fullstack Speed', icon: 'smartphone' },
    { name: 'BINUS S.Kom Degree', type: 'Artifact', effect: '+30 Computer Science Knowledge', icon: 'school' },
    { name: 'YOLOv8 Vision Core', type: 'Artifact', effect: '+20 AI Computer Vision', icon: 'visibility' },
    { name: 'Dark Roast Elixir', type: 'Consumable', effect: 'Restores +50 MP Energy', icon: 'local_cafe' },
  ],
};

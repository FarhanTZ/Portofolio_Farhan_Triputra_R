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
    image: '/Project/Thumbnail Event Booking.png',
    secondaryImage: '/Project/Event Booking Pengelolah.png',
    tags: ['Laravel', 'MySQL', 'QR Code', '360° VR Tour'],
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
    image: '/Project/Visitor Count.png',
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
    description: 'Health monitoring mobile application built with Flutter & Go (Golang) backend using Clean Architecture & Cubit state management.',
    fullDetails:
      'Led the engineering team in constructing a health monitoring application with Flutter frontend and high-performance Go (Golang) REST API backend. Implemented Clean Architecture with Cubit state management for real-time data streaming, ensuring an optimized and highly responsive user experience.',
    image: '/Project/Glupulse.png',
    tags: ['Flutter (Dart)', 'Go (Golang)', 'Clean Architecture', 'Cubit', 'REST API'],
    featured: true,
    stats: {
      stars: 185,
      commits: 290,
      complexity: 'HIGH',
    },
    role: 'Lead & Full-Stack Developer',
  },
  {
    id: 'it-inventaris-mcc',
    title: 'IT Asset & Inventory Management (MCC)',
    description: 'Sistem pencatatan, pemantauan, dan manajemen inventaris aset IT & infrastruktur gedung di Malang Creative Center berbasis Flutter & Firebase.',
    fullDetails:
      'Sistem pengelolaan inventaris aset IT terpadu berbasis Flutter dan Firebase yang dirancang untuk pelacakan, penelusuran status kondisi perangkat (komputer, jaringan, multimedia), serta otomatisasi alur kerja audit berkala seluruh infrastruktur teknologi gedung Malang Creative Center.',
    image: '/Project/Thumbnail IT Inventaris.png',
    docUrl: '/Project/Tata Cara penggunaan  Aplikas MCC Inventori (2).pdf',
    tags: ['Flutter (Dart)', 'Firebase', 'Cloud Firestore', 'IT Asset Management'],
    featured: true,
    stats: {
      stars: 168,
      commits: 325,
      complexity: 'HIGH',
    },
    role: 'Flutter / Firebase Engineer',
  },
  {
    id: 'gameboy-portfolio',
    title: 'Retro GameBoy Interactive Portfolio',
    description: 'Retro GameBoy-style interactive portfolio web app featuring pixel audio engine, custom screens, mini-games, and RPG player stats.',
    fullDetails:
      'Interactive personal portfolio website designed with classic GameBoy retro handheld console aesthetics. Built with React 19, Tailwind CSS, Web Audio API sound effects synthesizer, RPG character stats system, and interactive project database.',
    image: '/Project/Portofolio_project.png',
    tags: ['React 19', 'Tailwind CSS', 'Web Audio API', 'Retro UI'],
    featured: true,
    stats: {
      stars: 250,
      commits: 450,
      complexity: 'HIGH',
    },
    role: 'Creator & Software Engineer',
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
      { name: 'Firebase & Firestore', level: 92, icon: 'local_fire_department', description: 'Real-time NoSQL database, Cloud Firestore, authentication, and cloud storage.' },
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

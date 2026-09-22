export const JHARKHAND_DISTRICTS = [
  "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
  "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
  "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
  "Ramgarh", "Ranchi", "Sahebganj", "Saraikela Kharsawan", "Simdega", "West Singhbhum"
];

export const PROBLEM_CATEGORIES = [
  "Water & Sanitation",
  "Education",
  "Healthcare",
  "Agriculture",
  "Transport",
  "Roads",
  "Road Safety/RTC",
  "Road & Transportation",
  "Electricity",
  "Environment",
  "Public Safety",
  "Waste Management",
  "Housing",
  "Accessibility",
  "Public Infrastructure",
  "Other"
];

export const INITIAL_USERS = [
  {
    id: "USR-001",
    name: "Platform Creator (Super Admin)",
    email: "creator.admin@samasya.example",
    mobile: "+91 99000 11111",
    role: "SUPER_ADMIN",
    organization: "Samasya Nivark Platform Directorate",
    organizationId: "ORG-000",
    organizationType: "PLATFORM",
    district: "Ranchi",
    status: "Active",
    createdDate: "2026-01-01"
  },
  {
    id: "USR-002",
    name: "BIT Mesra Admin",
    email: "univ.admin@samasya.example",
    mobile: "+91 98351 22334",
    role: "UNIVERSITY_ADMIN",
    organization: "Birsa Institute of Technology (BIT) Mesra",
    organizationId: "UNIV-001",
    organizationType: "UNIVERSITY",
    district: "Ranchi",
    status: "Active",
    createdDate: "2026-01-15"
  },
  {
    id: "USR-003",
    name: "Tata Steel CSR Admin",
    email: "industry.admin@samasya.example",
    mobile: "+91 94311 55667",
    role: "INDUSTRY_ADMIN",
    organization: "Tata Steel CSR Division",
    organizationId: "IND-001",
    organizationType: "INDUSTRY",
    district: "East Singhbhum",
    status: "Active",
    createdDate: "2026-02-01"
  },
  {
    id: "USR-004",
    name: "Dumka DWSD Executive Engineer",
    email: "govt.admin@samasya.example",
    mobile: "+91 97710 88990",
    role: "GOVERNMENT_ADMIN",
    organization: "Department of Drinking Water & Sanitation (Dumka)",
    organizationId: "GOVT-001",
    organizationType: "GOVERNMENT",
    district: "Dumka",
    status: "Active",
    createdDate: "2026-01-10"
  },
  {
    id: "USR-005",
    name: "Ankit Kumar (Student Innovator)",
    email: "student.demo@samasya.example",
    mobile: "+91 91234 56789",
    role: "STUDENT",
    organization: "BIT Mesra",
    organizationId: "UNIV-001",
    organizationType: "UNIVERSITY",
    district: "Ranchi",
    status: "Active",
    createdDate: "2026-02-10"
  },
  {
    id: "USR-006",
    name: "Prof. S. K. Mahato (Faculty Mentor)",
    email: "faculty.demo@samasya.example",
    mobile: "+91 98765 12345",
    role: "FACULTY",
    organization: "BIT Mesra",
    organizationId: "UNIV-001",
    organizationType: "UNIVERSITY",
    district: "Ranchi",
    status: "Active",
    createdDate: "2026-02-12"
  },
  {
    id: "USR-007",
    name: "Birsa Soren (Citizen)",
    email: "birsa.soren@samasya.example",
    mobile: "+91 98765 43210",
    role: "CITIZEN",
    organization: "Jama Village Panchayat",
    organizationId: null,
    organizationType: "CITIZEN",
    district: "Dumka",
    status: "Active",
    createdDate: "2026-03-01"
  }
];

export const INITIAL_UNIVERSITIES = [
  { id: "UNIV-001", name: "Birsa Institute of Technology (BIT) Mesra", district: "Ranchi", adminEmail: "univ.admin@samasya.example", address: "Mesra, Ranchi, Jharkhand 835215", status: "Active" },
  { id: "UNIV-002", name: "National Institute of Technology (NIT) Jamshedpur", district: "East Singhbhum", adminEmail: "nit.admin@samasya.example", address: "Adityapur, Jamshedpur, Jharkhand 831014", status: "Active" },
  { id: "UNIV-003", name: "Birsa Agricultural University (BAU)", district: "Ranchi", adminEmail: "bau.admin@samasya.example", address: "Kanke, Ranchi, Jharkhand 834006", status: "Active" },
  { id: "UNIV-004", name: "Central University of Jharkhand (CUJ)", district: "Ranchi", adminEmail: "cuj.admin@samasya.example", address: "Brambe, Ranchi, Jharkhand 835205", status: "Active" }
];

export const INITIAL_INDUSTRIES = [
  { id: "IND-001", name: "Tata Steel CSR Foundation", district: "East Singhbhum", type: "Steel & Mining CSR", adminEmail: "industry.admin@samasya.example", status: "Active" },
  { id: "IND-002", name: "Bharat Coking Coal Limited (BCCL) CSR", district: "Dhanbad", type: "Energy CSR", adminEmail: "bccl.admin@samasya.example", status: "Active" },
  { id: "IND-003", name: "Coal India CSR Division", district: "Ranchi", type: "Public Sector CSR", adminEmail: "coalindia.admin@samasya.example", status: "Active" }
];

export const INITIAL_PROJECTS = [
  {
    id: "PRJ-2026-01",
    title: "Smart Water Monitoring Microgrid",
    problemId: "JH-2026-8901",
    university: "BIT Mesra",
    leadStudent: "Ankit Kumar",
    facultyMentor: "Prof. S. K. Mahato",
    industrySponsor: "Tata Steel CSR Foundation",
    status: "Active",
    description: "IoT sensor network for rural borewell flow tracking and automated leak alerts."
  },
  {
    id: "PRJ-2026-02",
    title: "Fly-Ash Porous Gravel Eco-Paving",
    problemId: "JH-2026-8902",
    university: "BIT Mesra",
    leadStudent: "Sita Devi Innovation Cell",
    facultyMentor: "Dr. Ananya Sharma",
    industrySponsor: "HEC Ranchi CSR",
    status: "Active",
    description: "Low-cost porous gravel paving using industrial fly-ash aggregate for monsoon road access."
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: "LOG-101", timestamp: "2026-09-21 14:00", action: "University Admin Registered", performedBy: "Platform Creator", role: "SUPER_ADMIN", target: "BIT Mesra (UNIV-001)" },
  { id: "LOG-102", timestamp: "2026-09-21 13:45", action: "Industry CSR Registered", performedBy: "Platform Creator", role: "SUPER_ADMIN", target: "Tata Steel CSR (IND-001)" },
  { id: "LOG-103", timestamp: "2026-09-21 12:30", action: "Problem Assigned to Department", performedBy: "Dumka DWSD Admin", role: "GOVERNMENT_ADMIN", target: "Report #JH-2026-8901" }
];

export const INITIAL_PROBLEMS = [
  {
    id: "JH-2026-8901",
    title: "Drinking water shortage & broken borewell in Jama Block",
    category: "Water & Sanitation",
    subcategory: "Rural Drinking Water",
    description: "The primary borewell supplying drinking water to over 450 residents of Jama village has been non-functional for 3 weeks. Villagers, mostly women and senior citizens, are walking 4 km daily to fetch non-potable water from the stream, leading to waterborne illness concerns.",
    affectedPeople: 450,
    village: "Jama Village",
    district: "Dumka",
    state: "Jharkhand",
    severity: "HIGH",
    priority: "HIGH",
    priorityScore: 82,
    targetResponse: "Target attention: within 2 days",
    status: "Under Verification",
    reportedBy: "Rameshwar Tudu",
    reporterMobile: "+91 98765 43210",
    reporterEmail: "birsa.soren@samasya.example",
    dateReported: "2026-09-02",
    supportersCount: 142,
    aiConfidence: 96,
    recommendedReceiver: "Department of Drinking Water & Sanitation (Dumka Division)",
    receiverType: "Government Department",
    whyReceiver: "Based on category (Water & Sanitation) and location in Dumka, this department is officially responsible for rural drinking water infrastructure.",
    assignedDepartment: "Department of Drinking Water & Sanitation (Dumka)",
    assignedUniversity: "BIT Mesra",
    assignedTeam: "BIT Mesra Hydro Innovation Team",
    industryPartner: "Tata Steel CSR Division",
    photos: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80"
    ],
    solutionProposed: null,
    history: [
      { date: "2026-09-02", step: "Submitted", note: "Report submitted by citizen Rameshwar Tudu (AI Category: Water & Sanitation - 96% confidence)" },
      { date: "2026-09-03", step: "Under Verification", note: "Assigned to Dumka District Water & Sanitation Officer" }
    ]
  },
  {
    id: "JH-2026-8902",
    title: "Unpaved muddy road preventing ambulance access during monsoon",
    category: "Road & Transportation",
    subcategory: "Rural Infrastructure",
    description: "A 2.5 km stretch connecting Bero Village to the State Highway becomes impassable during rain. Emergency vehicles and school buses cannot enter, putting 1,200 villagers at risk during medical emergencies.",
    affectedPeople: 1200,
    village: "Bero",
    district: "Ranchi",
    state: "Jharkhand",
    severity: "CRITICAL",
    priority: "CRITICAL",
    priorityScore: 115,
    targetResponse: "Target attention: immediate attention",
    status: "Solution Proposed",
    reportedBy: "Sita Devi",
    reporterMobile: "+91 94311 00987",
    reporterEmail: "sita.devi@samasya.example",
    dateReported: "2026-08-28",
    supportersCount: 389,
    aiConfidence: 94,
    recommendedReceiver: "Public Works Department (PWD, Ranchi Division)",
    receiverType: "Government Department",
    whyReceiver: "Based on category (Road & Transportation) and location in Ranchi, PWD is responsible for rural paving & connecting roads.",
    assignedDepartment: "PWD Ranchi",
    assignedUniversity: "BIT Mesra Civil Eng Team",
    assignedTeam: "BIT Mesra Civil Eng Team",
    industryPartner: "HEC Ranchi CSR",
    photos: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80"
    ],
    solutionProposed: "Porous eco-paving using local fly-ash slag aggregate designed by BIT Mesra students in collaboration with PWD Jharkhand.",
    history: [
      { date: "2026-08-28", step: "Submitted", note: "Report filed by Sita Devi (AI Category: Road & Transportation - 94% confidence)" },
      { date: "2026-08-29", step: "Verified", note: "Verified by Block Development Officer Bero" },
      { date: "2026-08-30", step: "Assigned", note: "Assigned to BIT Mesra Student Innovation Cell" },
      { date: "2026-09-04", step: "Solution Proposed", note: "Low-cost porous gravel paving blueprint submitted" }
    ]
  },
  {
    id: "JH-2026-8903",
    title: "Lack of solar power supply at Primary Health Sub-Centre",
    category: "Health & Emergency",
    subcategory: "Clinic Power",
    description: "The village health clinic suffers frequent power cuts lasting 8-12 hours daily. Vaccines and vital medicines stored in refrigerators risk spoilage, and nighttime deliveries are conducted under candlelight.",
    affectedPeople: 850,
    village: "Saranda Outpost",
    district: "West Singhbhum",
    state: "Jharkhand",
    severity: "HIGH",
    priority: "HIGH",
    priorityScore: 88,
    targetResponse: "Target attention: within 2 days",
    status: "In Progress",
    reportedBy: "Dr. Ananya Mahto",
    reporterMobile: "+91 91234 56789",
    reporterEmail: "ananya.health@samasya.example",
    dateReported: "2026-08-20",
    supportersCount: 275,
    aiConfidence: 92,
    recommendedReceiver: "Department of Health & JREDA (West Singhbhum)",
    receiverType: "Government Department",
    whyReceiver: "Clinic cold chains & vaccine solar microgrids are managed by Health Dept & JREDA.",
    assignedDepartment: "Health Dept & JREDA",
    assignedUniversity: "NIT Jamshedpur Renewable Energy Club",
    assignedTeam: "NIT Jamshedpur Renewable Energy Club",
    industryPartner: "Tata Steel CSR Division",
    photos: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
    ],
    solutionProposed: "5kW microgrid solar roof installation with battery backup.",
    history: [
      { date: "2026-08-20", step: "Submitted", note: "Reported by Dr. Ananya Mahto (AI Category: Health & Emergency - 92% confidence)" },
      { date: "2026-08-22", step: "Verified", note: "Verified by Chief Medical Officer" },
      { date: "2026-08-25", step: "Assigned", note: "Assigned to NIT Jamshedpur Team" },
      { date: "2026-09-01", step: "In Progress", note: "Solar panel installation hardware dispatched by Industry Partner" }
    ]
  },
  {
    id: "JH-2026-8904",
    title: "Coal dust pollution and open waste accumulation in Jharia market area",
    category: "Waste Management",
    subcategory: "Urban Sanitation",
    description: "Open accumulation of commercial waste mixed with coal fine dust creates serious respiratory distress for shopkeepers and residents near the main market square. Requires mechanized waste segregation.",
    affectedPeople: 2100,
    village: "Jharia Market",
    district: "Dhanbad",
    state: "Jharkhand",
    severity: "MEDIUM",
    priority: "MEDIUM",
    priorityScore: 65,
    targetResponse: "Target attention: within 7 days",
    status: "Verified",
    reportedBy: "Vikram Kumar Singh",
    reporterMobile: "+91 98351 12345",
    reporterEmail: "vikram.dhanbad@samasya.example",
    dateReported: "2026-09-05",
    supportersCount: 198,
    aiConfidence: 91,
    recommendedReceiver: "Dhanbad Municipal Corporation",
    receiverType: "Municipal Body",
    whyReceiver: "Responsible for commercial waste collection and dust suppression in Jharia.",
    assignedDepartment: "Dhanbad Municipal Corporation",
    assignedUniversity: "IIT (ISM) Dhanbad",
    assignedTeam: null,
    industryPartner: "BCCL CSR Division",
    photos: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80"
    ],
    solutionProposed: null,
    history: [
      { date: "2026-09-05", step: "Submitted", note: "Reported by Vikram Kumar" },
      { date: "2026-09-06", step: "Verified", note: "Verified by Dhanbad Municipal Corporation" }
    ]
  },
  {
    id: "JH-2026-8905",
    title: "Siltation in check dam reducing agricultural irrigation for 60 farmers",
    category: "Agriculture",
    subcategory: "Irrigation Check Dam",
    description: "Excess silt accumulation in the local check dam has reduced water storage capacity by 70%, preventing double-cropping of paddy and mustard for smallholder tribal farmers in Ichak block.",
    affectedPeople: 320,
    village: "Ichak",
    district: "Hazaribagh",
    state: "Jharkhand",
    severity: "MEDIUM",
    priority: "MEDIUM",
    priorityScore: 58,
    targetResponse: "Target attention: within 7 days",
    status: "Assigned",
    reportedBy: "Budhram Munda",
    reporterMobile: "+91 97710 44332",
    reporterEmail: "budhram.farmer@samasya.example",
    dateReported: "2026-08-31",
    supportersCount: 89,
    aiConfidence: 89,
    recommendedReceiver: "Department of Agriculture & Water Resources (Hazaribagh)",
    receiverType: "Government Department",
    whyReceiver: "Agricultural check dam siltation removal and irrigation canals are managed by District Agriculture Dept.",
    assignedDepartment: "District Agriculture Office",
    assignedUniversity: "Birsa Agricultural University Agronomy Group",
    assignedTeam: "Birsa Agricultural University Agronomy Group",
    industryPartner: null,
    photos: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    ],
    solutionProposed: null,
    history: [
      { date: "2026-08-31", step: "Submitted", note: "Reported by Budhram Munda" },
      { date: "2026-09-02", step: "Verified", note: "Verified by District Agricultural Officer" },
      { date: "2026-09-04", step: "Assigned", note: "Assigned to Birsa Agricultural University team" }
    ]
  },
  {
    id: "JH-2026-8906",
    title: "Dilapidated roof and lack of digital classroom in Government Tribal High School",
    category: "Education",
    subcategory: "School Infrastructure",
    description: "The roof of the primary hall leaks during rain, forcing 180 students into a single crowded room. Additionally, students lack access to basic computer education due to absence of hardware.",
    affectedPeople: 180,
    village: "Mandar",
    district: "Ranchi",
    state: "Jharkhand",
    severity: "HIGH",
    priority: "HIGH",
    priorityScore: 76,
    targetResponse: "Target attention: within 2 days",
    status: "Resolved",
    reportedBy: "Sunita Oraon",
    reporterMobile: "+91 99341 66554",
    reporterEmail: "sunita.teacher@samasya.example",
    dateReported: "2026-07-15",
    supportersCount: 412,
    aiConfidence: 95,
    recommendedReceiver: "Department of School Education & Literacy (Ranchi)",
    receiverType: "Government Department",
    whyReceiver: "Oversees government tribal schools and digital lab setups.",
    assignedDepartment: "Department of School Education & Literacy",
    assignedUniversity: "Central University of Jharkhand",
    assignedTeam: "Central University of Jharkhand Tech Cell",
    industryPartner: "Coal India CSR",
    photos: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
    ],
    resolutionDate: "2026-08-25",
    solutionProposed: "Roof waterproofing completed; 10 refurbished laptop lab setup with offline educational software.",
    history: [
      { date: "2026-07-15", step: "Submitted", note: "Reported by Sunita Oraon" },
      { date: "2026-07-17", step: "Verified", note: "Verified by District Education Officer" },
      { date: "2026-07-20", step: "Assigned", note: "Assigned to CUJ Student Tech Team" },
      { date: "2026-08-01", step: "In Progress", note: "Roof repair & wiring work initiated" },
      { date: "2026-08-25", step: "Resolved", note: "Facility renovated and computer lab launched" }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Problem Status Updated",
    message: "Your reported problem 'Drinking water shortage in Jama' has been verified by Dumka District Authorities.",
    time: "2 hours ago",
    unread: true,
    type: "status",
    link: "/problem/JH-2026-8901"
  },
  {
    id: 2,
    title: "University Team Assigned!",
    message: "BIT Mesra Student Innovation Team has taken up the solution development for 'Unpaved muddy road in Bero'.",
    time: "1 day ago",
    unread: true,
    type: "collaboration",
    link: "/problem/JH-2026-8902"
  },
  {
    id: 3,
    title: "Industry Sponsorship Offered",
    message: "Tata Steel CSR has pledged hardware support for Saranda Health Centre Solar Microgrid project.",
    time: "3 days ago",
    unread: false,
    type: "industry",
    link: "/problem/JH-2026-8903"
  }
];

export const MOCK_STATS = {
  problemsReported: 1482,
  problemsResolved: 634,
  universitiesConnected: 28,
  industryPartners: 45,
  peopleImpacted: "185,000+"
};

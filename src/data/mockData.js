export const JHARKHAND_DISTRICTS = [
  "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
  "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
  "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
  "Ramgarh", "Ranchi", "Sahebganj", "Saraikela Kharsawan", "Simdega", "West Singhbhum"
];

export const PROBLEM_CATEGORIES = [
  "Water & Sanitation",
  "Health & Emergency",
  "Road Safety/RTC",
  "Road & Transportation",
  "Electricity",
  "Education",
  "Agriculture",
  "Waste Management",
  "Environment",
  "Infrastructure",
  "Other"
];

export const INITIAL_PROBLEMS = [
  {
    id: "JH-2026-8901",
    title: "Drinking water shortage & broken borewell in Jama Block",
    category: "Water & Sanitation",
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
    dateReported: "2026-09-02",
    supportersCount: 142,
    aiConfidence: 96,
    photos: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80"
    ],
    assignedTeam: null,
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
    dateReported: "2026-08-28",
    supportersCount: 389,
    aiConfidence: 94,
    photos: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80"
    ],
    assignedTeam: "BIT Mesra Civil Eng Team",
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
    dateReported: "2026-08-20",
    supportersCount: 275,
    aiConfidence: 92,
    photos: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
    ],
    assignedTeam: "NIT Jamshedpur Renewable Energy Club & Tata Steel CSR",
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
    dateReported: "2026-09-05",
    supportersCount: 198,
    aiConfidence: 91,
    photos: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80"
    ],
    assignedTeam: null,
    solutionProposed: null,
    history: [
      { date: "2026-09-05", step: "Submitted", note: "Reported by Vikram Kumar (AI Category: Waste Management)" },
      { date: "2026-09-06", step: "Verified", note: "Verified by Dhanbad Municipal Corporation" }
    ]
  },
  {
    id: "JH-2026-8905",
    title: "Siltation in check dam reducing agricultural irrigation for 60 farmers",
    category: "Agriculture",
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
    dateReported: "2026-08-31",
    supportersCount: 89,
    aiConfidence: 89,
    photos: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
    ],
    assignedTeam: "Birsa Agricultural University Agronomy Group",
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
    dateReported: "2026-07-15",
    supportersCount: 412,
    aiConfidence: 95,
    photos: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
    ],
    assignedTeam: "Central University of Jharkhand & Coal India CSR",
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

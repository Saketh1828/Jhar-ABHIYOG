/**
 * AI Receiver Recommendation Engine for Jharkhand Samadhan / Samasya Nivark
 * Determines which official department, municipal body, panchayat, university, 
 * or industry partner should receive a reported societal problem.
 */

export const RECEIVER_RULES = [
  {
    category: "Water & Sanitation",
    department: "Department of Drinking Water & Sanitation",
    type: "Government Department",
    reason: "Responsible for rural drinking water supply, borewells, handpumps, and sanitation infrastructure across Jharkhand districts."
  },
  {
    category: "Health & Emergency",
    department: "Department of Health, Medical Education & Family Welfare",
    type: "Government Department",
    reason: "Manages primary health sub-centres, emergency medical supplies, vaccine cold chains, and rural ambulance services."
  },
  {
    category: "Road Safety/RTC",
    department: "Jharkhand Road Safety Authority & Traffic Cell",
    type: "Government Authority",
    reason: "Handles blackspots, speed breakers, pedestrian safety, collision hazards, and road accident prevention measures."
  },
  {
    category: "Road & Transportation",
    department: "Public Works Department (PWD) & Road Construction Dept",
    type: "Government Department",
    reason: "Responsible for state highways, rural connecting roads, bridges, culverts, and asphalt paving."
  },
  {
    category: "Electricity",
    department: "Jharkhand Bijli Vitran Nigam Limited (JBVNL)",
    type: "Government Utility",
    reason: "Manages power distribution, transformer replacements, solar microgrids, and rural electrification."
  },
  {
    category: "Education",
    department: "Department of School Education & Literacy",
    type: "Government Department",
    reason: "Oversees government tribal schools, classroom infrastructure, roof repairs, and digital lab setups."
  },
  {
    category: "Agriculture",
    department: "Department of Agriculture, Animal Husbandry & Co-operation",
    type: "Government Department",
    reason: "Manages agricultural check dams, irrigation canals, siltation removal, and farmer support systems."
  },
  {
    category: "Waste Management",
    department: "Urban Development & Housing Department / Municipal Corporation",
    type: "Municipal Body",
    reason: "Handles urban waste collection, coal dust suppression, commercial garbage segregation, and sanitation."
  },
  {
    category: "Environment",
    department: "Department of Forest, Environment & Climate Change",
    type: "Government Department",
    reason: "Responsible for forest conservation, industrial pollution monitoring, and environmental protection."
  },
  {
    category: "Infrastructure",
    department: "Rural Development Department & Zilla Parishad",
    type: "Panchayati Raj Body",
    reason: "Constructs and maintains community halls, village market sheds, boundary walls, and public facilities."
  }
];

export const recommendReceiver = (category = "", description = "", district = "Jharkhand") => {
  const rule = RECEIVER_RULES.find(r => r.category === category) || RECEIVER_RULES[0];
  
  // Custom keyword tweaks for specific receivers
  const descLower = (description || "").toLowerCase();
  
  if (descLower.includes("solar") || descLower.includes("microgrid")) {
    return {
      recommendedReceiver: "JREDA (Jharkhand Renewable Energy Development Agency)",
      receiverType: "State Nodal Agency",
      district: district,
      whyReceiver: `Based on solar energy keywords in the description, JREDA is specialized in off-grid solar microgrid installations in ${district}.`,
      assignedUniversity: "NIT Jamshedpur Renewable Energy Club",
      industryPartner: "Tata Steel CSR Division"
    };
  }

  if (descLower.includes("school") && (descLower.includes("computer") || descLower.includes("laptop"))) {
    return {
      recommendedReceiver: "Department of School Education & Literacy (Digital Cell)",
      receiverType: "Government Department",
      district: district,
      whyReceiver: `Identified digital education requirements for school students in ${district}.`,
      assignedUniversity: "Central University of Jharkhand",
      industryPartner: "Coal India Limited CSR"
    };
  }

  return {
    recommendedReceiver: `${rule.department} (${district} Division)`,
    receiverType: rule.type,
    district: district,
    whyReceiver: `Based on the problem category (${category}) and location in ${district}, ${rule.reason}`,
    assignedUniversity: category === "Road & Transportation" ? "BIT Mesra Civil Engineering Dept" : 
                        category === "Agriculture" ? "Birsa Agricultural University" : 
                        "Ranchi University Innovation Cell",
    industryPartner: category === "Waste Management" ? "BCCL CSR Division" : "Tata Steel CSR Foundation"
  };
};

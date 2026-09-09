export const CATEGORY_RULES = [
  {
    category: "Water & Sanitation",
    keywords: ["water", "borewell", "pump", "drinking", "leak", "pipe", "sewage", "drain", "sanitation", "well", "handpump", "contamination", "potable", "waterborne", "stream", "tap", "dry"]
  },
  {
    category: "Health & Emergency",
    keywords: ["health", "hospital", "doctor", "medicine", "ambulance", "clinic", "emergency", "vaccine", "patient", "disease", "fever", "delivery", "medical", "first aid", "nurse"]
  },
  {
    category: "Road Safety/RTC",
    keywords: ["accident", "rtc", "crash", "traffic", "safety", "speed breaker", "blind spot", "pedestrian", "collision", "signal", "hazard", "hit and run", "intersection"]
  },
  {
    category: "Road & Transportation",
    keywords: ["road", "bridge", "pothole", "muddy", "transport", "highway", "bus", "connectivity", "unpaved", "asphalt", "tar", "street", "footpath", "culvert"]
  },
  {
    category: "Electricity",
    keywords: ["electricity", "power", "light", "transformer", "pole", "wire", "outage", "blackout", "voltage", "solar", "grid", "current", "electric", "short circuit"]
  },
  {
    category: "Education",
    keywords: ["school", "college", "teacher", "classroom", "student", "computer", "digital", "laptop", "books", "education", "study", "desk", "blackboard", "tuition"]
  },
  {
    category: "Agriculture",
    keywords: ["crop", "farmer", "paddy", "irrigation", "dam", "siltation", "fertilizer", "drought", "soil", "harvest", "seed", "farm", "field", "mustard", "cultivation"]
  },
  {
    category: "Waste Management",
    keywords: ["waste", "garbage", "trash", "dustbin", "dumping", "coal dust", "pollution", "segregation", "filth", "dump", "litter", "cleanliness", "swachh"]
  },
  {
    category: "Environment",
    keywords: ["forest", "trees", "wildlife", "river", "pollution", "smoke", "plastic", "deforestation", "climate", "conservation", "air quality", "mining dust"]
  },
  {
    category: "Infrastructure",
    keywords: ["building", "hall", "community center", "wall", "construction", "roof", "facility", "boundary", "shelter", "structure", "market shed"]
  }
];

export const classifyProblemDescription = (text = "", title = "") => {
  const combined = (title + " " + text).toLowerCase();
  
  if (!combined.trim()) {
    return {
      category: "Water & Sanitation",
      confidence: 0,
      reason: "No text entered yet"
    };
  }

  let bestCategory = "Other";
  let maxMatches = 0;
  let matchedKeyword = "";

  for (const rule of CATEGORY_RULES) {
    let matches = 0;
    for (const kw of rule.keywords) {
      if (combined.includes(kw)) {
        matches += (kw.length > 5 ? 2 : 1); // Give more weight to longer specific terms
        if (!matchedKeyword) matchedKeyword = kw;
      }
    }

    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = rule.category;
    }
  }

  let confidence = 70;
  if (maxMatches >= 4) {
    confidence = Math.min(98, 90 + Math.floor(Math.random() * 8));
  } else if (maxMatches >= 2) {
    confidence = Math.min(89, 82 + Math.floor(Math.random() * 7));
  } else if (maxMatches === 1) {
    confidence = Math.min(81, 74 + Math.floor(Math.random() * 7));
  } else {
    confidence = 65;
  }

  return {
    category: bestCategory,
    confidence,
    matchedKeyword,
    maxMatches
  };
};

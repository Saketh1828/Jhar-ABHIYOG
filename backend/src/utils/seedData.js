import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { University } from '../models/University.js';
import { Industry } from '../models/Industry.js';
import { Problem } from '../models/Problem.js';
import { Project } from '../models/Project.js';
import { AuditLog } from '../models/AuditLog.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

const seed = async () => {
  console.log('[Seed Script] Connecting to database...');
  await connectDB();

  console.log('[Seed Script] Clearing old data...');
  await User.deleteMany({});
  await University.deleteMany({});
  await Industry.deleteMany({});
  await Problem.deleteMany({});
  await Project.deleteMany({});
  await AuditLog.deleteMany({});
  await Notification.deleteMany({});

  console.log('[Seed Script] Inserting demo seed collections...');

  await User.create([
    {
      id: "USR-001",
      name: "Platform Creator (Super Admin)",
      email: "creator.admin@samasya.example",
      password: "password123",
      role: "SUPER_ADMIN",
      organization: "Samasya Nivark Platform Directorate",
      organizationId: "ORG-000",
      organizationType: "PLATFORM",
      district: "Ranchi"
    },
    {
      id: "USR-002",
      name: "BIT Mesra Admin",
      email: "univ.admin@samasya.example",
      password: "password123",
      role: "UNIVERSITY_ADMIN",
      organization: "Birsa Institute of Technology (BIT) Mesra",
      organizationId: "UNIV-001",
      organizationType: "UNIVERSITY",
      district: "Ranchi"
    },
    {
      id: "USR-003",
      name: "Tata Steel CSR Admin",
      email: "industry.admin@samasya.example",
      password: "password123",
      role: "INDUSTRY_ADMIN",
      organization: "Tata Steel CSR Division",
      organizationId: "IND-001",
      organizationType: "INDUSTRY",
      district: "East Singhbhum"
    },
    {
      id: "USR-004",
      name: "Dumka District Collectorate",
      email: "admin.dumka@samasya.example",
      password: "password123",
      role: "GOVERNMENT_ADMIN",
      organization: "Dumka District Administration",
      organizationId: "GOVT-001",
      organizationType: "GOVERNMENT",
      district: "Dumka"
    },
    {
      id: "USR-005",
      name: "Birsa Soren",
      email: "birsa.soren@samasya.example",
      password: "password123",
      role: "CITIZEN",
      district: "Dumka",
      village: "Jama Village"
    }
  ]);

  console.log('[Seed Script] Data seed complete!');
  process.exit(0);
};

seed().catch(err => {
  console.error('[Seed Error]:', err);
  process.exit(1);
});

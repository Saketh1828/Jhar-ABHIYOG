import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  date: { type: String, required: true },
  step: { type: String, required: true },
  note: { type: String, default: '' }
}, { _id: false });

const ProblemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, default: '' },
  aiSuggestedCategory: { type: String, default: '' },
  aiConfidence: { type: Number, default: 92 },
  isAiCategoryOverridden: { type: Boolean, default: false },
  district: { type: String, required: true },
  village: { type: String, default: 'Local Village' },
  state: { type: String, default: 'Jharkhand' },
  latitude: { type: Number, default: 23.3441 },
  longitude: { type: Number, default: 85.3096 },
  affectedPeople: { type: Number, default: 1 },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
  urgency: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'MEDIUM' },
  priorityScore: { type: Number, default: 50 },
  targetResponse: { type: String, default: 'Target attention: within 7 days' },
  status: { 
    type: String, 
    enum: ['Submitted', 'Under AI Analysis', 'Admin Validated', 'Assigned', 'In Progress', 'Solution Proposed', 'Pilot Testing', 'Resolved'],
    default: 'Submitted'
  },
  reportedBy: { type: String, required: true },
  reporterMobile: { type: String, default: '' },
  reporterEmail: { type: String, default: '' },
  dateReported: { type: String, default: () => new Date().toISOString().split('T')[0] },
  supportersCount: { type: Number, default: 1 },
  recommendedReceiver: { type: String, default: '' },
  receiverType: { type: String, default: '' },
  whyReceiver: { type: String, default: '' },
  assignedDepartment: { type: String, default: '' },
  assignedUniversity: { type: String, default: '' },
  assignedTeam: { type: String, default: '' },
  industryPartner: { type: String, default: '' },
  solutionProposed: { type: String, default: '' },
  photos: [{ type: String }],
  history: [HistorySchema],
  resolutionDate: { type: String, default: '' },
  resolutionDescription: { type: String, default: '' }
}, { timestamps: true });

export const Problem = mongoose.model('Problem', ProblemSchema);

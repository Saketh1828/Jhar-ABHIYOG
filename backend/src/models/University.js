import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  district: { type: String, default: 'Ranchi' },
  address: { type: String, default: '' },
  adminEmail: { type: String, default: '' },
  assignedProjects: { type: Number, default: 0 },
  verifiedStudents: { type: Number, default: 0 },
  activeFaculty: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

export const University = mongoose.model('University', UniversitySchema);

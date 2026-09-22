import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  problemId: { type: String, required: true },
  university: { type: String, required: true },
  leadStudent: { type: String, required: true },
  facultyMentor: { type: String, required: true },
  industrySponsor: { type: String, default: 'Tata Steel CSR' },
  status: { type: String, default: 'Under Development' },
  completion: { type: Number, default: 15 },
  description: { type: String, default: '' },
  startDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const Project = mongoose.model('Project', ProjectSchema);

import mongoose from 'mongoose';

const JoinRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  projectId: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantRole: { type: String, default: 'Student / Researcher' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export const JoinRequest = mongoose.model('JoinRequest', JoinRequestSchema);

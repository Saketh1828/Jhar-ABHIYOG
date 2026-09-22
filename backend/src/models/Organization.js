import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['UNIVERSITY', 'INDUSTRY', 'GOVERNMENT', 'NGO', 'PLATFORM'], required: true },
  district: { type: String, default: 'Ranchi' },
  address: { type: String, default: '' },
  adminEmail: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

export const Organization = mongoose.model('Organization', OrganizationSchema);

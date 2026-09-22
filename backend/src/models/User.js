import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, default: '' },
  role: { 
    type: String, 
    enum: ['CITIZEN', 'STUDENT', 'FACULTY', 'GOVERNMENT_ADMIN', 'UNIVERSITY_ADMIN', 'INDUSTRY_ADMIN', 'SUPER_ADMIN', 'NGO'],
    default: 'CITIZEN'
  },
  organization: { type: String, default: '' },
  organizationId: { type: String, default: '' },
  organizationType: { type: String, enum: ['PLATFORM', 'UNIVERSITY', 'INDUSTRY', 'GOVERNMENT', 'NGO', 'CITIZEN'], default: 'CITIZEN' },
  district: { type: String, default: 'Ranchi' },
  village: { type: String, default: '' },
  isAadhaarVerified: { type: Boolean, default: false },
  aadhaarMasked: { type: String, default: 'XXXX-XXXX-5678' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);

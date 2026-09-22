import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  district: { type: String, default: 'East Singhbhum' },
  type: { type: String, default: 'CSR Corporate Partner' },
  csrBudget: { type: String, default: '₹ 50 Lakhs' },
  sponsoredProjects: { type: Number, default: 0 },
  adminEmail: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

export const Industry = mongoose.model('Industry', IndustrySchema);

import mongoose from 'mongoose';

const MembershipOfferSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  industryName: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  role: { type: String, required: true },
  sponsorshipAmount: { type: String, default: '₹ 2.5 Lakhs' },
  status: { type: String, enum: ['Sent', 'Accepted', 'Declined'], default: 'Sent' }
}, { timestamps: true });

export const MembershipOffer = mongoose.model('MembershipOffer', MembershipOfferSchema);

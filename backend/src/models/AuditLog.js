import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  actorName: { type: String, required: true },
  actorRole: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  details: { type: String, required: true }
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

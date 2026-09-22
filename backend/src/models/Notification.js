import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, default: 'Just now' },
  unread: { type: Boolean, default: true },
  type: { type: String, default: 'status' },
  link: { type: String, default: '#' }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', NotificationSchema);

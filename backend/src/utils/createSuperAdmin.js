import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@samasya-nivark.gov.in';

    const existing = await User.findOne({ email });

    if (existing) {
      console.log('Super Admin already exists.');
      console.log(`Email: ${email}`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Admin@2026Samasya', 12);

    await User.create({
      id: `ADM-${Date.now()}`,
      name: 'Samasya Nivark Super Admin',
      email,
      password: hashedPassword,
      mobile: '',
      role: 'SUPER_ADMIN',
      organization: 'Government of Jharkhand',
      organizationType: 'GOVERNMENT',
      district: 'Ranchi',
      status: 'Active'
    });

    console.log('======================================');
    console.log('SUPER ADMIN CREATED SUCCESSFULLY');
    console.log('Email:', email);
    console.log('Password: Admin@2026Samasya');
    console.log('======================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Failed to create Super Admin:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createSuperAdmin();
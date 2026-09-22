import mongoose from 'mongoose';

export const connectDB = async () => {
  const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/samasya_nivark';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${connUri}: ${error.message}. Running server with local memory fallback.`);
    return false;
  }
};

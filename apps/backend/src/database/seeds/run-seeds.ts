import { connect, disconnect } from 'mongoose';
import { config } from 'dotenv';
import { seedDemoData } from './demo-data';

// Load environment variables
config();

async function runSeeds() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://aadileetcode:3PyPy3AbgYSbTtrZ@cluster0.ppfyozj.mongodb.net/sagar_db';

  try {
    const connection = await connect(mongoUri);
    console.log('🔌 MongoDB connected successfully');

    await seedDemoData(connection);
    
    console.log('🎉 All seeds completed successfully!');
  } catch (error) {
    console.error('❌ Error running seeds:', error);
    process.exit(1);
  } finally {
    await disconnect();
  }
}

runSeeds();

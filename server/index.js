import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './Routes/auth.js';
import Doctor from './models/Doctor.js';
import Patient from './models/Patient.js';
import Vitals from './models/Vitals.js'; // Import the Vitals model

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('❌ Missing MONGO_URI in .env file');
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow frontend access
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use('/api/auth', authRoutes);

// Fetch All Patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().populate('assignedDoctor', 'name');
    res.json(patients);
  } catch (error) {
    console.error('❌ Error Fetching Patients:', error);
    res.status(500).json({ message: 'Server error fetching patients' });
  }
});

// Fetch Patient by Email
app.get('/api/patient/:email', async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.email }).populate(
      'assignedDoctor',
      'name' // Populate doctor name
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('❌ Error Fetching Patient:', error);
    res.status(500).json({ message: 'Server error fetching patient' });
  }
});

// Fetch the most recent vital record for a specific patient
app.get('/api/vitals/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;

    // Validate patientId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      console.error('Invalid patient ID:', patientId);
      return res.status(400).json({ message: 'Invalid patient ID' });
    }

    // Fetch the most recent vital record for the patient from the "vitals" collection
    const vital = await Vitals.findOne({ patientId }).sort({ date: -1 });

    if (!vital) {
      console.error('No vitals found for patient ID:', patientId);
      return res.status(404).json({ message: 'No vitals found for this patient' });
    }

    res.json(vital); // Return only the most recent record
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ message: 'Server error fetching vitals' });
  }
});

// Catch-All Route for Unhandled Requests
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Initialization
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

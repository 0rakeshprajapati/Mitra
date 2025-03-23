import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Patient' },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  specialCondition: { type: String },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Reference to Doctor
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;

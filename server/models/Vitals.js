import mongoose from 'mongoose';

const vitalsSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  temperature: { type: Number, required: true },
  respiratoryRate: { type: Number, required: true },
  oxygenSaturation: { type: Number, required: true },
});

const Vitals = mongoose.model('Vitals', vitalsSchema);
export default Vitals;

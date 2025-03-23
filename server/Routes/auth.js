import express from 'express';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import admin from '../firebaseAdmin.js';

const router = express.Router();
// 🔹 LOGIN Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🔍 Login Attempt for Email: ${email}`);

    // Find user in both doctor and patient collections
    const doctor = await Doctor.findOne({ email });
    const patient = await Patient.findOne({ email });

    if (!doctor && !patient) {
      console.log("❌ User Not Found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = doctor || patient; // Choose the found user
    console.log(`✅ User Found: ${user.email} (Role: ${user.role})`);

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("❌ Incorrect Password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔓 Login Successful");
    return res.status(200).json({ message: "Login successful", user: { email: user.email, role: user.role } });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Signup Route with Debugging
router.post('/signup', async (req, res) => {
  console.log("➡️ Signup Attempt:", req.body); // Log request data

  const { name, email, password, role, age, gender, height, weight, specialCondition, assignedDoctor } = req.body;

  try {
    if (!name || !email || !password || !role || !age || !gender || !height || !weight) {
      console.log("❌ Missing fields"); // Log missing fields
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Doctor.findOne({ email }) || await Patient.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email); // Log duplicate emails
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Password Hashed");

    if (role === 'Doctor') {
      const doctor = new Doctor({
        name, email, password: hashedPassword, role
      });
      await doctor.save();
      console.log("✅ Doctor Registered:", doctor);
      return res.status(201).json({ message: 'Doctor registered successfully', id: doctor._id });
    } 
    else if (role === 'Patient') {
      // Validate assignedDoctor
      if (!assignedDoctor) {
        console.log("❌ Assigned doctor is missing for patient signup");
        return res.status(400).json({ message: "Assigned doctor is required for patients" });
      }

      const doctorExists = await Doctor.findById(assignedDoctor);
      if (!doctorExists) {
        console.log("❌ Assigned doctor not found:", assignedDoctor);
        return res.status(404).json({ message: "Assigned doctor not found" });
      }

      const patient = new Patient({
        name, email, password: hashedPassword, role, age, gender, height, weight, specialCondition, assignedDoctor
      });
      await patient.save();
      console.log("✅ Patient Registered:", patient);
      return res.status(201).json({ message: 'Patient registered successfully', id: patient._id });
    } 
    else {
      console.log("❌ Invalid Role:", role);
      return res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Google Authentication
router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // 🔹 Verify Google ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;

    // 🔹 Check if user exists
    const patient = await Patient.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (!patient && !doctor) {
      return res.status(401).json({ message: 'Invalid email, please sign up.' });
    }

    const user = patient || doctor;
    const userType = patient ? 'Patient' : 'Doctor';

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, email, userType }
    });
  } catch (error) {
    console.error("❌ Google Auth Error:", error);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
});

export default router;

import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },

  // Employment Information
  employmentInfo: { type: String },
  monthlyIncome: { type: Number },

  // Vehicle Information
  idealCar: { type: String },
  downPayment: { type: Number, required: true },

  // Documents
  idPhoto: { type: String }, // file path
  bankStatements: [{ type: String }], // array of file paths
  ssnPhoto: { type: String }, // file path

  // Additional
  importantNotes: { type: String },

  // Status
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
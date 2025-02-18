const mongoose = require('mongoose');

const visaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  passportNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // Added new field for status
});

const VisaApplication = mongoose.model('VisaApplication', visaApplicationSchema, 'visa_applications');

module.exports = VisaApplication;

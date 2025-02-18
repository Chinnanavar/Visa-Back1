// routes/visaApplicationRoutes.js
const express = require('express');
const Joi = require('joi');
const VisaApplication = require('../models/VisaApplication');
const router = express.Router();

// Validation schema with Joi
const validateApplication = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(3),
    passportNumber: Joi.string().required().length(9),
    email: Joi.string().required().email(),
    country: Joi.string().required(),
  });
  return schema.validate(data);
};

// POST endpoint to submit visa application
router.post('/apply', async (req, res) => {
  const { error } = validateApplication(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const { fullName, passportNumber, email, country } = req.body;

  try {
    // Create and save the visa application
    const newApplication = new VisaApplication({
      fullName,
      passportNumber,
      email,
      country,
    });

    await newApplication.save();
    res.status(201).json({ success: true, message: 'Visa application saved successfully.' });
  } catch (err) {
    console.error('Error saving application:', err);
    res.status(500).json({ success: false, error: 'Failed to save visa application.' });
  }
});

// GET endpoint to fetch visa applications
router.get('/applications', async (req, res) => {
  try {
    // Fetch all visa applications from the database
    const applications = await VisaApplication.find();

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: 'No visa applications found.' });
    }

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch visa applications.' });
  }
});

module.exports = router;

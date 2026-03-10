const Mentor = require("../models/Mentor");


// GET all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// POST create mentor
exports.createMentor = async (req, res) => {
  try {
    const mentor = new Mentor(req.body);

    const savedMentor = await mentor.save();

    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const Slot = require("../models/Slot");

exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlot = async (req, res) => {
  try {
    const slot = new Slot(req.body);

    const savedSlot = await slot.save();

    res.status(201).json(savedSlot);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.registerGroup = async (req, res) => {
  try {

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.registered >= slot.maxGroup) {
      return res.status(400).json({
        message: "Class is full (max 3 groups)"
      });
    }

    slot.registered += 1;

    await slot.save();

    res.json(slot);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
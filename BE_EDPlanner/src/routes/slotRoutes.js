const express = require("express");

const router = express.Router();

const slotController = require("../controllers/slotController");

router.get("/", slotController.getAllSlots);

router.post("/", slotController.createSlot);

router.put("/register/:id", slotController.registerGroup);

module.exports = router;
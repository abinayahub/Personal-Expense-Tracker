const express = require("express");
const router = express.Router();
const Income = require("../models/IncomeModel");
const auth = require("../middleware/auth");

// Add Income
router.post("/add-income", auth, async (req, res) => {
  try {
    const income = new Income({
      ...req.body,
      userId: req.user.id, // link income to logged-in user
    });
    await income.save();
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Incomes for logged-in user
router.get("/get-incomes", auth, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(incomes);
    console.log(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Income
router.delete("/delete-income/:id", auth, async (req, res) => {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

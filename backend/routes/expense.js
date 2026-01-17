const express = require("express");
const router = express.Router();
const Expense = require("../models/ExpenseModel");
const auth = require("../middleware/auth");

// Add Expense
router.post("/add-expense", auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.id,
    });
    await expense.save();
    res.json(expense);
    console.log(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Expenses for logged-in user
router.get("/get-expenses", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Expense
router.delete("/delete-expense/:id", auth, async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
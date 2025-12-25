const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
  getTotalExpense,
} = require("../controllers/expenseController");

// GET /api/expenses
router.get("/", getExpenses);

// POST /api/expenses
router.post("/", addExpense);

// GET /api/expenses/total
router.get("/total", getTotalExpense);

module.exports = router;

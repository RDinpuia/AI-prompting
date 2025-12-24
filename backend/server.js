const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEMP database
let expenses = [];

// GET expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// POST expense
app.post("/api/expenses", (req, res) => {
  const newExpense = req.body;
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

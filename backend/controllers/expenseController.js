// Temporary in-memory storage
let expenses = [];

// GET all expenses
const getExpenses = (req, res) => {
  res.json(expenses);
};

// POST new expense
const addExpense = (req, res) => {
  const { title, amount, date } = req.body;

  if (!title || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newExpense = {
    id: expenses.length + 1,
    title,
    amount,
    date,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
};

// GET total expense
const getTotalExpense = (req, res) => {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  res.json({ total });
};

module.exports = {
  getExpenses,
  addExpense,
  getTotalExpense,
};


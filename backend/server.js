<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const expenseRoutes = require("./routes/expenses");
=======
import express from "express";
import cors from "cors";
>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD

// Routes
app.use("/api/expenses", expenseRoutes);

// Start server
=======
let expenses = [];

// GET
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// POST - create
app.post("/api/expenses", (req, res) => {
  const newExpense = {
    id: Date.now(), // number id
    ...req.body,
  };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// PUT - update
app.put("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body,
  };

  res.json(expenses[index]);
});

// DELETE
app.delete("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expenses.splice(index, 1); // remove item
  res.json({ message: "Deleted" });
});
const PORT = 5000;

>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

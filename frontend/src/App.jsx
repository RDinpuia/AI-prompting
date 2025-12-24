import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Fetch expenses from backend
  useEffect(() => {
    axios.get(`${API_URL}/api/expenses`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount: Number(amount),
      date,
    };

  try {
    const res = await axios.post(
      `${API_URL}/api/expenses`,
      newExpense
    );

    setExpenses((prev) =>
      Array.isArray(prev) ? [...prev, res.data] : [res.data]
    );
  } catch (error) {
    console.error(error);
  }

  setTitle("");
  setAmount("");
  setDate("");
};

  const totalExpense = safeExpenses.reduce(
  (sum, exp) => sum + Number(exp.amount),
  0
);
  

  return (
    <div className="app">
      <h1>Simple Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button>Add Expense</button>
      </form>

      <h3>All Expenses</h3>
{safeExpenses.length === 0 && <p>No expenses added yet.</p>}

{safeExpenses.map((exp, index) => (
  <div key={index} style={{ marginBottom: "8px" }}>
    <strong>{exp.title}</strong> | ₹{exp.amount} | {exp.date}
  </div>
))}

      <h2>Total: ₹{totalExpense}</h2>
    </div>
  );
}

export default App;

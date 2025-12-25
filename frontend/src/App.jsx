import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);
<<<<<<< HEAD
  const [total, setTotal] = useState(0);
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
=======

>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [editId, setEditId] = useState(null);

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Fetch all expenses
  useEffect(() => {
<<<<<<< HEAD
    // Fetch all expenses
    axios
      .get(`${API_URL}/api/expenses`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));

    // Fetch total expense
    axios
      .get(`${API_URL}/api/expenses/total`)
      .then((res) => setTotal(res.data.total))
      .catch((err) => console.error(err));
=======
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/expenses`);
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e
  }, []);

  // Add or Update expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      title,
      amount: Number(amount),
      date,
    };

    try {
<<<<<<< HEAD
      const res = await axios.post(`${API_URL}/api/expenses`, newExpense);

      setExpenses((prev) =>
        Array.isArray(prev) ? [...prev, res.data] : [res.data]
      );

      // Refresh total after adding expense
      const totalRes = await axios.get(`${API_URL}/api/expenses/total`);
      setTotal(totalRes.data.total);
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setAmount("");
    setDate("");
  };
=======
      if (editId !== null) {
        // UPDATE existing expense
        const res = await axios.put(
          `${API_URL}/api/expenses/${editId}`,
          expenseData
        );

        setExpenses((prev) =>
          prev.map((exp) =>
            exp.id === editId ? res.data : exp
          )
        );
        setEditId(null);
      } else {
        // ADD new expense
        const res = await axios.post(
          `${API_URL}/api/expenses`,
          expenseData
        );

        setExpenses((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setTitle("");
    setAmount("");
    setDate("");
  };

  //  Delete expense
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/expenses/${id}`);
      setExpenses((prev) =>
        prev.filter((exp) => exp.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  //  Edit expense (load into form)
  const handleEdit = (expense) => {
  console.log("Editing:", expense);
  setEditId(expense.id);
  setTitle(expense.title);
  setAmount(expense.amount);
  setDate(expense.date);
};

  // 🔢 Total recalculated from state
  const totalExpense = safeExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  
>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e

  return (
    <div className="app">
      <h1>Simple Expense Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">
          {editId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <h3>All Expenses</h3>
      {safeExpenses.length === 0 && <p>No expenses added yet.</p>}

<<<<<<< HEAD
      {safeExpenses.map((exp, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <strong>{exp.title}</strong> | ₹{exp.amount} | {exp.date}
=======
      {safeExpenses.map((exp) => (
        <div key={exp.id} style={{ marginBottom: "8px" }}>
          <strong>{exp.title}</strong> | ₹{exp.amount} | {exp.date}{" "}
          <button onClick={() => handleEdit(exp)}>Edit</button>{" "}
          <button onClick={() => handleDelete(exp.id)}>Delete</button>
>>>>>>> 52a858dbf988762f2e6c55aa5e07dd4c0cfda14e
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}

export default App;

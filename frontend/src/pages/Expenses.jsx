import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenses";

function Expenses() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    amount: "",
    description: "",
    expense_date: "",
    priority: "Essential",
  });
  const [editingId, setEditingId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadExpenses();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadExpenses = async () => {
    try {
      const response = await getExpenses();

      setExpenses(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await updateExpense({
          id: editingId,
          ...formData,
        });
      } else {
        response = await createExpense(formData);
      }

      setMessage(editingId ? "Expense updated" : response.message);

      setEditingId(null);

      setFormData({
        category_id: "",
        amount: "",
        description: "",
        expense_date: "",
        priority: "Essential",
      });

      loadExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      category_id: expense.category_id,
      amount: expense.amount,
      description: expense.description,
      expense_date: expense.expense_date,
      priority: expense.priority,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete expense?");

    if (!confirmed) return;

    try {
      await deleteExpense(id);

      loadExpenses();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Expenses Management
          </h1>

          <p className="text-slate-500 mt-1">
            Record, track and manage all your expenses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Expenses</p>

            <h2 className="text-3xl font-bold mt-2">
              ₦
              {expenses
                .reduce((sum, item) => sum + Number(item.amount), 0)
                .toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Records</p>

            <h2 className="text-3xl font-bold mt-2">{expenses.length}</h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Categories Used</p>

            <h2 className="text-3xl font-bold mt-2">
              {new Set(expenses.map((item) => item.category_id)).size}
            </h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Expense" : "Add New Expense"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={formData.category_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category_id: e.target.value,
                })
              }
              className="
    w-full
    border
    rounded-lg
    p-3
  "
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="
    w-full
    border
    rounded-lg
    p-3
  "
            />

            <input
              type="date"
              value={formData.expense_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expense_date: e.target.value,
                })
              }
              className="
    w-full
    border
    rounded-lg
    p-3
  "
            />

            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
              className="
    w-full
    border
    rounded-lg
    p-3
  "
            >
              <option value="Essential">Essential</option>

              <option value="Non-Essential">Non-Essential</option>
            </select>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="
      bg-blue-600
      text-white
      px-5
      py-2
      rounded-lg
      hover:bg-blue-700
      transition
    "
              >
                {editingId ? "Update Expense" : "Add Expense"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);

                    setFormData({
                      category_id: "",
                      amount: "",
                      description: "",
                      expense_date: "",
                      priority: "Essential",
                    });
                  }}
                  className="
        px-5
        py-2
        border
        rounded-lg
        hover:bg-slate-100
      "
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense History</h2>

            <span className="text-sm text-slate-500">
              {expenses.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left py-3 px-2">Category</th>

                  <th className="text-left py-3 px-2">Amount</th>

                  <th className="text-left py-3 px-2">Priority</th>

                  <th className="text-left py-3 px-2">Date</th>

                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((item) => (
                  <tr
                    key={item.id}
                    className="
              border-b
              hover:bg-slate-50
            "
                  >
                    <td className="py-3 px-2">{item.category_name}</td>

                    <td className="py-3 px-2 font-medium">
                      ₦{Number(item.amount).toLocaleString()}
                    </td>

                    <td className="py-3 px-2">
                      {item.priority === "Essential" ? (
                        <span
                          className="
                    px-3 py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                  "
                        >
                          Essential
                        </span>
                      ) : (
                        <span
                          className="
                    px-3 py-1
                    rounded-full
                    bg-orange-100
                    text-orange-700
                    text-sm
                  "
                        >
                          Non-Essential
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-2">{item.expense_date}</td>

                    <td className="py-3 px-2 space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="
                  text-blue-600
                  hover:underline
                "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="
                  text-red-600
                  hover:underline
                "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expenses;

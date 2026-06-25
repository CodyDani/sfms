import { useState, useEffect } from "react";
import {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../api/income";

function Income() {
  const [income, setIncome] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    description: "",
    income_date: "",
  });

  const loadIncome = async () => {
    try {
      const response = await getIncome();

      setIncome(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadIncome();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await updateIncome({
          id: editingId,
          ...formData,
        });
      } else {
        response = await createIncome(formData);
      }

      setMessage(editingId ? "Income updated" : response.message);

      setEditingId(null);

      setFormData({
        source: "",
        amount: "",
        description: "",
        income_date: "",
      });

      loadIncome();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      source: item.source,
      amount: item.amount,
      description: item.description,
      income_date: item.income_date,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete income record?");

    if (!confirmed) return;

    try {
      await deleteIncome(id);

      loadIncome();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Income Management
          </h1>

          <p className="text-slate-500 mt-1">
            Track and manage all your income sources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Income</p>

            <h2 className="text-3xl font-bold mt-2">
              ₦
              {income
                .reduce((sum, item) => sum + Number(item.amount), 0)
                .toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Income Records</p>

            <h2 className="text-3xl font-bold mt-2">{income.length}</h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Income Sources</p>

            <h2 className="text-3xl font-bold mt-2">
              {new Set(income.map((item) => item.source)).size}
            </h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Income" : "Add New Income"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Source */}

            <input
              type="text"
              placeholder="Income Source"
              value={formData.source}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  source: e.target.value,
                })
              }
              className="
        w-full
        border
        rounded-lg
        p-3
      "
            />

            {/* Amount */}

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
              className="
        w-full
        border
        rounded-lg
        p-3
      "
            />

            {/* Description */}

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

            {/* Date */}

            <input
              type="date"
              value={formData.income_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  income_date: e.target.value,
                })
              }
              className="
        w-full
        border
        rounded-lg
        p-3
      "
            />

            {/* Buttons */}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
        "
              >
                {editingId ? "Update Income" : "Add Income"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);

                    setFormData({
                      source: "",
                      amount: "",
                      description: "",
                      income_date: "",
                    });
                  }}
                  className="
            border
            px-5
            py-2
            rounded-lg
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
            <h2 className="text-xl font-semibold">Income History</h2>

            <span className="text-sm text-slate-500">
              {income.length} Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="text-left py-3 px-2">Source</th>

                  <th className="text-left py-3 px-2">Amount</th>

                  <th className="text-left py-3 px-2">Date</th>

                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {income.map((item) => (
                  <tr
                    key={item.id}
                    className="
              border-b
              hover:bg-slate-50
            "
                  >
                    <td className="py-3 px-2">{item.source}</td>

                    <td className="py-3 px-2 font-medium">
                      ₦{Number(item.amount).toLocaleString()}
                    </td>

                    <td className="py-3 px-2">{item.income_date}</td>

                    <td className="py-3 px-2 space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="
                  text-blue-600
                "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="
                  text-red-600
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

export default Income;

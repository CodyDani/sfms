import { useState, useEffect } from "react";
import {
  getSavingsGoals,
  createSavingsGoal,
  deleteSavingsGoal,
  updateSavingsGoal,
} from "../api/savings";

function Savings() {
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    goal_name: "",
    target_amount: "",
    current_amount: "",
    target_date: "",
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const response = await getSavingsGoals();

      setGoals(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await updateSavingsGoal({
          id: editingId,
          ...formData,
        });
      } else {
        response = await createSavingsGoal(formData);
      }

      console.log(response);

      setEditingId(null);

      setFormData({
        goal_name: "",
        target_amount: "",
        current_amount: "",
        target_date: "",
      });

      loadGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (goal) => {
    setEditingId(goal.id);

    setFormData({
      goal_name: goal.goal_name,
      target_amount: goal.target_amount,
      current_amount: goal.current_amount,
      target_date: goal.target_date,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this savings goal?");

    if (!confirmed) return;

    try {
      await deleteSavingsGoal(id);

      loadGoals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Savings Goals</h1>

          <p className="text-slate-500 mt-1">
            Create and track your financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Goals</p>

            <h2 className="text-3xl font-bold mt-2">{goals.length}</h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Saved</p>

            <h2 className="text-3xl font-bold mt-2">
              ₦
              {goals
                .reduce((sum, goal) => sum + Number(goal.current_amount), 0)
                .toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Target Amount</p>

            <h2 className="text-3xl font-bold mt-2">
              ₦
              {goals
                .reduce((sum, goal) => sum + Number(goal.target_amount), 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Update Savings Goal" : "Create Savings Goal"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Goal Name"
              value={formData.goal_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goal_name: e.target.value,
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
              type="number"
              placeholder="Target Amount"
              value={formData.target_amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  target_amount: e.target.value,
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
              type="number"
              placeholder="Current Amount Saved"
              value={formData.current_amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current_amount: e.target.value,
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
              value={formData.target_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  target_date: e.target.value,
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
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="
        w-full
        border
        rounded-lg
        p-3
      "
            >
              <option value="Active">Active</option>

              <option value="Completed">Completed</option>
            </select>

            <div className="flex gap-3">
              <button
                type="submit"
                className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
        "
              >
                {editingId ? "Update Goal" : "Create Goal"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);

                    setFormData({
                      goal_name: "",
                      target_amount: "",
                      current_amount: "",
                      target_date: "",
                      status: "Active",
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

        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="
        bg-white
        border
        rounded-xl
        p-5
      "
            >
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{goal.goal_name}</h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    goal.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              <p className="mt-3 text-slate-600">
                ₦{Number(goal.current_amount).toLocaleString()}
                {" / "}₦{Number(goal.target_amount).toLocaleString()}
              </p>

              {/* Progress Bar */}

              <div className="mt-4">
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="
              bg-green-500
              h-3
              rounded-full
            "
                    style={{
                      width: `${Math.min(goal.progress_percentage, 100)}%`,
                    }}
                  />
                </div>

                <p className="text-sm mt-2">
                  {goal.progress_percentage}% Complete
                </p>
              </div>

              <p className="text-sm text-slate-500 mt-3">
                Target Date: {goal.target_date}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEdit(goal)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Savings;

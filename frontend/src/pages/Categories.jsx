import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../api/categories";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_name: "",
    budget_amount: "",
  });
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await updateCategory({
          id: editingId,
          ...formData,
        });
      } else {
        response = await createCategory(formData);
      }

      setMessage(
        editingId ? "Category updated successfully" : response.message,
      );

      setFormData({
        category_name: "",
        budget_amount: "",
      });

      setEditingId(null);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete category?");

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);

    setFormData({
      category_name: category.category_name,
      budget_amount: category.budget_amount,
    });
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Categories & Budgets</h1>

        {message && (
          <div
            className="
      bg-green-100
      text-green-700
      p-3
      rounded-lg
    "
          >
            {message}
          </div>
        )}
      </div>
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Categories</p>

            <h2 className="text-2xl font-bold mt-2">{categories.length}</h2>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <p className="text-slate-500">Total Budget</p>

            <h2 className="text-2xl font-bold mt-2">
              ₦
              {categories
                .reduce((sum, item) => sum + Number(item.budget_amount), 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
  bg-white
  border
  rounded-xl
  p-6
  space-y-4
"
        >
          <h2 className="font-semibold">Add Category</h2>

          <input
            type="text"
            placeholder="Category Name"
            value={formData.category_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_name: e.target.value,
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
            placeholder="Budget Amount"
            value={formData.budget_amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                budget_amount: e.target.value,
              })
            }
            className=" w-full border rounded-lg p-3"
          />

          <div className="flex items-center gap-3">
            <button
              className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
    "
            >
              {editingId ? "Update Category" : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setFormData({
                    category_name: "",
                    budget_amount: "",
                  });
                }}
                className="
        px-4
        py-2
        border
        rounded-lg
      "
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div
          className="
  bg-white
  border
  rounded-xl
  p-6
"
        >
          <h2 className="font-semibold mb-4">Categories</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Category</th>

                  <th className="text-left py-3">Budget</th>

                  <th className="text-left py-3">Created</th>

                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">{item.category_name}</td>

                    <td className="py-3">
                      ₦{Number(item.budget_amount).toLocaleString()}
                    </td>

                    <td className="py-3">{item.created_at?.split(" ")[0]}</td>

                    <td className="py-3 space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
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

export default Categories;

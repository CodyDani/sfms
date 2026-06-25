import api from "./axios";

export const getCategories = async () => {
  const response = await api.get("categories/list.php");

  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post("categories/create.php", data);

  return response.data;
};

export const updateCategory = async (data) => {
  const response = await api.post("categories/update.php", data);

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.post("categories/delete.php", { id });

  return response.data;
};

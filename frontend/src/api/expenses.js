import api from "./axios";

export const getExpenses = async () => {
  const response = await api.get("expenses/list.php");
  return response.data;
};

export const createExpense = async (data) => {
  const response = await api.post("expenses/create.php", data);
  return response.data;
};

export const updateExpense = async (data) => {
  const response = await api.post("expenses/update.php", data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.post("expenses/delete.php", { id });
  return response.data;
};

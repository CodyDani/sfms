import api from "./axios";

export const getIncome = async () => {
  const response = await api.get("income/list.php");
  return response.data;
};

export const createIncome = async (data) => {
  const response = await api.post("income/create.php", data);

  return response.data;
};

export const updateIncome = async (data) => {
  const response = await api.post("income/update.php", data);

  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await api.post("income/delete.php", { id });

  return response.data;
};

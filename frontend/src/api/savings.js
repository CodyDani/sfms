import api from "./axios";

export const getSavingsGoals = async () => {
  const response = await api.get("savings/list.php");
  return response.data;
};

export const createSavingsGoal = async (data) => {
  const response = await api.post("savings/create.php", data);
  return response.data;
};

export const updateSavingsGoal = async (data) => {
  const response = await api.post("savings/update.php", data);
  return response.data;
};

export const deleteSavingsGoal = async (id) => {
  const response = await api.post("savings/delete.php", { id });
  return response.data;
};

import api from "./axios";

export const getSavingsGoals = async () => {
  const response = await api.get("savings/list.php");

  return response.data;
};

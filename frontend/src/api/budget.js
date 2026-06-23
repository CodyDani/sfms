import api from "./axios";

export const getBudgetProgress = async () => {
  const response = await api.get("budgets/progress.php");

  return response.data;
};

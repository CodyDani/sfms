import api from "./axios";

export const getRecentTransactions = async () => {
  const response = await api.get("dashboard/recent_transactions.php");

  return response.data;
};

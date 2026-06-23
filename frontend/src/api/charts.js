import api from "./axios";

export const getCategoryBreakdown = async () => {
  const response = await api.get("reports/category_breakdown.php");

  return response.data;
};

export const getMonthlyOverview = async () => {
  const response = await api.get("reports/monthly_report.php");

  return response.data;
};

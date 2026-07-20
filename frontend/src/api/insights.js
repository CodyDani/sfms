import api from "./axios";

export const getBudgetAnalysis = async (month, year) => {
  const response = await api.get(
    `insights/budget_analysis.php?month=${month}&year=${year}`,
  );

  return response.data;
};

export const getSmartInsights = async () => {
  const response = await api.get("insights/smart_insights.php");

  return response.data;
};

export const getFinancialOverview = async () => {
  const response = await api.get("reports/financial_overview.php");

  return response.data;
};

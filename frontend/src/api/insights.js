import api from "./axios";

export const getBudgetAnalysis = async () => {
  const response = await api.get("insights/budget_analysis.php");

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

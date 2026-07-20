// src/api/reports.js

import api from "./axios";

export const getFinancialOverview = async (month, year) => {
  const response = await api.get(
    `reports/financial_overview.php?month=${month}&year=${year}`,
  );

  return response.data;
};

export const getCategoryReport = async (month, year) => {
  const response = await api.get(
    `insights/budget_analysis.php?month=${month}&year=${year}`,
  );

  return response.data;
};

export const getCategoryBreakdown = async (month, year) => {
  const response = await api.get(
    `reports/category_breakdown.php?month=${month}&year=${year}`,
  );

  return response.data;
};

export const getMonthlyReport = async (month, year) => {
  const response = await api.get(
    `reports/monthly_report.php?month=${month}&year=${year}`,
  );

  return response.data;
};

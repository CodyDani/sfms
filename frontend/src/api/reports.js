// src/api/reports.js

import api from "./axios";

export const getFinancialOverview = async () => {
  const response = await api.get("reports/financial_overview.php");

  return response.data;
};

export const getCategoryReport = async () => {
  const response = await api.get("reports/category_report.php");

  return response.data;
};

export const getCategoryBreakdown = async () => {
  const response = await api.get("reports/category_breakdown.php");

  return response.data;
};

export const getMonthlyReport = async () => {
  const response = await api.get("reports/monthly_report.php");
  return response.data;
};

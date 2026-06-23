// src/api/insights.js

import api from "./axios";

export const getSmartInsights = async () => {
  const response = await api.get("insights/smart_insights.php");

  return response.data;
};

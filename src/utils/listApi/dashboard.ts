import { API_BASE_URL } from "./baseUrl";

export const dashboard = {
  getDataDashboard: () => `${API_BASE_URL}/dashboard`,
  getWebDashboard: `${API_BASE_URL}/employee/self`,
  changeProfilePicture: `${API_BASE_URL}/employee/avatar`
}
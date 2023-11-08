import { API_BASE_URL } from "./baseUrl";

export const attendance = {
  getDataAttendance: () => `${API_BASE_URL}/attendances/getpagination`,
  exportDataAttendance: () => `${API_BASE_URL}/attendances/export`,
}
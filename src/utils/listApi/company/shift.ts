import { API_BASE_URL } from "../baseUrl";

export const shift = {
  getDataShift: () => `${API_BASE_URL}/Shift/GetShift`,
  getDataShiftPagination: () => `${API_BASE_URL}/Shift/GetPagination`,
  updateDataShift: (id: string) => `${API_BASE_URL}/Shift/${id}`,
  deleteDataShift: (id: string) => `${API_BASE_URL}/Shift/${id}`,
  exportDataShift: () => `${API_BASE_URL}/Shift/export`,
  postDataShift: () => `${API_BASE_URL}/Shift/AddShift`,
}
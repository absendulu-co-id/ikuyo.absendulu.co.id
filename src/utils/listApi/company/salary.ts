import { API_BASE_URL } from "../baseUrl";

export const salaries = {
  getDataSalaries: () => `${API_BASE_URL}/salaries`,
  getDetailSalaries: (id: number) => `${API_BASE_URL}/salaries/${id}`,
  postDataSalaries: `${API_BASE_URL}/salaries`,
  updateDataSalaries: (id: number) => `${API_BASE_URL}/salaries/${id}`,
}
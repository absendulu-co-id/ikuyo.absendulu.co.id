import { API_BASE_URL } from "../baseUrl";

export const reimbursement = {
  getDataReimbursement: () => `${API_BASE_URL}/reimbursement/Getreimbursement`,
  getDataReimbursementPagination: () => `${API_BASE_URL}/reimbursement/GetPagination`,
  updateDataReimbursement: (id: string) => `${API_BASE_URL}/reimbursement/${id}`,
  deleteDataReimbursement: (id: string) => `${API_BASE_URL}/reimbursement/${id}`,
  exportDataReimbursement: () => `${API_BASE_URL}/reimbursement/export`,
  postDataReimbursement: () => `${API_BASE_URL}/reimbursement/Addreimbursement`,
}
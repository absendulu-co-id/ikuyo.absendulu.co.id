import { API_BASE_URL } from "./baseUrl";

export const payroll = {
    payroll: `${API_BASE_URL}/payrolls`,
    deletePayroll: (id: string) => `${API_BASE_URL}/payrolls/${id}`,
    updateDataPayroll: (id: string) => `${API_BASE_URL}/payrolls/${id}`,
    generatePayroll: `${API_BASE_URL}/payrolls/generate`,
    downloadPayroll: `${API_BASE_URL}/payrolls/download`,
}

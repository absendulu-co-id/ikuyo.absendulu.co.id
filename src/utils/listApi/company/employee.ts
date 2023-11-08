import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const employee = {
    getDataEmployee: ()=> `${API_BASE_URL}/Employees`,
    getDataEmployeePagination: () => `${API_BASE_URL}/Employees`,
    postDataEmployee: `${API_BASE_URL}/Employee/AddEmployee`,
    updateDataEmployee: (id: string) => `${API_BASE_URL}/Employee/${id}`,
    deleteDataEmployee: (id: string) => `${API_BASE_URL}/Employee/${id}`,
    exportDataEmployee: () => `${API_BASE_URL}/employee/export`,
}
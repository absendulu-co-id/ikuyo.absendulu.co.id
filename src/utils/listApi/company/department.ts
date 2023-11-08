import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const department = {
    getDataDepartment: () => `${API_BASE_URL}/department/getdepartment`,
    getDataDepartmentPagination: () => `${API_BASE_URL}/department/getPagination`,
    searchDataDepartment: `${API_BASE_URL}/department/findbycontains`,
    postDataDepartment: `${API_BASE_URL}/Department/AddDepartment`,
    deleteDataDepartment: (id: string) =>  `${API_BASE_URL}/Department/${id}`,
    updateDataDepartment: (id: string) => `${API_BASE_URL}/Department/${id}`,
    exportDataDepartment: () => `${API_BASE_URL}/Department/export`,
};
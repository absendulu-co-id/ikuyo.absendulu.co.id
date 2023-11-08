import { API_BASE_URL } from "./baseUrl";

export const access = {
    postDataAccess: `${API_BASE_URL}/menu/addmenu`,
    updateDataAccess: (id: string) => `${API_BASE_URL}/menu/${id}`,
    deleteDataAccess: (id: string) => `${API_BASE_URL}/menu/${id}`,
    getDetailAccess: (id: string) => `${API_BASE_URL}/menu/${id}`,
    getDataAccessPagination: () => `${API_BASE_URL}/menu/getpagination`,
}
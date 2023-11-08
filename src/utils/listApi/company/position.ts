import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const position = {
    getDataPosition: () => `${API_BASE_URL}/Position/GetPosition`,
    postDataPosition: `${API_BASE_URL}/Position/AddPosition`,
    updateDataPosition: (id: string) => `${API_BASE_URL}/Position/${id}`,
    deleteDataPosition: (id: string) => `${API_BASE_URL}/Position/${id}`,
    getDataPositionPagination: () => `${API_BASE_URL}/position/getpagination`,
    exportDataPosition: () => `${API_BASE_URL}/position/export`,
}
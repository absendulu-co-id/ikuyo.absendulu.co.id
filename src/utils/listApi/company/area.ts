import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const area = {
    getDataArea : () => `${API_BASE_URL}/area/getarea`,
    postDataArea: `${API_BASE_URL}/area/addarea`,
    deleteDataArea: (id: string) => `${API_BASE_URL}/area/${id}`,
    updateDataArea: (id: string) => `${API_BASE_URL}/area/${id}`,
    getDataAreaPagination: () => `${API_BASE_URL}/area/getpagination`,
    exportDataArea: () => `${API_BASE_URL}/area/export`,
}
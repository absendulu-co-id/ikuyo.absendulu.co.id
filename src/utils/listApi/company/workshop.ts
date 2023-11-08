import { API_BASE_URL } from "@/utils/listApi/baseUrl";


export const workshop = {
    getDataWorkshop: () => `${API_BASE_URL}/Workshop/GetWorkshop`,
    getDataSearchWorkshop: (request: string) => `${API_BASE_URL}/Workshop/FindByContains/${request}`,
    postDataWorkshop: `${API_BASE_URL}/Workshop/AddWorkshop`,
    updateDataWorkshop: (id: string) => `${API_BASE_URL}/Workshop/${id}`,
    deleteDataWorkshop: (id: string) => `${API_BASE_URL}/Workshop/${id}`,
    deleteDataPosition: (id: string) => `${API_BASE_URL}/Position/${id}`,
    getDataWorkshopPagination: () => `${API_BASE_URL}/workshop/getpagination`,
    exportDataWorkshop: () => `${API_BASE_URL}/workshop/export`,
}
import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const leaveType = {
    getDataLeaveTypePagination: () => `${API_BASE_URL}/leave/getPagination`,
    getDataLeaveType: () => `${API_BASE_URL}/leave/getleave`,
    postDataLeaveType: `${API_BASE_URL}/leave/addleave`,
    updateDataLeaveType: (id: string) => `${API_BASE_URL}/leave/${id}`,
    deleteDataLeaveType: (id: string) => `${API_BASE_URL}/leave/${id}`,
    exportDataLeaveType: () => `${API_BASE_URL}/leave/export`,
}
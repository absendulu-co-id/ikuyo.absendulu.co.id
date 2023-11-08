import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const overtime = {
    getDataPaggination: `${API_BASE_URL}/approval/GetPagination`,
    getDataPagginationApprover: `${API_BASE_URL}/approval/GetPaginationApprover`,
    postRequestApprover:  `${API_BASE_URL}/approval/AddApproval`,
    postApprovalStatus: (id: string) => `${API_BASE_URL}/Approval/${id}`,
    approveAll: `${API_BASE_URL}/Approval/ApproveAll`,
    rejectAll: `${API_BASE_URL}/Approval/RejectAll`,
    approveSelected: `${API_BASE_URL}/Approval/ApproveSelectedId`,
    rejectSelected: `${API_BASE_URL}/Approval/RejectSelectedId`,
    getApprovalById: (id: string) => `${API_BASE_URL}/Approval/GetApprovalById/${id}`
}
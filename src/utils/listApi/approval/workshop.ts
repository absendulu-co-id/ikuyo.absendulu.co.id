import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const workshop = {
    approvalWorkShopGetPaggination: `${API_BASE_URL}/ApprovalWorkShop/GetPagination`,
    approvalWorkShopGetPagginationLogs: `${API_BASE_URL}/ApprovalWorkShop/GetPaginationApprovalLogs`,
    approvalWorkShopApproverGetPaggination: `${API_BASE_URL}/ApprovalWorkShop/GetPaginationApprover`,
    addDataApprovalWorkshop: `${API_BASE_URL}/ApprovalWorkShop/AddApproval`,
    approvalWorkShopGetDetails: `${API_BASE_URL}/ApprovalWorkShop/GetApprovalDetails`,
    approveRequestWorkShop: (id: string) => `${API_BASE_URL}/ApprovalWorkShop/${id}`,
    approveAllRequestWorkShop: `${API_BASE_URL}/ApprovalWorkShop/ApproveAll`,
    rejectAllRequestWorkShop: `${API_BASE_URL}/ApprovalWorkShop/RejectAll`,
    approveWorkShopById: `${API_BASE_URL}/ApprovalWorkShop/ApproveSelectedId`,
    rejectWorkShopById: `${API_BASE_URL}/ApprovalWorkShop/RejectSelectedId`
}
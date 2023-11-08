import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const reimburse = {
    approvalReimburseGetPaggination: `${API_BASE_URL}/ApprovalReimburse/GetPagination`,
    approvalReimburseGetPagginationLogs: `${API_BASE_URL}/ApprovalReimburse/GetPaginationApprovalLogs`,
    approvalReimburseApproverGetPaggination: `${API_BASE_URL}/ApprovalReimburse/GetPaginationApprover`,
    addDataApprovalReimburse: `${API_BASE_URL}/ApprovalReimburse/AddApproval`,
    approvalReimburseGetDetail: `${API_BASE_URL}/ApprovalReimburse/GetApprovalDetails`,
    approveRequestReimburse: (id: string) => `${API_BASE_URL}/ApprovalReimburse/${id}`,
    approveAllRequestReimburse: `${API_BASE_URL}/ApprovalReimburse/ApproveAll`,
    rejectAllRequestReimbure: `${API_BASE_URL}/ApprovalReimburse/RejectAll`,
    approveReimburseById: `${API_BASE_URL}/ApprovalReimburse/ApproveSelectedId`,
    rejectReimburseById: `${API_BASE_URL}/ApprovalReimburse/RejectSelectedId`
}
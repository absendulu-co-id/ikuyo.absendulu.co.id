import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const onleave = {
    getDataOnleave: (companyID: string) => `${API_BASE_URL}/onleave/getonleave/${companyID}`,
    getDataApproal: () => `${API_BASE_URL}/approval/getpagination`,
    getDataOnleavePaggination: `${API_BASE_URL}/ApprovalLeave/GetPagination`,
    getDataApproverOnleavePaggination: `${API_BASE_URL}/ApprovalLeave/GetPaginationApprover`,
    addDataApprovalLeave: `${API_BASE_URL}/ApprovalLeave/AddApproval`,
    getDataOnleavePagginationLogs: `${API_BASE_URL}/ApprovalLeave/GetPaginationApprovalLogs`,
    getDataApprovalOnleaveDetails: `${API_BASE_URL}/ApprovalLeave/GetApprovalDetails`,
    getDataApprovalOnleaveRemaining: `${API_BASE_URL}/ApprovalLeave/GetRemaining`,
    approveRequestLeave: (id: string) =>  `${API_BASE_URL}/ApprovalLeave/${id}`,
    approveAllRequestLeave: `${API_BASE_URL}/ApprovalLeave/ApproveAll`,
    rejectAllRequestLeave: `${API_BASE_URL}/ApprovalLeave/RejectAll`,
    approveLeaveById: `${API_BASE_URL}/ApprovalLeave/ApproveSelectedId`,
    rejectLeaveById: `${API_BASE_URL}/ApprovalLeave/RejectSelectedId`
}
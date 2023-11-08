import { API, axiosRequest } from "@/utils/api";

export async function getDataReimbursePagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.reimburse.approvalReimburseGetPaggination,
        params
    })

    return response?.data || null;
}

export async function getDataApproverReimbursePagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.reimburse.approvalReimburseApproverGetPaggination,
        params
    })

    return response?.data || null;
}

export async function addDataApprovalReimburse(payload: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.reimburse.addDataApprovalReimburse,
        payload
    })

    return response?.data || null;
}

export async function approveRequestReimburse(id: string, payload: {status: string, note: string}) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.approval.reimburse.approveRequestReimburse(id),
        payload
    })

    return response?.data || null;
}

export async function getDataApprovalReimburseDetail(id: string) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.reimburse.approvalReimburseGetDetail,
        params: {
            id
        }
    })

    return response?.data || null;
}

export async function approveAllRequestReimburse(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.reimburse.approveAllRequestReimburse,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function rejectAllRequestReimburse(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.reimburse.rejectAllRequestReimbure,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function approveReimburseById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.reimburse.approveReimburseById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

export async function rejectReimburseById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.reimburse.rejectReimburseById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

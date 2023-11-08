import { API, axiosRequest } from "@/utils/api";

export async function getDataOnleave(companyID: string) {
    const response = await axiosRequest({
        url: API.approval.onleave.getDataOnleave(companyID),
        method: 'GET',
    })

    return response?.data || null;
}

export async function getDataApproval() {
    const response = await axiosRequest({
        url: API.approval.onleave.getDataApproal(),
        method: 'GET',
    })

    return response?.data || null;
}

export async function getDataOnleaveOnleavePagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.onleave.getDataOnleavePaggination,
        params
    })

    return response?.data || null;
}

export async function getDataApproverOnleavePagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.onleave.getDataApproverOnleavePaggination,
        params
    })

    return response?.data || null;
}

export async function addDataApprovalOnleave(payload: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.onleave.addDataApprovalLeave,
        payload
    })

    return response?.data || null;
}

export async function approveRequestOnleave(id: string, payload: {status: string, note: string}) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.approval.onleave.approveRequestLeave(id),
        payload
    })

    return response?.data || null;
}

export async function getDataApprovalOnleaveDetail(id: string) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.onleave.getDataApprovalOnleaveDetails,
        params: {
            id
        }
    })

    return response?.data || null;
}

export async function getDataApprovalOnleaveRemaining(type: string) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.onleave.getDataApprovalOnleaveRemaining,
        params: {
            Leavename: type
        }
    })

    return response?.data || null;
}

export async function approveAllRequestOnleave(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.onleave.approveAllRequestLeave,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function rejectAllRequestOnleave(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.onleave.rejectAllRequestLeave,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function approveOnleaveById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.onleave.approveLeaveById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

export async function rejectOnleaveById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.onleave.rejectLeaveById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

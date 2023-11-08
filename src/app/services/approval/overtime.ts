import { GetDataApproval } from "@/interface/approval";
import { API, axiosRequest } from "@/utils/api";

export async function getDataApprovalPagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.overtime.getDataPaggination,
        params
    })

    return response?.data || null;
}

export async function getDataApproverPagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.overtime.getDataPagginationApprover,
        params
    })

    return response?.data || null;
}

export async function postDataApproval(payload: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.overtime.postRequestApprover,
        payload
    })

    return response?.data || null;
}

export async function postApprovalStatus(id: string, payload: {status: string, note: string}) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.approval.overtime.postApprovalStatus(id),
        payload
    })

    return response?.data || null;
}

export async function approveAll(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.overtime.approveAll,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function rejectAll(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.overtime.rejectAll,
        params: {
            note: note
        }
    })

    return response?.data || null;
}

export async function approveSelected(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.overtime.approveSelected,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

export async function rejectSelected(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.overtime.rejectSelected,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

export async function getApprovalById(id:string) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.overtime.getApprovalById(id)
    })

    return response?.data || null;
}
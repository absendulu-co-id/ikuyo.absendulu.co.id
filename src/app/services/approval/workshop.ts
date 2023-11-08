import { API, axiosRequest } from "@/utils/api";

export async function getDataWorkShopPagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.workshop.approvalWorkShopGetPaggination,
        params
    })

    return response?.data || null;
}

export async function getDataApproverWorkShopPagination(params: object) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.workshop.approvalWorkShopApproverGetPaggination,
        params
    })

    return response?.data || null;
}

export async function addDataApprovalWorkShop(payload: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.workshop.addDataApprovalWorkshop,
        payload
    })

    return response?.data || null;
}

export async function approveRequestWorkShop(id: string, payload: {status: string, note: string}) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.approval.workshop.approveRequestWorkShop(id),
        payload
    })

    return response?.data || null;
}

export async function getDataApprovalWorkShopDetail(id: string) {
    const response = await axiosRequest({
        method: 'GET',
        url: API.approval.workshop.approvalWorkShopGetDetails,
        params: {
            id
        }
    })

    return response?.data || null;
}

export async function approveAllRequestWorkShop(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.workshop.approveAllRequestWorkShop,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function rejectAllRequestWorkShop(note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.workshop.rejectAllRequestWorkShop,
        params: {
            note
        }
    })

    return response?.data || null;
}

export async function approveWorkShopById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.workshop.approveWorkShopById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

export async function rejectWorkShopById(payload: Array<string>, note: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.approval.workshop.rejectWorkShopById,
        payload: {
            id: payload,
            note: note
        }
    })

    return response?.data || null;
}

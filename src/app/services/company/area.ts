import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostArea {
    areaCode: string;
    areaName: string;
}

export async function getDataArea() {
    const response = await axiosRequest({
        url: API.company.area.getDataArea(),
        method: 'GET',
    })

    return response?.data || null;
}


export async function getDataAreaPagination(params: object) {
    const response = await axiosRequest({
        url: API.company.area.getDataAreaPagination(),
        method: 'GET',
        params,
    })

    return response?.data || null;
}


export async function exportDataArea(payload: Array<object>) {
    const response = await axiosRequest({
        url: API.company.area.exportDataArea(),
        method: 'POST',
        payload,
        responseType: 'blob',
    })

    downloadFile(response);
}

export async function postDataArea(payload: PropsPostArea) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.company.area.postDataArea,
        payload
    })

    return response?.data || null;
}

export async function deleteDataArea(id: string) {
    const response = await axiosRequest({
        method: 'DELETE',
        url: API.company.area.deleteDataArea(id),
    })

    return response?.data || null;
}

export async function updateDataArea(id:string, payload: PropsPostArea) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.company.area.updateDataArea(id),
        payload
    })

    return response?.data || null;
}
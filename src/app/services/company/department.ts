import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

export async function getDataDepartment() {
    const response = await axiosRequest({
        url: API.company.department.getDataDepartment(),
        method: 'GET'
    })

    return response?.data || null;
}

interface PropsPostDepartment {
    departmentCode: string;
    departmentName: string;
    createdBy?: string;
    updatedBy?: string;
}

export async function postDataDepartment(payload: PropsPostDepartment) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.company.department.postDataDepartment,
        payload
    })

    return response?.data || null;
}

export async function deleteDataDepartment(id: string) {
    const response = await axiosRequest({
        method: 'DELETE',
        url: API.company.department.deleteDataDepartment(id),
    })

    return response?.data || null;
}

export async function getDataDepartmentPagination(params: object) {
    const response = await axiosRequest({
        url: API.company.department.getDataDepartmentPagination(),
        method: 'GET',
        params,
    })

    return response?.data || null;
}
export async function updateDataDepartment(id:string, payload: PropsPostDepartment) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.company.department.updateDataDepartment(id),
        payload: payload
    })

    return response?.data || null;
}

export async function exportDataDepartment(payload: Array<object>) {
    const response = await axiosRequest({
        url: API.company.department.exportDataDepartment(),
        method: 'POST',
        payload,
        responseType: 'blob',
    })

    downloadFile(response);
}
import { API, axiosRequest } from "@/utils/api";

export async function getPositionByDepartment(payload: any) {
    const response = await axiosRequest({
        url: API.workflow.getPositionByDepartment(payload),
        method: 'GET',
        payload
    })

    return response?.data || null;
}

export async function postDataWorkflow(payload: any) {
    const response = await axiosRequest({
        url: API.workflow.postDataWorkflow,
        method: 'POST',
        payload
    })

    return response?.data || null;
}

export async function getDataWorkflowPagination(params: object) {
    const response = await axiosRequest({
        url: API.workflow.getDataWorkflowPagination(),
        method: 'GET',
        params,
    })

    return response?.data || null;
}

export async function deleteDataWorkflow(id: string) {
    const response = await axiosRequest({
        method: "DELETE",
        url: API.workflow.deleteDataWorkFlow(id),
    });

    return response?.data || null;
}

export async function updateDataWorkflow(id:string, payload: any) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.workflow.updateDataWorkflow(id),
        payload
    })

    return response?.data || null;
}

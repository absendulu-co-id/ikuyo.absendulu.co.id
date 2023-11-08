import { API_BASE_URL } from "./baseUrl";

export const workflow = {
    getPositionByDepartment: (id: string) => `${API_BASE_URL}/position/getpositionbydepartment/${id}`,
    postDataWorkflow: `${API_BASE_URL}/workflow/addworkflow`,
    getDataWorkflowPagination: () => `${API_BASE_URL}/workflow/getpagination`,
    deleteDataWorkFlow: (id: string) => `${API_BASE_URL}/workflow/${id}`,
    updateDataWorkflow: (id: string) => `${API_BASE_URL}/workflow/${id}`
}
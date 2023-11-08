import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostPosition {
    positionCode: string;
    positionName: string;
    departmentId: string;
    departmentCode: string;
    departmentName: string;
    createdBy?: string;
    updatedBy?: string;
  }
  
  export async function getDataPosition() {
    const response = await axiosRequest({
      url: API.company.position.getDataPosition(),
      method: "GET",
    });
  
    return response?.data || null;
  }
  
  export async function getDataPositionPagination(params: object) {
    const response = await axiosRequest({
      url: API.company.position.getDataPositionPagination(),
      method: "GET",
      params,
    });
  
    return response?.data || null;
  }
  
  
  export async function postDataPosition(payload: PropsPostPosition) {
    const response = await axiosRequest({
      method: "POST",
      url: API.company.position.postDataPosition,
      payload,
    });
  
    return response?.data || null;
  }
  
  export async function updateDataPosition(
    id: string,
    payload: PropsPostPosition
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.company.position.updateDataPosition(id),
      payload: payload,
    });
  
    return response?.data || null;
  }
  
  export async function exportDataPosition(payload: Array<object>) {
    const response = await axiosRequest({
      url: API.company.position.exportDataPosition(),
      method: "POST",
      payload,
      responseType: "blob",
    });
  
    downloadFile(response);
  }
  
  
  export async function deleteDataPosition(id: string) {
    const response = await axiosRequest({
      method: "DELETE",
      url: API.company.position.deleteDataPosition(id),
    });
  
    return response?.data || null;
  }
  
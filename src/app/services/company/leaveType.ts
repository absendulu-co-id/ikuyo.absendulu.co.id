import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostLeaveType {
    leaveCode: string;
    leaveName: string;
    totalDays: number;
    leaveMoreThanBalance: boolean;
  }

export async function getDataLeavePagination(params: object) {
    const response = await axiosRequest({
      url: API.company.leaveType.getDataLeaveTypePagination(),
      method: "GET",
      params,
    });
  
    return response?.data || null;
  }
  
  export async function getDataLeaveType() {
    const response = await axiosRequest({
      url: API.company.leaveType.getDataLeaveType(),
      method: "GET",
    });
  
    return response?.data || null;
  }

  export async function postDataLeaveType(payload: PropsPostLeaveType) {
    const response = await axiosRequest({
      method: "POST",
      url: API.company.leaveType.postDataLeaveType,
      payload,
    });
  
    return response?.data || null;
  }

  export async function updateDataLeaveType(
    id: string,
    payload: PropsPostLeaveType
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.company.leaveType.updateDataLeaveType(id),
      payload,
    });
  
    return response?.data || null;
  }
  

  export async function deleteDataLeaveType(id: string) {
    const response = await axiosRequest({
      method: "DELETE",
      url: API.company.leaveType.updateDataLeaveType(id),
    });
  
    return response?.data || null;
  }
  
  export async function exportDataLeaveType(payload: Array<object>) {
    const response = await axiosRequest({
      url: API.company.leaveType.exportDataLeaveType(),
      method: "POST",
      payload,
      responseType: "blob",
    });
  
    downloadFile(response);
  }
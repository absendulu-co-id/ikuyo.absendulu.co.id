import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostEmployee {
    employeeId: string;
    employeeName: string;
    departmentId: string
    departmentCode: string;
    departmentName: string;
    positionCode: string;
    positionName: string;
    shiftId: string;
    shiftName: string;
    employeeTypeCode?: string;
    employeeTypeName?: string;
    companyCode?: string
    companyName?: string
    pic?: string
    gender: string
    birthday?: Date
    phoneNumber: string
    address: string
    postalCode?: string
    national: string
    religion: string
    emailAddress: string
    profilePhoto?: string
    workTypeId?: string
    workTypeName?: string
    areaId: string | Array<string>
    areaCode: string | Array<string>
    areaName: string | Array<string>
    isResign?: boolean
    joinDate?: Date
    resignDate?: Date
    effectiveStart?: Date
    effectiveEnd?: Date
    accountTypeId?: number
    createdBy?: string
    createdAt?: Date;
    updatedBy?: string
    updatedAt?: Date;
}

export async function getDataEmployee() {
    const response = await axiosRequest({
      url: API.company.employee.getDataEmployee(),
      method: "GET",
    });
  
    return response?.data || null;
}

export async function getDataEmployeePagination(params: object) {
    const response = await axiosRequest({
        url: API.company.employee.getDataEmployeePagination(),
        method: 'GET',
        params,
    })

    return response?.data || null;
}

  
export async function postDataEmployee(payload: PropsPostEmployee) {
const response = await axiosRequest({
    method: "POST",
    url: API.company.employee.postDataEmployee,
    payload,
});

return response?.data || null;
}

export async function deleteDataEmployee(id: string) {
const response = await axiosRequest({
    method: "DELETE",
    url: API.company.employee.deleteDataEmployee(id),
});
return response?.data || null;
}
  
  export async function updateDataEmployee(
    id: string,
    payload: PropsPostEmployee
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.company.employee.updateDataEmployee(id),
      payload: payload,
    });
    return response?.data || null;
}

export async function exportDataEmployee(payload: Array<object>) {
    const response = await axiosRequest({
        url: API.company.employee.exportDataEmployee(),
        method: 'POST',
        payload,
        responseType: 'blob',
    })    
    downloadFile(response);
}
export async function getDataSubscribe() {
    const response = await axiosRequest({
        url: API.subscribe.getDataSubscribe(),
        method: 'GET',
    })

    return response?.data || null;
}

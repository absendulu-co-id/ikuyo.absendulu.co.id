import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

export async function getAttendance() {
  const response = await axiosRequest({
    url: API.attendance.getDataAttendance(),
    method: 'GET'
  })
  
  return response?.data || null
}

export async function getDataAttendancePagination(params: object) {
  const response = await axiosRequest({
    url: API.attendance.getDataAttendance(),
    method: 'GET',
    params
  })
  
  return response?.data || null
}

export async function exportDataAttendance(payload: Array<object>) {
  const response = await axiosRequest({
    url: API.attendance.exportDataAttendance(),
    method: 'POST',
    payload,
    responseType: 'blob'
  })
  downloadFile(response)
}
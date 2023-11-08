import { API, axiosRequest } from "@/utils/api"
import { downloadFile } from "@/utils/general"

interface PropsPostShift {
  shiftCode: string
  shiftName: string
  startWorkTime: string
  endWorkTime: string
  startBreakTime: string
  endBreakTime: string
  maximumLate: string
  workDays: Array<string>
  company?: string
  companyId?: string
  createdBy?: string
  updatedBy?: string
}

export async function getDataShift() {
  const response = await axiosRequest({
    url: API.company.shift.getDataShift(),
    method: 'GET',
  })
  return response?.data || null
}

export async function getDataShiftPagination(params:object) {
  const response = await axiosRequest({
    url: API.company.shift.getDataShiftPagination(),
    method: 'GET',
    params,
  })
  return response?.data || null
  
}

export async function postDataShift(payload: PropsPostShift) {
  const response = await axiosRequest({
    url: API.company.shift.postDataShift(),
    method: 'POST',
    payload
  })
  return response?.data || null  
}

export async function updateDataShift(id: string, payload: PropsPostShift) {
  const response = await axiosRequest({
    url: API.company.shift.updateDataShift(id),
    method: 'PUT',
    payload: payload
  })
  return response?.data || null
}

export async function deleteDataShift(id: string) {
  const response = await axiosRequest({
    url: API.company.shift.deleteDataShift(id),
    method: 'DELETE'
  })
  return response?.data || null
}

export async function exportDataShift(payload: Array<object>) {
  const response = await axiosRequest({
    url: API.company.shift.exportDataShift(),
    method: 'POST',
    payload,
    responseType: 'blob'
  })
  downloadFile(response)
}
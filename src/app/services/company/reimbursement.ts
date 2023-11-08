import { API, axiosRequest } from "@/utils/api"
import { downloadFile } from "@/utils/general"

interface PropsPostReimbursement {
  reimbursementCode: string
  reimbursementName: string
  totalAmount: number
  company?: string
  companyId?: string
  createdBy?: string
  updatedBy?: string
}

export async function getDataReimbursement() {
  const response = await axiosRequest({
    url: API.company.reimbursement.getDataReimbursement(),
    method: 'GET',
  })
  return response?.data || null
}

export async function getDataReimbursementPagination(params:object) {
  const response = await axiosRequest({
    url: API.company.reimbursement.getDataReimbursementPagination(),
    method: 'GET',
    params,
  })
  return response?.data || null
  
}

export async function postDataReimbursement(payload: PropsPostReimbursement) {
  const response = await axiosRequest({
    url: API.company.reimbursement.postDataReimbursement(),
    method: 'POST',
    payload
  })
  return response?.data || null  
}

export async function updateDataReimbursement(id: string, payload: PropsPostReimbursement) {
  const response = await axiosRequest({
    url: API.company.reimbursement.updateDataReimbursement(id),
    method: 'PUT',
    payload: payload
  })
  return response?.data || null
}

export async function deleteDataReimbursement(id: string) {
  const response = await axiosRequest({
    url: API.company.reimbursement.deleteDataReimbursement(id),
    method: 'DELETE'
  })
  return response?.data || null
}

export async function exportDataReimbursement(payload: Array<object>) {
  const response = await axiosRequest({
    url: API.company.reimbursement.exportDataReimbursement(),
    method: 'POST',
    payload,
    responseType: 'blob'
  })
  downloadFile(response)
}
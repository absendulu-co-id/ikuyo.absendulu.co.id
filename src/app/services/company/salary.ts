import { API, axiosRequest } from "@/utils/api";

interface PropsPostSalaries{
  employeeId: number,
  employeeName: string,
  earning: number,
  currency: string,
  bankName: string,
  bankAccount: string,
  paymentMethod: string,
  bpjsEmployeeNo: string,
  bpjsEmployeeStartPay?: Date,
  bpjsEmployeeEndPay?: Date,
  bpjsHealthCareNo: string,
  bpjsHealthCareStartPay?: Date,
  bpjsHealthCareEndPay?: Date,
  npwpNo: string,
  taxEndPay?: Date,
  taxStartPay?: Date,
  martialAndDependents: string
}

export async function getDataSalaries() {
  const response = await axiosRequest({
    url: API.company.salaries.getDataSalaries(),
    method: "GET",
  });

  return response?.data || null;
}

export async function getDetailSalaries(id: number) {
  const response = await axiosRequest({
    url: API.company.salaries.getDetailSalaries(id),
    method: "GET",
  });

  return response?.data || null;
}

export async function postDataSalaries(payload: PropsPostSalaries) {
const response = await axiosRequest({
  method: "POST",
  url: API.company.salaries.postDataSalaries,
  payload,
});

return response?.data || null;
}

export async function updateDataSalaries(
  id: number,
  payload: PropsPostSalaries
) {
  const response = await axiosRequest({
    method: "PUT",
    url: API.company.salaries.updateDataSalaries(id),
    payload: payload,
  });
  return response?.data || null;
}


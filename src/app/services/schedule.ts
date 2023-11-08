import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

export async function getScheduleEmployee(params: any) {
    const response = await axiosRequest({
      url: API.schedule.getDataSchedule(),
      method: "GET",
      params
    });
  
    return response?.data.data || null;
}

export async function getAllListSchedule(params: any) {
  const response = await axiosRequest({
    url: API.schedule.getAllListSchedule(),
    method: "GET",
    params
  });

  return response?.data || null;
}

export async function getSchedulePagination(params: any) {
  const response = await axiosRequest({
    url: API.schedule.getScheduleByDate(),
    method: "GET",
    params
  });

  return response?.data || null;
}

export async function exportDataListSchedule(payload: Array<object>) {
  const response = await axiosRequest({
      url: API.schedule.exportDataSchedule(),
      method: 'POST',
      payload,
      responseType: 'blob',
  })

  downloadFile(response);
}
import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostWorkshop {
    workshopCode: string;
    workshopName: string;
    description: string;
  }
  
  export async function getDataWorkshop() {
    const response = await axiosRequest({
      url: API.company.workshop.getDataWorkshop(),
      method: "GET",
    });
  
    return response?.data || null;
  }
  
  export async function postDataWorkshop(payload: PropsPostWorkshop) {
    const response = await axiosRequest({
      method: "POST",
      url: API.company.workshop.postDataWorkshop,
      payload,
    });
  
    return response?.data || null;
  }
  
  export async function updateDataWorkshop(
    id: string,
    payload: PropsPostWorkshop
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.company.workshop.updateDataWorkshop(id),
      payload: payload,
    });
  
    return response?.data || null;
  }
  
  export async function deleteDataWorkshop(id: string) {
    const response = await axiosRequest({
      method: "DELETE",
      url: API.company.workshop.deleteDataWorkshop(id),
    });
  
    return response?.data || null;
  }
  
  export async function getDataWorkshopPagination(params: object) {
    const response = await axiosRequest({
      url: API.company.workshop.getDataWorkshopPagination(),
      method: "GET",
      params,
    });
  
    return response?.data || null;
  }
  
  export async function exportDataWorkshop(payload: Array<object>) {
    const response = await axiosRequest({
      url: API.company.workshop.exportDataWorkshop(),
      method: "POST",
      payload,
      responseType: "blob",
    });
  
    downloadFile(response);
  }
  
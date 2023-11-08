import { API, axiosRequest } from "@/utils/api";

interface Access {
  mainMenu: string,
  subMenu: Array<string>,
  action: Array<string>,
}

interface PropsPostAccess {
  positionId: string,
  access: Access[]
}

export async function getAccessDetail(id: string) {
    const response = await axiosRequest({
      url: API.access.getDetailAccess(id),
      method: "GET",
    });
  
    return response?.data || null;
}

export async function getDataAccessPagination() {
    const response = await axiosRequest({
        url: API.access.getDataAccessPagination(),
        method: 'GET',
    })

    return response?.data || null;
}

  
export async function postDataAccess(payload: PropsPostAccess) {
const response = await axiosRequest({
    method: "POST",
    url: API.access.postDataAccess,
    payload,
});

return response?.data || null;
}

export async function deleteDataAccess(id: string) {
const response = await axiosRequest({
    method: "DELETE",
    url: API.access.deleteDataAccess(id),
});
return response?.data || null;
}
  
  export async function updateDataAccess(
    id: string,
    payload: PropsPostAccess
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.access.updateDataAccess(id),
      payload: payload,
    });
    return response?.data || null;
}

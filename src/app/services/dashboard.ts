import { API, axiosRequest } from "@/utils/api";

export async function getDataDashboard() {
    const response = await axiosRequest({
        url: API.dashboard.getDataDashboard(),
        method: 'GET',
    })
    return response?.data || null;
}

export async function getWebDashboard() {
    const response = await axiosRequest({
        url: API.dashboard.getWebDashboard,
        method: 'GET',
    })
    return response?.data || null;
}

export async function changeProfilePhoto(payload: any) {
    const response = await axiosRequest({
        url: API.dashboard.changeProfilePicture,
        method: 'PUT',
        payload: {
            url: payload
        }
    })
    return response?.data || null;
}
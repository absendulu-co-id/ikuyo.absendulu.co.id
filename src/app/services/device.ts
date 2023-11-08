import { API, axiosRequest } from "@/utils/api";

export async function getDataDevice(params: any) {
    const response = await axiosRequest({
        url: API.device.getDataDevice(),
        method: 'GET',
        params
    })
    return response?.data || null;
}

interface PropsEditDevice {
    areaId: string;
    deviceAlias: string;
}

export async function updateDataDevice(id: number, payload: PropsEditDevice) {
    const response = await axiosRequest({
        url: API.device.updateDataDevice(id),
        method: 'PUT',
        payload
    })

    return response?.data || null;
}

export async function deleteDataDevice(id: number) {
    const response = await axiosRequest({
        url: API.device.updateDataDevice(id),
        method: 'DELETE'
    })

    return response?.data || null;
}

export async function syncDataDevice(payload: Array<object>) {
    const response = await axiosRequest({
        url: API.device.syncDataDevice(),
        method: 'POST',
        payload
    })

    return response?.data || null;
}

export async function syncDataBio(id: number) {
    const response = await axiosRequest({
        url: API.device.syncDataBio(id),
        method: 'POST',
    })

    return response?.data || null;
}

export async function deviceReboot(id: number) {
    const response = await axiosRequest({
        url: API.device.deviceReboot(id),
        method: 'POST',
    })

    return response?.data || null;
}

export async function doorUnlock(id: number) {
    const response = await axiosRequest({
        url: API.device.doorUnlock(id),
        method: 'POST',
    })

    return response?.data || null;
}

export async function disableAlarm(id: number) {
    const response = await axiosRequest({
        url: API.device.unalarm(id),
        method: 'POST',
    })

    return response?.data || null;
}
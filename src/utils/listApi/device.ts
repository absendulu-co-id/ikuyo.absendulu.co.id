import { API_BASE_URL } from "./baseUrl";

export const device = {
    getDataDevice: () => `${API_BASE_URL}/devices`,
    getDetailDevice: (id: number) => `${API_BASE_URL}/devices/${id}`,
    updateDataDevice: (id: number) => `${API_BASE_URL}/devices/${id}`,
    deleteDataDevice: (id: number) => `${API_BASE_URL}/devices/${id}`,
    syncDataDevice: () => `${API_BASE_URL}/devices/device-upload-user`,
    syncDataBio: (id: number) => `${API_BASE_URL}/devices/download-user-bio/${id}`,
    doorUnlock: (id: number) => `${API_BASE_URL}/devices/door-unlock/${id}`,
    deviceReboot: (id: number) => `${API_BASE_URL}/devices/device-reboot/${id}`,
    unalarm: (id: number) => `${API_BASE_URL}/devices/unalarm/${id}`,
}
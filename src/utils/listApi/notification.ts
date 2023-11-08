import { API_BASE_URL } from "./baseUrl";

export const notification = {
    getDataNotification: () => `${API_BASE_URL}/notification/getnotification`,
    updateDataNotification: (id: string) => `${API_BASE_URL}/notification/setnotification/${id}`,
    getDataNotificationPagination: () => `${API_BASE_URL}/notification/getpagination`,
}
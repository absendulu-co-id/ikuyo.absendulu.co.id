import { API, axiosRequest } from "@/utils/api";
import { limitArraySize } from "@/utils/general";

interface keyable {
    [key: string]: any  
  }

export async function getDataNotification() {
    const response = await axiosRequest({
        url: API.notification.getDataNotification(),
        method: 'GET',
    })

    const unreadNotifCount = response?.data?.data?.filter((list: { isRead: boolean; }) => list.isRead === false)?.length || 0;
    const maxSize = 5;
    const data = limitArraySize(response?.data?.data, maxSize) || [];

    return { unreadNotifCount, data } || null;
}

export async function updateDataNotification(id: string) {
    const response = await axiosRequest({
        url: API.notification.updateDataNotification(id),
        method: 'PUT',
    })

    return response?.data || null;
}

export async function getDataNotificationPagination(params: object) {
    const response = await axiosRequest({
        url: API.notification.getDataNotificationPagination(),
        method: 'GET',
        params
    })
    return response?.data || null;
}
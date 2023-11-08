import { API, axiosRequest } from "@/utils/api";

export async function getDataCalendar(params: any) {
    const response = await axiosRequest({
        url: API.calendar.getDataCalendar(),
        method: 'GET',
        params
    })


    return response?.data?.data || null;
}
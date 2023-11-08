import { API_BASE_URL } from "./baseUrl";

export const schedule = {
    getDataSchedule: () => `${API_BASE_URL}/schedule/GetEmployeeSchedule`,
    getScheduleByDate: () => `${API_BASE_URL}/schedule/getpagination`,
    getAllListSchedule: () => `${API_BASE_URL}/schedule/getSchedule`,
    exportDataSchedule: () => `${API_BASE_URL}/schedule/export`,
}

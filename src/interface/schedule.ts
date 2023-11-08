export interface GetDataSchedule {
    id: string,
    day: string,
    date: string,
    month: string,
    year: string,
    isSunday: boolean,
    isHoliday: boolean,
    holidayName: string | null,
    employeeName: string,
    shiftCode: string,
    shiftName: string,
    startWorkTime: string,
    endWorkTime: string,
    startBreakTime: string,
    endBreakTime: string,
    positionName: string,
    workStatus: string,
    workShift: string,
    companyId: string
}

export interface GetScheduleResponse {
    data: GetDataSchedule[];
    isError: boolean;
    message: string;
}

export interface GetScheduleByDate {
    employeName: string,
    departmentName: string,
    positionName: string,
    shiftName: string,
    clockIn: string,
    clockOut?: string,
    date: string,
    attendanceStatus: string
}

export interface GetScheduleByDateResponse {
    data: GetScheduleByDate[];
    isError: boolean;
    message: string;
    totalPages: number,
}
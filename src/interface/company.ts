
export interface GetDepartmentResoponse {
    data: GetDataDepartmentResponse[]
    isError: boolean;
    message: string;
    totalPages: number;
}
export interface GetDataDepartmentResponse {
    id : number
    departmentCode: string
    departmentName: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetLeaveTypeResponse {
    data: GetDataLeaveTypeResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}
export interface GetDataLeaveTypeResponse {
    id : number
    leaveCode: string
    leaveName: string
    totalDays: number
    leaveMoreThanBalance: boolean
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetDataEmployees {
    data: GetDataEmployee[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataEmployee {
    id: number
    employeeId: string
    employeeName: string
    departmentId: string
    departmentCode: string
    departmentName:string
    positionId: string
    positionCode: string
    positionName: string
    shiftId: string
    shiftCode: string
    shiftName: string
    employeeTypeCode: string
    employeeTypeName: string
    companyCode: string
    companyName: string
    pic: string
    gender: string
    birthday: Date;
    phoneNumber: string
    address: string
    postalCode: string
    national: string
    religion: string
    emailAddress: string
    profilePhoto: string
    workTypeId: string
    workTypeName: string
    areaId: string 
    areaCode: string 
    areaName: string
    isResign: boolean
    joinDate?: Date
    resignDate?: Date
    effectiveStart?: Date
    effectiveEnd?: Date
    accountTypeId: number
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedAt: Date
}

export interface GetDataSalaries {
    id: string
    employeeId: number
    employeeName: string
    departmentId: string
    departmentName: string
    positionId: string
    positionName: string
    earning: number
    currency: string
    bankName: string
    bankAccount: string
    paymentMethod: string
    bpjsEmployeeNo: string
    bpjsEmployeeStartPay: Date
    bpjsEmployeeEndPay: Date
    bpjsHealthCareNo: string
    bpjsHealthCareStartPay: Date
    bpjsHealthCareEndPay: Date
    npwpNo: string
    taxEndPay: Date
    taxStartPay: Date
    martialAndDependents: string
}

export interface GetSalariesResponse {
    data: GetDataSalaries[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetWorkshopResoponse {
    data: GetDataWorkshopResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataWorkshopResponse {
    id : number;
    workshopCode: string,
    workshopName: string,
    description: string,
    company: string;
    companyId: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedDate: Date;
}

export interface GetDataSubscribe{
    companyId: string,
    companyName: string,
    deviceTotal: number,
    deviceUsed: number,
    appsTotal: number,
    appsUsed: number,
    companyStartSubcribe: string,
    companyExpiredSubcribe: string,
    createdBy?: string,
    createdAt?: string,
    updatedBy?: string,
    updatedAt?: string
}

export interface GetDatasSubscribe{
    data: GetDataSubscribe[]
    isError: boolean
    message: string
}
export interface GetDataPositionResponse {
    id : number;
    positionCode: string;
    positionName: string;
    company: string;
    companyId: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedDate: Date;
    departmentName: string;
    departmentCode: string;
    departmentId: string;
}

export interface GetPositionResponse {
    data: GetDataPositionResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataShift {
    id: string
    shiftCode: string
    shiftName: string
    startWorkTime: string
    endWorkTime: string
    startBreakTime: string
    endBreakTime: string
    maximumLate: string
    workDays: Array<string>
    company?: string
    companyId?: string
    createdBy?: string
    updatedBy?: string
}

export interface GetShiftResponse {
    data: GetDataShift[]
    isError: boolean
    message: string
    totalPages: number
}

export interface GetDataReimbursement {
    id: string
    reimbursementCode: string
    reimbursementName: string
    totalAmount: number
    company?: string
    companyId?: string
    createdBy?: string
    updatedBy?: string
}

export interface GetReimbursementResponse {
    data: GetDataReimbursement[]
    isError: boolean
    message: string
    totalPages: number
}

export interface DataFormEmployee {
    id: number;
    employeeId: string;
    employeeName: string;
    departmentId: string;
    departmentCode: string;
    departmentName: string;
    positionId: string;
    positionCode: string;
    positionName: string;
    shiftId: string;
    shiftName: string;
    employeeTypeCode: string;
    employeeTypeName: string;
    pic: string;
    gender: string;
    birthday: Date;
    phoneNumber: string;
    address: string;
    postalCode: string;
    national: string;
    religion: string;
    emailAddress: string;
    earning: number;
    currency: string;
    bankName: string;
    bankAccount: string;
    paymentMethod: string;
    bpjsEmployeeNo: string;
    bpjsEmployeeStartPay: Date;
    bpjsEmployeeEndPay: Date;
    bpjsHealthCareNo: string;
    bpjsHealthCareStartPay: Date;
    bpjsHealthCareEndPay: Date;
    npwpNo: string;
    taxStartPay: Date;
    taxEndPay: Date;
    profilePhoto: string;
    workTypeId: string;
    workTypeName: string;
    areaCode: string;
    areaName: string;
    isResign: boolean;
    joinDate: Date;
    resignDate: Date;
    effectiveStart: Date;
    effectiveEnd: Date;
    accountTypeId: number;
    createdBy: string
}
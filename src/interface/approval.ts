
export interface GetOnleaveResponse {
    data: GetDataOnleaveResponse[];
    isError: boolean;
    message: string;
}
export interface GetDataOnleaveResponse {
    id : number
    onLeaveCode: string
    onLeaveName: string
    unit: string
    total: number
    company: string
    companyId: string,
    createdBy: string,
    createdAt: Date,
    updatedBy: string,
    updatedDate: Date
}

export interface GetWorkshopResponse {
    data: GetDataWorkshopResponse[];
    isError: boolean;
    message: string;
}

export interface GetDataWorkshopResponse {
    id: string
    workshopCode: string
    workshopName: string
    unit: string
    total: number
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

interface GetProperties {
    approver: Array<string>,
    currentApprovalName: string,
    nextApprovalName: string | null,
    document: string | null,
    fromDate: string | null,
    toDate: string,
    total: number,
    note: string,
    status: string | null,
}

export interface GetDataApproval {
    id: string,
    companyId: string,
    approvalType: string,
    userAccountId: string,
    username: string,
    employeeId: number,
    currentApprover: string | null,
    nextApprover: string | null,
    properties: GetProperties,
}

export interface GetApprovalResponse {
    data: GetDataApproval[];
    isError: boolean;
    message: string;
}

export interface GetApprovalOvertimeResoponse {
    data: GetDataApproval[]
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataApproval {
    id: string;
    companyId: string;
    approvalType: string;
    userAccountId: string;
    username: string;
    employeeId: number;
    currentApprover: number;
    nextApprover: number;
    properties: GetProperties;
    createdAt: string;
}
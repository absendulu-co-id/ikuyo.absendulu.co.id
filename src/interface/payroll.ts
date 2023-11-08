export interface GetPayrollResponse {
    data: GetDataPayrollResponse[]
    message: string;
    status: string;
}

export interface GetDataPayrollOptionsResponse {
    companyId: string;
    createdAt: string;
    createdBy: string;
    id: string;
    positionId: string;
    properties: Object;
    updatedAt: Date;
    updatedBy: string;
    position: string;
    department: string;
}

export interface GetDataPayrollResponse {
    department: string;
    options: GetDataPayrollOptionsResponse[];
}
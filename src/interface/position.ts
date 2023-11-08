export interface GetDataPositionResponse {
    id : number
    positionCode: string
    positionName: string
    departmentName: string
    departmentCode: string
    departmentId: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetPositionResponse {
    data: GetDataPositionResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}
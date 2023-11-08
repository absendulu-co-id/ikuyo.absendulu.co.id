export interface GetDataAreaResponse {
    id: string
    areaCode: string
    areaName: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetAreaResponse {
    data: GetDataAreaResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}
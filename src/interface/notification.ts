export interface GetDataNotificationResponse {
    id: string;
    header: string;
    title: string;
    message: string;
    userId: string;
    companyId: string;
    isRead: boolean;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}

interface GetAccess {
    mainMenu: string,
    subMenu: Array<string>,
    action: Array<string>,
}
  
export interface GetDataAccess {
    positionId: string,
    access: GetAccess[]
}

export interface GetAccessResponse {
    data: GetDataAccess[];
    isError: boolean;
    message: string;
    totalPages: number;
}
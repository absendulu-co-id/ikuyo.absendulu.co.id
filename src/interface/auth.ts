export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    name: string;
}

export interface RegisterRequest {
    userName: string,
    fullname: string,
    email: string,
    password: string,
    role: string,
    accountTypeId: number,
    companyId?: string,
    companyName?: string,
    isActive?: number,
    createdBy?: string,
    createdAt?: string,
    updatedBy?: string,
    updatedDate?: string;
}

export interface ResetEmailPayload {
    email:string
}

export interface ResetPinPayload {
    pin: string;
    password: string
}


export interface RegisterResponse {
    status: boolean
}
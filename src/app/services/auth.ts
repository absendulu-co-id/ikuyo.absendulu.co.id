import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetEmailPayload, ResetPinPayload } from "@/interface/auth";
import { API, axiosRequest } from "@/utils/api";

export async function login(payload: LoginRequest) {
    
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.login,
        payload
    })

    return response?.data || null;

}

export async function logout() {
    
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.logOut
    })

    return response?.data || null;

}

export async function register(payload: RegisterRequest) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.register,
        // url: `https://172.16.100.234:7259/users/register`,
        payload
    })

    return response?.data || null;
}

export async function changePassword(payload: string) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.changePassword,
        params: {
            Password: payload
        }
    })

    return response?.data || null;
}

export async function resetPasswordEmail(payload: ResetEmailPayload) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.resetPassword,
        payload
    })

    return response?.data || null;
}

export async function resetPasswordPin(payload: ResetPinPayload) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.resetPasswordPin,
        payload
    })

    return response?.data || null;
}

export async function changeProfilePicture(payload: string) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.auth.changeProfilePicture,
        payload
    })

    return response?.data || null;
}
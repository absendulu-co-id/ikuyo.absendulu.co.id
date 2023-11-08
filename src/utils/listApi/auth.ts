import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const auth =  {
    login: `${API_BASE_URL}/auth/login`,
    logOut: `${API_BASE_URL}/auth/logout`,
    register: `${API_BASE_URL}/users/register`,
    resetPassword: `${API_BASE_URL}/Auth/ResetPassword`,
    resetPasswordPin: `${API_BASE_URL}/Auth/ResetPasswordPIN`,
    changePassword: `${API_BASE_URL}/Auth/ChangePassword`,
    changeProfilePicture: `${API_BASE_URL}/Employee/ChangeProfilePicture`,
}
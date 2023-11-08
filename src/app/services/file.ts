import { API, axiosRequest } from "@/utils/api";

export async function postUploadIcon(payload: any, contentType: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.file.postUploadIcon,
        payload,
        contentType,
    });

    return response?.data || null;
}

export async function postUploadData(payload: any) {
    const formData = new FormData();
    formData.append("file", payload);

    const response = await axiosRequest({
        method: 'POST',
        url: API.file.postFileData,
        payload: formData,
        contentType: 'multipart/form-data'
    });

    return response || null;
}
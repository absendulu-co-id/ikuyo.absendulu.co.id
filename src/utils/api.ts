import axios from "axios";
import { snackBar } from "./snackbar";
import { auth } from "@/utils/listApi/auth";
import { master } from "@/utils/listApi/master";
import { company } from "@/utils/listApi/company";
import { approval } from "@/utils/listApi/approval";
import { subscribe } from "./listApi/subscribe";
import { device } from "./listApi/device";
import { workflow } from "@/utils/listApi/workflow";
import { payroll } from "@/utils/listApi/payroll";
import { attendance } from "./listApi/attendance";
import { file } from "./listApi/file";
import { notification } from "@/utils/listApi/notification";
import { dashboard } from "./listApi/dashboard";
import { calendar } from "@/utils/listApi/calendar";
import { schedule } from "@/utils/listApi/schedule";
import { access } from "@/utils/listApi/access";

export const API = {
    auth,
    master,
    company,
    approval,
    subscribe,
    device,
    workflow,
    payroll,
    attendance,
    file,
    notification,
    dashboard,
    calendar,
    access,
    schedule
}

interface PropsRequest {
    url?: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    payload?: any;
    params?: any;
    responseType?: any;
    contentType?: any;
}
export const axiosRequest = async ({
    url,
    method,
    payload,
    params,
    responseType,
    contentType
}: PropsRequest) => {
    const token = localStorage.getItem('token');

    const headerFile = {
        Authorization: `Bearer ${token || null}`,
        "Content-Type": contentType
    }

    const headerAxios = {
        Authorization: `Bearer ${token || null}`
    }
    try {
        const response = await axios(
            {
                method: method,
                url: url,
                data: payload,
                headers:  contentType ? headerFile : headerAxios,
                params,
                responseType,
            }
        );

        if (response.data.isError)
            snackBar('error', 'Oops, have a trouble')

        return response;
 
     } catch (e: any) {
        
        // if (e.response === undefined) {
        //     snackBar('error', 'Oops, have a trouble')
        // }

        if ([400].includes(e.response.status)) {
            snackBar('error', e.response.data.message)
        }
        
        if ([401, 403, 500].includes(e.response.status)) {
         
            snackBar('error', e.response.data.message);
        }
       
     }
}

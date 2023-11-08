import { API, axiosRequest } from "@/utils/api";
import { addDotSeparator } from "@/utils/general";

interface keyable {
    [key: string]: any  
  }

interface PropsPostPayroll {
    positionId: string;
    properties: object;
}

interface PropsPostDownloadPayroll {

}

export async function postDataPayroll(payload: PropsPostPayroll) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.payroll.payroll,
        payload,
    });

    return response?.data || null;
}

export async function getDataPayroll () {
    const response = await axiosRequest({
        method: 'GET',
        url: API.payroll.payroll
    });

    const payrollOpt = response?.data?.data.map((list: keyable) => {
        return { label: list.positionName, value: list.id }
    });

    const Ids = response?.data?.data?.reduce((acc, curr) => {
      acc.push(curr.id)
      return acc;
    }, []);

    const result = (response?.data?.data || []).reduce((acc: keyable, curr: keyable) => {
      const properties = curr.properties || {};
      const deductions = curr.deductions || {};
    
      const updatedCurr = {
        ...curr,
        department: curr.positionName.split("-")[0].trim(),
        position: curr.positionName.split("-")[1].trim(),
        properties: Object.entries(properties).map(([name, amount]: any) => ({
          name,
          amount: addDotSeparator(amount),
        })),
        deductions: Object.entries(deductions).map(([name, amount]: any) => ({
          name,
          amount: addDotSeparator(amount),
        })),
      };
    
      if (!acc[updatedCurr.department]) {
        acc[updatedCurr.department] = [];
      }
      acc[updatedCurr.department].push(updatedCurr);
    
      return acc;
    }, {});
    
    const data =  Object.entries(result).map(([department, options]) => ({
      department,
      options,
    }));
      

      return { data, payrollOpt, Ids } || null;
}

export async function deleteDataPayroll(id: string) {
    const response = await axiosRequest({
        method: 'DELETE',
        url: API.payroll.deletePayroll(id),
    })

    return response?.data || null;
}

export async function updateDataPayroll(id:string, payload: any) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.payroll.updateDataPayroll(id),
        payload
    })

    return response?.data || null;
}

export async function postGeneratePayroll(payload: any) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.payroll.generatePayroll,
        payload,
    });

    return response?.data || null;
}

export async function postDownloadPayroll(payload: any) {
  const response = await axiosRequest({
      method: 'POST',
      url: API.payroll.downloadPayroll,
      payload,
      responseType: 'arraybuffer'
  });

  return response?.data || null;
}
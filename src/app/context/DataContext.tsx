import React, {createContext, useEffect, useState} from 'react'

import { GetAreaResponse, GetDataAreaResponse } from "@/interface/area";
import { GetDataDepartmentResponse, GetDataSalaries, GetDataShift, GetDataSubscribe, GetDatasSubscribe, GetDepartmentResoponse, GetSalariesResponse, GetShiftResponse } from "@/interface/company";
import { GetDataPositionResponse, GetPositionResponse } from "@/interface/position";
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/Actions/setLoading';
import { getDataSubscribe } from '../services/company/employee';
import { getDataPosition } from '../services/company/position';
import { getDataArea } from '../services/company/area';
import { getDataDepartment } from '../services/company/department';
import { getDataShift } from '../services/company/shift';
import { children } from '@material-tailwind/react/types/components/accordion';
import { getDataSalaries } from '../services/company/salary';

interface DataContextTypes {
    dataSubscribe: GetDataSubscribe[] | null
    dataPosition: GetDataPositionResponse[] | null
    dataArea: GetDataAreaResponse[] | null
    dataDepartment: GetDataDepartmentResponse[] | null
    dataShift: GetDataShift[] | null
    dataSalaries: GetDataSalaries[] | null
    getDataSubscribe: () => Promise<void>
    getDataPosition: () => Promise<void>
    getDataArea: () => Promise<void>
    getDataDepartment: () => Promise<void>
    getDataShift: () => Promise<void>
    getDataSalaries: () => Promise<void>
}

export const DataContext = createContext<DataContextTypes | undefined>(undefined)

export const DataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [dataSubscribe, setDataSubscribe] = useState<GetDataSubscribe[] | null>(null)
  const [dataPosition, setDataPosition] = useState<GetDataPositionResponse[] | null>(null);
  const [dataArea, setDataArea] = useState<GetDataAreaResponse[] | null>(null);
  const [dataDepartment, setDataDepartment] = useState<GetDataDepartmentResponse[] | null>(null);
  const [dataShift, setDataShift] = useState<GetDataShift[] | null>(null);
  const [dataSalaries, setDataSalaries] = useState<GetDataSalaries[] | null>(null);

  const fetchData = async() => {
    const dispatch = useDispatch()
    dispatch(setLoading(true))

    try {
        const subscribeResponse = await getDataSubscribe() as GetDatasSubscribe;
        const positionResponse = await getDataPosition() as GetPositionResponse;
        const areaResponse = await getDataArea() as GetAreaResponse;
        const departmentResponse = await getDataDepartment() as GetDepartmentResoponse;
        const shiftResponse = await getDataShift() as GetShiftResponse;
        const salariesResponse = await getDataSalaries() as GetSalariesResponse;

        setDataSubscribe(subscribeResponse.data.length > 0 ? subscribeResponse.data : null);
        setDataPosition(positionResponse.data.length > 0 ? positionResponse.data : null);
        setDataArea(areaResponse.data.length > 0 ? areaResponse.data : null);
        setDataDepartment(departmentResponse.data.length > 0 ? departmentResponse.data : null);
        setDataShift(shiftResponse.data.length > 0 ? shiftResponse.data : null);
        setDataSalaries(salariesResponse.data.length > 0 ? salariesResponse.data : null);

    } catch (error) {
    }

    dispatch(setLoading(false))
  }

  useEffect(() => {
    fetchData();
  }, [])

  const contextValue: DataContextTypes = {
    dataSubscribe,
    dataPosition,
    dataArea,
    dataDepartment,
    dataShift,
    dataSalaries,
    getDataSubscribe,
    getDataPosition,
    getDataArea,
    getDataDepartment,
    getDataShift,
    getDataSalaries,
  }

  return(
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

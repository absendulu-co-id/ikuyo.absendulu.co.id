import { useEffect, useState } from "react";
import Tour from 'reactour';
import { HeaderBack } from "@/app/components";
import { Card, Typography } from "@material-tailwind/react";
import { getDataPayroll } from "@/app/services/payroll";;
import CreatePayroll from "./components/CreatePayroll";
import ModelPayroll from "./components/ModelPayroll";
import EmployeePayroll from "@/app/pages/payroll/components/EmployeePayroll";

interface keyable {
  [key: string]: any  
}

export function Payroll() {
  const [dataPayroll, setDataPayroll] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [form, setForm] = useState({
    positionId: '',
    positionName: '',
});

const [properties, setProperties] = useState<Array<Object>>([
  {name: '', amount: ''}
]);

const [deductions, setDeductions] = useState<Array<Object>>([
  {name: '', amount: ''}
]);

const [payrollOpt, setPayrollOpt] = useState<Array<Object>>([]);
const [allPayrollIds, setAllPayrollIds] = useState<Array<String>>([]);

  const handleClickKeyTab = (id) => {
    setActiveTab(id);
  }

  const getPayrollAll = async () => {
    setIsLoading(true);

    try {
      const dataAll = await getDataPayroll();

      setDataPayroll(dataAll.data);
      setPayrollOpt(dataAll.payrollOpt);
      setAllPayrollIds(dataAll.Ids);
      
      setIsLoading(false);
    } catch (err) {
        setIsLoading(false);
    }
  }

  const [keyTab, setKeyTab] = useState<Array<Object>>([
    {
      id: 1,
      label: dataEdit ? "Edit Payroll Model" : "Create Payroll Model",
      value: "createModelPayroll",
    },
    {
      id: 2,
      label: "Payroll Model",
      value: "modelPayroll",
    },
 
    {
      id: 3,
      label: "Payroll Employee",
      value: "payrollEmployee",
    }
  ]);

  useEffect(() => {
    getPayrollAll();
  }, []);


  return (
    <>
      <div className="mt-6 flex flex-col gap-4 ">
        <Card variant="gradient" color="green" className="mb-1 p-6 flex flex-row gap-4">
          <HeaderBack />
          <Typography variant="h6" color="white">
            {'Payroll'}
          </Typography>
        </Card>

        {/* Start New Tabs */}
        <div className="flex flex-row space-between m-1">
          {keyTab.map((list: any, index: number) => {
            return (
                <div
                  key={`keyTab-header-${index}`}
                  data-testid="keyTab"
                  className={`w-full text-center cursor-pointer flex justify-center items-center ${activeTab === list.id && 'inset-0 z-10 h-11 bg-white rounded-md shadow'}`}
                  onClick={() => handleClickKeyTab(list.id)}
                >
                  <Typography variant={'h4'} color={'green'}>
                    {list.label}
                  </Typography>   
                </div>
            )
          })}
        </div>

        <div className="inset-0 z-10 h-full bg-white rounded-md shadow">
          {keyTab.map((list: any, index: number) => {
            return (
              <>
                {activeTab === list.id && (
                  <div key={`keyTab-content-${index}`}>
                    {list.id === 1 && <CreatePayroll getPayrollAll={getPayrollAll} dataEdit={dataEdit} setDataEdit={setDataEdit} form={form} setForm={setForm} properties={properties} setProperties={setProperties} deductions={deductions} setDeductions={setDeductions} />}
                    {list.id === 2 && <ModelPayroll dataPayroll={dataPayroll} getPayrollAll={getPayrollAll} setActiveTab={setActiveTab} setDataEdit={setDataEdit} setForm={setForm} setProperties={setProperties} isLoadingPayroll={isLoading} setDeductions={setDeductions} />}
                    {list.id === 3 && <EmployeePayroll payrollOpt={payrollOpt} isLoadingPayroll={isLoading} allPayrollIds={allPayrollIds} />}
                  </div>
                )}
              </>
            )
          })}
        </div>

        {/* End New Tabs */}

      </div>
    </>
  );
}

export default Payroll;

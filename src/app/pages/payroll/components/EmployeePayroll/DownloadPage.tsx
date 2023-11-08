import { useRef } from 'react';
import { 
    Card, 
    CardBody, 
    Typography,
} from "@material-tailwind/react";
import { toRupiah } from "@/utils/general";


interface keyable {
  [key: string]: any;
}

export default function DownloadPage ({ data }) {
  const targetRef = useRef();

  return (
    <Card
        className={'mt-2'}
        ref={targetRef}
        style={{ position: 'absolute', top: '-999px', left: '-9999px' }}
    >
    <CardBody className="flex flex-col px-16">
        <div className="flex flex-row justify-between mb-10">
            <Typography color={'green'} variant={'h4'}>
                Employee Payroll
            </Typography>
            <div className="flex flex-col items-end">
                <p>Gambar</p>
            </div>
        </div>


        {data && data.length > 0 ? data?.map((list: keyable, indexData: number) => {
            console.log('list gan =>', list);
            return (
                <div key={`employeePayroll-${indexData}`} className="flex flex-col border-2 border-black border-dotted p-4 mb-4">
                <div className="flex flex-row justify-between flex-wrap mb-4">
                    <div className="flex flex-row justify-start gap-5">
                        <div className="font-bold w-44">Department Name</div>
                        <div className="w-40 pl-2 border-l-4 border-green-500">{list.departmentName}</div>
                    </div>
                    <div className="flex flex-row justify-start gap-5">
                        <div className="font-bold w-44">Position Name</div>
                        <div className="w-40 pl-2 border-l-4 border-green-500">{list.positionName}</div>
                    </div>

                </div>

                <div className="mb-7">
                    <div className="font-bold mb-4 text-green-500 text-xl">Detail Employee</div>
                    {list.payroll.map((payroll: keyable, indexPayroll: number) => (
                        <>
                            <div key={`payroll-${indexPayroll}`} className="flex flex-row justify-between flex-wrap gap-2">
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-44">Employee Name</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.employeeName}</div>
                                </div>
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-44">Employee ID</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.employeeId}</div>
                                </div>
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-44">Bank Name</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.bankName}</div>
                                </div>
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-44">Bank Account</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.bankAccount}</div>
                                </div>
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-44">Salary</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(payroll.earning)}</div>
                                </div>
                            </div>

                            <div className="font-bold my-4 text-green-500 text-xl">Income</div>
                                <div className="flex flex-row justify-between flex-wrap gap-2">
                                    {payroll.properties.map((income: keyable, indexIncome: number) => (
                                        <div key={`income-${indexIncome}`} className="flex flex-row justify-start gap-5">
                                            <div className="font-bold w-44">{income.name}</div>
                                            <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(income.amount)}</div>
                                        </div>
                                    ))}
                            </div>

                            <div className="font-bold my-4 text-green-500 text-xl">Deduction</div>
                                <div className="flex flex-row justify-between flex-wrap gap-2">
                                    {payroll.deductions.map((deduction: keyable, indexDeduction: number) => (
                                        <div key={`income-${indexDeduction}`} className="flex flex-row justify-start gap-5">
                                            <div className="font-bold w-44">{deduction.name}</div>
                                            <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(deduction.amount)}</div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ))}
                </div>

            

            
            </div>
            )
        }) : null}
    </CardBody>
</Card>
  );
}

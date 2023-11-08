import { useState } from "react";
import { toRupiah } from "@/utils/general";
import { Card, CardBody, Typography, Button, Spinner } from "@material-tailwind/react";
import {  
   PencilIcon,
   TrashIcon,
} from "@heroicons/react/24/solid";
import { deleteDataPayroll } from "@/app/services/payroll";
import {  NoData } from '@/app/components';
import Modal from '@/app/components/molecules/modal';
import { isEmpty } from "@/utils/locDash";
import Shimmer from "@/app/pages/payroll/components/ModelPayroll/Shimmer";

interface keyable {
   [key: string]: any  
}

const ModelPayroll = ({
   dataPayroll,
   getPayrollAll,
   setActiveTab,
   setDataEdit,
   setForm,
   setProperties,
   isLoadingPayroll,
   setDeductions,
}) => {
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
   const [modelPayroll, setModelPayroll] = useState<Object>({});
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleClickDelete = (value) => {
      setShowModalDelete(true);
      setModelPayroll(value);
   }

   const handleClose = () => {
      setShowModalDelete(false);
      setModelPayroll({});
   }

   const handleDelete = async (value) => {
      const { id } = value;
      setIsLoading(true);
      try {
         const res = await deleteDataPayroll(id);

         if (res && res.message === "Success") {
            getPayrollAll();
            setShowModalDelete(false)
            setIsLoading(false)
         }
         setIsLoading(false)
      } catch (error) {
         setIsLoading(false)
      }
   };

   const handleEdit = (value) => {
      
      setDataEdit(value);
      setActiveTab(1);
      setForm({
         positionId: value.positionId,
         positionName: value.positionName,
      });
      setProperties(value.properties);
      setDeductions(value.deductions);
   }
   
    return (
      <>
         {isLoadingPayroll ? (
            <Shimmer />
         ) : dataPayroll && !isEmpty(dataPayroll) ? (
            <Card className={' mt-2 mb-1 -mr-6'}>
            <CardBody>
               <Typography color={'green'} variant={'h4'}>
                  Payroll Model
               </Typography>
               <div className={'border p-4 border-green-400 rounded-xl mt-2 bg-white'}>
                  {dataPayroll && dataPayroll.map((data: keyable, index: number) => (
                        <div key={`dataPayroll-${index}`} className={'bg-gray-50 border border-blue-gray-200 mb-3 rounded-xl'}>
                           <div className={'p-1 border bg-gray-200 rounded-tl-xl rounded-tr-xl w-full'} >
                              <Typography className={'text-center font-medium'} variant={'lead'} color={'green'}>
                                    {data.department}
                              </Typography>
                           </div>
                           <div className={'grid gap-4 md:grid-cols-2 xl:grid-cols-2 p-2'}>
                              {data.options.map((value: keyable, index: number) => (
                                    <div key={`dataOptions-${index}`} className={'bg-white border m-2 rounded-xl p-2'}>
                                       <div className="flex flex-row justify-between">
                                          <div>
                                             <Typography variant={'h5'} className={'m-2'}>
                                                {value.position}
                                             </Typography>
                                          </div>
                                          <div className="flex flex-row gap-2 mr-2">
                                             <div>
                                                <PencilIcon
                                                   color="green"
                                                   className={'w-4 h-4 cursor-pointer'}
                                                   onClick={() => handleEdit(value)}
                                                />
                                             </div>
                                             <div>
                                                <TrashIcon 
                                                   onClick={() => handleClickDelete(value)}
                                                   color="red" 
                                                   className={'w-4 h-4 cursor-pointer'}
                                                />
                                             </div>
                                          </div>
                                       </div>
                                       {value.properties.map((list: keyable, index: number) => (
                                          <div key={`properties-${index}`} className={'p-2 rounded-lg bg-green-500 flex flex-row justify-between m-2'}>
                                                <Typography color={'white'}>
                                                   {list.name}
                                                </Typography>
                                                <Typography className={'font-semibold'}  color={'white'}>
                                                   {toRupiah(list.amount)}
                                                </Typography>
                                          </div>
                                       ))}
                                       {value.deductions.map((list: keyable, index: number) => (
                                          <div key={`deductions-${index}`} className={'p-2 rounded-lg bg-red-500 flex flex-row justify-between m-2'}>
                                                <Typography color={'white'}>
                                                   {list.name}
                                                </Typography>
                                                <Typography className={'font-semibold'}  color={'white'}>
                                                   {toRupiah(list.amount)}
                                                </Typography>
                                          </div>
                                       ))}
                                    </div>
                              ))}
                           </div>
                           
                        </div>
                  ))}
                  
               </div>
            </CardBody>
      </Card>
         ) : (
            <NoData />
         ) }
         
        <Modal
         open={showModalDelete}
         header="Delete Data"
         handleClose={handleClose}
         body={
            <div>
               Are you sure want to remove this payroll data ?
            </div>
         }
         footer={
         <div className="flex flex-row-reverse">
            <Button
               disabled={isLoading}
               variant="filled"
               color={'red'}
               className={'p-2 w-28 ml-4 mb-4 content-center'}
               onClick={() => handleDelete(modelPayroll)}
            >
               {isLoading ? (
                  <div className="flex justify-center">
                     <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                  </div>

               ) : (
                  <Typography
                     variant="small"
                     className="font-bold uppercase text-white text-center"
                  >
                     {'Delete'}
                  </Typography>
               )}
            </Button>
            <Button
               disabled={isLoading}
               variant="filled"
               color={'green'}
               className={'p-2 w-28 ml-4 mb-4 content-center	'}
               onClick={() => setShowModalDelete(false)}
            >
               <Typography
                  variant="small"
                  className="font-bold uppercase text-white text-center"
               >
                  {'Cancel'}
               </Typography>
            </Button>
         </div>
         }
      />
      </>
    )
}

export default ModelPayroll;
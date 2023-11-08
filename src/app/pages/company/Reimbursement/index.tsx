import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Typography,
  Select,
  Spinner,
  Input,
  Option,
} from "@material-tailwind/react";
import RSelect from 'react-select';
import { authorsTableData } from "@/app/data";
import { content, dataHeader } from '@/app/data/reimbursement';
import { Button } from "@material-tailwind/react";
import { TrashIcon, PencilIcon, PlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { HeaderBack, TableLoading, NoData } from '@/app/components';
import {
  deleteDataPosition,
  getDataPositionPagination,
  exportDataPosition,
  getDataPosition,
} from '@/app/services/company/position';
import { GetPositionResponse, GetDataPositionResponse } from '@/interface/position';
import Modal from '@/app/components/molecules/modal';
import Pagination from '@/app/components/molecules/pagination';
import { isEmpty } from '@/utils/locDash';
import { snackBar } from '@/utils/snackbar';
import {
  getDataDepartment,
} from "@/app/services/company/department";
import { GetDataReimbursement, GetDepartmentResoponse, GetReimbursementResponse } from "@/interface/company";
import { deleteDataReimbursement, exportDataReimbursement, getDataReimbursement, getDataReimbursementPagination, postDataReimbursement, updateDataReimbursement } from "@/app/services/company/reimbursement";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { toRupiah } from "@/utils/general";


export default function Reimbursement () {
  const [dataReimbursement, setdataReimbursement] = useState<GetDataReimbursement[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('')
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [reimbursementName, setreimbursementName] = useState<string>('');
  const [reimbursementCode, setreimbursementCode] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);
  const searchData = useRecoilValue(searchAllAtom);

  const getReimbursementPagination = async (params: object) => {
    setIsLoading(true);

    try {
      const response = await getDataReimbursementPagination(params) as GetReimbursementResponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setdataReimbursement(response.data);
      } else {
        setdataReimbursement(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      reimbursementCode,
      reimbursementName,
      totalAmount,
    }

    const response = await postDataReimbursement(payload);
    if(response && !response.isError) {
      setShowModalForm(false);
      setIsLoading(false)
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getReimbursementPagination(params);
      snackBar("success", "Success Add Data Reimbursement")
      resetValueForm()
    } else {
      setIsLoading(false);
      setShowModalForm(false)
      resetValueForm()
      snackBar("error", "Failed Add Data Reimbursement")
    }
  }

  const handleEditData = async (data : GetDataReimbursement) => {
    setDataEdit(data);
    setreimbursementCode(data.reimbursementCode);
    setreimbursementName(data.reimbursementName);
    setTotalAmount(data.totalAmount);
    setShowModalForm(true);
    setListSelected([]);
    setSelectedAll(false);
  }

  const onEditData = async() => {
    setIsLoading(true);
    const payload = {
      reimbursementCode,
      reimbursementName,
      totalAmount,
    }
    const response =  await updateDataReimbursement(dataEdit?.id.toString() || '', payload);
    if(response && !response.isError) {
      setShowModalForm(false);
      resetValueForm();
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getReimbursementPagination(params);
      setDataEdit(null)
      setShowModalForm(false);
      snackBar("success", "Success Edit Data Reimbursement");
    }else{
      setShowModalForm(false);
      resetValueForm()
      snackBar('error', 'Failed Edit Data Reimbursement');

    }
    setIsLoading(false);
  }

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataReimbursement(id);
    if (response && !response.isError) {
      setShowModalDelete(false);
      setIsLoading(false)
      snackBar('success', 'Success Delete Data Reimbursemnt');
      const dataAll = await getDataReimbursement() as GetReimbursementResponse;
        const totalData = Math.ceil(dataAll.data.length / 10);
        const params = {
          pageNumber: totalData < onPage ? totalData : onPage,
          search: isEmpty(query) ? null : query,
        }
        getReimbursementPagination(params);
    }else{
      setShowModalDelete(false);
      setIsLoading(false)
      snackBar('error', 'Failed Delete Data Reimbursement');
    }
  }

  const handleExportData = async () => {
    setIsLoading(true);
    if (listSelected.length > 0) {
      await exportDataReimbursement(listSelected);
      setIsLoading(false);
      snackBar("success", "Success Download Data Reimbursement");
    } else {
      const dataAll = await getDataReimbursement() as GetReimbursementResponse;
      if (dataAll?.data) await exportDataReimbursement(dataAll?.data);
      setIsLoading(false);
      snackBar("success", "Success Download Data Reimbursement");
    }
    setIsLoading(false);
  }

  const resetValueForm = () => {
    setreimbursementCode('');
    setreimbursementName('');
    setTotalAmount(0);
    setDataEdit(null);
  }

  const handleSelected = (data: GetDataReimbursement) => {

    if(listSelected.includes(data)) {
      const arrayFilter = listSelected.filter(e => e !== data)
      setListSelected(arrayFilter);
      
    } else {  
      setListSelected([...listSelected, data]);
    }
  }

  const handleCheckAll = () => {
    if(selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataReimbursement || []);
      setSelectedAll(true);
    }
    
  }

  useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataReimbursement) {
        const delaySearch = setTimeout(() => {
          setQuery("");
        }, 1500)
    
        return () => clearTimeout(delaySearch)
      } else setQuery("")
    }
  },[searchData])

  useEffect(()=>{
    if(query !== null){
      const params = {
        search: isEmpty(query) ? null : query
      }
      getReimbursementPagination(params)
    }else{
      const params= {
        pageNumber: onPage,
      }
      getReimbursementPagination(params)
    }
  }, [query])
 
  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getReimbursementPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 inset-2">
    <Card>
      <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          Reimbursement
        </Typography>
      </CardHeader>

      <div className={'flex flex-row gap-1'}>
        <Button
          variant="filled"
          color={'green'}
          className={'p-2 w-20 ml-4 flex mb-4' }
          onClick={()=>setShowModalForm(true)}
        >
          <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
          <Typography
              variant="small"
              className="font-bold uppercase text-white "
            >
              {'ADD'}
            </Typography>
        </Button>

        {dataReimbursement && (
            <Badge invisible={listSelected.length === 0} content={listSelected.length}>
              <Button
                variant="filled"
                color={'blue'}
                className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                onClick={() => handleExportData()}
              >
                <ArrowUpTrayIcon strokeWidth={5} className="h-4 w-4 mr-2 mt-[1px]" />
                <Typography
                    variant="small"
                    className="font-bold uppercase text-white "
                  >
                    {`${listSelected.length > 0 ? 'Export' : 'Export All'}`}
                  </Typography>
              </Button>
            </Badge>
        )} 
      </div>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              
              {dataReimbursement && 
                <th className="border-b border-blue-gray-50 w-[2px] pl-2 text-center">
                  <Checkbox color="green" checked={selectedAll} onClick={() => handleCheckAll()} crossOrigin={undefined}  />
                </th>
              }

              {dataHeader.map((data) => (
                <th
                  key={data}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {data}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? <TableLoading row={5}/> : (
              <>
                {dataReimbursement && dataReimbursement.map(
                  (data: GetDataReimbursement, index) => {
                    const className = `py-3 px-5 ${
                      index === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={index}>
                        <td className="border-b border-blue-gray-50 pl-2">
                          <Checkbox 
                            color="green" 
                            checked={listSelected.includes(data)} 
                            onClick={() => handleSelected(data)} 
                            crossOrigin={undefined}
                          />
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.reimbursementCode}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.reimbursementName}
                              </Typography>
                        </td>

                        <td className={className}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {toRupiah(data.totalAmount.toString())}
                              </Typography>
                        </td>
                        
                        <td className={className}>
                          <div className='flex flex-row gap-4'>
                            <PencilIcon 
                              onClick={() => handleEditData(data)}
                              color='green' 
                              className='w-4 h-4 cursor-pointer'
                            />
                            <TrashIcon
                              onClick={()=> handleClickDelete(data.id.toString())} 
                              color='red' 
                              className='w-4 h-4 cursor-pointer' 
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            )}
            
          </tbody>
        </table>
        {dataReimbursement && totalPage > 1 ? (
          <Pagination
            onChange={handleChangePage}
            total={totalPage}
            current={currentPage}
          />
        ): !isLoading && !dataReimbursement ? (
          <NoData/>
        ): null}
      </CardBody>
    </Card>
    <Modal
      open={showModalDelete}
      header={'Delete Data Reimbursemet'}
      handleClose={()=> setShowModalDelete(false)}
      body={
        <></>
      }
      footer={
        <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={'red'}
              disabled={isLoading}
              className={'p-2 w-32 ml-4 mb-4 flex flex-row justify-center'}
              onClick={() => handleDelete(idDelete)}
            >
              {isLoading ? (
                <>
                  <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                  <Typography
                    variant="small"
                    className="font-bold uppercase text-white text-center"
                  >
                    {'Loading'}
                  </Typography>
                </>
              ): (
                <Typography
                    variant="small"
                    className="font-bold uppercase text-white text-center"
                >
                  {'Delete'}
                </Typography>
              )}
            </Button>
            <Button
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
      size="sm"
    />

<Modal  
  open={showModalForm}
  header={ dataEdit ? "Edit Data Reimbursement" : "Add Data Reimbursement"}
  handleClose={()=> { 
    setShowModalForm(false) ;
    resetValueForm();
  }}
  body={
    <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      <Input defaultValue={reimbursementCode} size="lg" label="Reimbursement Code" color="green" onChange={(e) => setreimbursementCode(e.target.value)} crossOrigin={undefined}/>
      <Input defaultValue={reimbursementName} size="lg" label="Reimbursement Name" color="green" onChange={(e) => setreimbursementName(e.target.value)} crossOrigin={undefined}/>
      <Input 
        defaultValue={dataEdit ? totalAmount : totalAmount < 1 ? "" : totalAmount } 
        size="lg" 
        label="Max Amount" 
        color="green" 
        type='number' 
        onChange={(e) => setTotalAmount(Number(e.target.value))} 
        crossOrigin={undefined}
      />
    </div>
  }

  footer={
    <div className="flex flex-row-reverse">
      <Button
        variant="filled"
        color={'green'}
        disabled={isLoading || (!reimbursementCode && !reimbursementName && totalAmount <= 0)}
        className={'p-2 w-28 ml-4 mb-4 flex flex-row justify-center'}
        onClick={() => {
          dataEdit ? onEditData() : handleSave()
        }}
      >

        {isLoading ? (
          <>
            <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
            <Typography
              variant="small"
              className="font-bold uppercase text-white text-center"
            >
              {'Loading'}
            </Typography>
          </>
        ): (
          <Typography
              variant="small"
              className="font-bold uppercase text-white text-center"
          >
            {'Save'}
          </Typography>
        )}
        
      </Button>
      <Button
        variant="filled"
        color={'red'}
        className={'p-2 w-28 ml-4 mb-4 content-center	'}
        onClick={() => setShowModalForm(false)}
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
  size="lg"
/>
  </div>
  );
}

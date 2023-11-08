import * as React from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Typography,
  Spinner,
  Input,
} from "@material-tailwind/react";
import { authorsTableData } from "@/app/data";
import { dataHeader } from '@/app/data/position';
import { Button } from "@material-tailwind/react";
import { TrashIcon, PencilIcon, PlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { HeaderBack, TableLoading, NoData } from '@/app/components';
import {
  deleteDataPosition,
  postDataPosition,
  updateDataPosition, 
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
import { GetDepartmentResoponse } from "@/interface/company";
import { useRecoilValue } from 'recoil';
import { searchAllAtom } from '@/app/recoils/search';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface keyable {
  [key: string]: any  
}

export default function Position () {
  const [dataPosition, setDataPosition] = React.useState<GetDataPositionResponse[] | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModalForm, setShowModalForm] = React.useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = React.useState<boolean>(false);
  const [idDelete, setIdDelete] = React.useState<string>('')
  const [dataEdit, setDataEdit] = React.useState<any | null>(null);
  const [positionName, setPositionName] = React.useState<string>('');
  const [positionCode, setPositionCode] = React.useState<string>('');
  const [departmentName, setDepartmentName] = React.useState<string>('');
  const [departmentCode, setDepartmentCode] = React.useState<string>('');
  const [departmentId, setDepartmentId] = React.useState<string>('');
  const [selectedAll, setSelectedAll] = React.useState<boolean>(false);
  const [listSelected, setListSelected] = React.useState<Array<object>>([]);
  const [query, setQuery] = React.useState<string | null>(null);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [onPage, setOnPage] = React.useState<number>(1);
  const [dataDepartment, setDataDepartment] = React.useState<Array<keyable>>([])
  const searchData = useRecoilValue(searchAllAtom);
  const animatedComponents = makeAnimated();

  const getDatasPositionPagination = async (params: object) => {
    setIsLoading(true);

    try {
      const response = await getDataPositionPagination(params) as GetPositionResponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataPosition(response.data);
      } else {
        setDataPosition(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataPosition(id);

    if (response) {
      const dataAll = await getDataPosition() as GetPositionResponse;
      const totalData = Math.ceil(dataAll.data.length / 10);
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasPositionPagination(params);
      setShowModalDelete(false);
      snackBar('success', 'Data Position deleted successfully');
    }else{
      setShowModalDelete(false);
      snackBar('error', 'Data Position failed to delete');
    }
    setIsLoading(false);
  }

  const resetValueForm = () => {
    setPositionCode('');
    setPositionName('');
    setDepartmentName('');
    setDepartmentCode('');
    setDepartmentId('');
    setDataEdit(null);
  }

  const handleAdd = () => {
    setShowModalForm(true);
    resetValueForm();
  }

  const handleEditData = async (data : GetDataPositionResponse) => {
    setDataEdit(data);
    setPositionName(data.positionName);
    setPositionCode(data.positionCode);
    setDepartmentName(data.departmentName);
    setDepartmentCode(data.departmentCode)
    setDepartmentId(data.departmentId)
    setShowModalForm(true);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  }

  const onEditData = async() => {
    setIsLoading(true);
    const payload = {
      positionCode,
      positionName,
      departmentId,
      departmentCode,
      departmentName
    }
    const response =  await updateDataPosition(dataEdit?.id.toString() || '', payload);
    if(response && !response.isError) {
      setShowModalForm(false);
      resetValueForm();

      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }

      getDatasPositionPagination(params);
      setShowModalForm(false);
      snackBar("success", "Data Position edited successfully");
    }else{
      setShowModalForm(false);
      snackBar("error", "Data Position failed to edit");
    }
    setIsLoading(false);
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      positionCode,
      positionName,
      departmentId,
      departmentCode,
      departmentName
    }

    const response = await postDataPosition(payload);
    if(response && !response.isError) {
      setShowModalForm(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasPositionPagination(params);
      setShowModalForm(false);
      snackBar("success", "Data Position added successfully")
    } else {
      setShowModalForm(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasPositionPagination(params);
      setShowModalForm(false);
      snackBar("error", "Data Position failed to add")
    }
    setIsLoading(false);
    resetValueForm();
  }

  const handleSelected = (data: GetDataPositionResponse) => {

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
      setListSelected(dataPosition || []);
      setSelectedAll(true);
    }
    
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getDatasPositionPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataPosition(listSelected);
      snackBar("success", "Data Position successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataPosition() as GetPositionResponse;
      if (dataAll.data) await exportDataPosition(dataAll?.data);
      snackBar("success", "Data Position successfully downloaded");
      setIsLoading(false);
    }
    
  }
  
  const getDataDepartmentAll = async () => {
    try {
      const dataAll = await getDataDepartment() as GetDepartmentResoponse;
      setDataDepartment(dataAll.data);

    } catch (err) {
    }
  }

  React.useEffect(() => {
    getDataDepartmentAll();
  }, []);

  React.useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
       
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataPosition) {
        const delaySearch = setTimeout(() => {
          setQuery("");
         
        }, 1500)
    
        return () => clearTimeout(delaySearch)
      } else setQuery("")
     
    }
    
  },[searchData])

  React.useEffect(() => {
    if(query !== null) {
      if(query.length > 0) {
        const params = {
          search: isEmpty(query) ? null : query,
        }
        getDatasPositionPagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getDatasPositionPagination(params);
      }
    }
  }, [query]);
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 inset-2">
    <Card>
      <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          Position
        </Typography>
      </CardHeader>

      <div className={'flex flex-row gap-1'}>
        <Button
          variant="filled"
          color={'green'}
          className={'p-2 w-20 ml-4 flex mb-4' }
          onClick={handleAdd}
        >
          <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
          <Typography
              variant="small"
              className="font-bold uppercase text-white "
            >
              {'ADD'}
            </Typography>
        </Button>

        {dataPosition && (
            <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
              <Button
                variant="filled"
                color={'blue'}
                className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                onClick={handleExportData}
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

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              
              {dataPosition && 
                <th className="border-b border-blue-gray-50 w-[2px] pl-2 text-center">
                  <Checkbox color="green" checked={selectedAll} onClick={handleCheckAll} crossOrigin={undefined}  />
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
            {isLoading ? <TableLoading row={3}/> : (
              <>
                {dataPosition && dataPosition.map(
                  (data: GetDataPositionResponse, index) => {
                    const className = `py-3 px-5 ${
                      index === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={index}>
                        <td className="border-b border-blue-gray-50 pl-2">
                          <Checkbox color="green" checked={listSelected.includes(data)} onClick={() => handleSelected(data)} crossOrigin={undefined}/>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.positionName}
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
                                {data.positionCode}
                              </Typography>
                        </td>

                        <td className={className}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.departmentName}
                              </Typography>
                        </td>
                        
                        <td className={className}>
                          <div className='flex flex-row gap-4'>
                            <PencilIcon onClick={() => handleEditData(data)}
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
        {dataPosition && totalPage > 1 ? (
          <Pagination
            onChange={handleChangePage}
            total={totalPage}
            current={currentPage}
          />
        ): !isLoading && !dataPosition ? (
          <NoData/>
        ): null}
      </CardBody>
    </Card>
    <Modal
      open={showModalDelete}
      header={'Delete Data Position'}
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
  header={ dataEdit ? "Edit Data Position" : "Add Data Position"}
  handleClose={()=> { 
    setShowModalForm(false) ;
    resetValueForm();
  }}
  body={
    <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      <Select
        components={animatedComponents}
        className="text-sm"
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: "green",
          },
        })}
        placeholder={<Typography variant="small" className="text-blue-gray-500 font-normal">Select Department</Typography>}
        isClearable
        options={dataDepartment.map((list) => {
          return { label: list.departmentName, value: [list.id, list.departmentCode]}
        })}
        onChange={(selected: any) => {
          const { label, value } = selected;
          setDepartmentName(label);
          setDepartmentCode(value[1]);
          setDepartmentId(value[0]);
        }}
        value={dataEdit ? {
          id: departmentId,
          value: departmentCode,
          label: departmentName
        } : undefined}

      />
      <Input value={positionName} size="lg" label="Position Name" color="green" onChange={(e) => setPositionName(e.target.value)} crossOrigin={undefined}/>
      <Input value={positionCode} size="lg" label="Position Code" color="green" onChange={(e) => setPositionCode(e.target.value)} crossOrigin={undefined}/>
    </div>
  }

  footer={
    <div className="flex flex-row-reverse">
      <Button
        variant="filled"
        color={'green'}
        disabled={isLoading || (!positionName && !positionCode)}
        className={'p-2 w-28 ml-4 mb-4 flex flex-row justify-center'}
        onClick={dataEdit ? onEditData : handleSave}
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

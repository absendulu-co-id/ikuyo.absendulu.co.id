import React, { useEffect, useState, useMemo } from "react";
import {
    Spinner,
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Checkbox,
    Badge,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/solid";
import { dataHeader } from "@/app/data/departmen";
import { HeaderBack, NoData, TableLoading } from "@/app/components";
import Modal from "@/app/components/molecules/modal";
import {
  deleteDataDepartment,
  exportDataDepartment,
  getDataDepartment,
  getDataDepartmentPagination,
  postDataDepartment,
  updateDataDepartment,
} from "@/app/services/company/department";
import { GetDataDepartmentResponse, GetDepartmentResoponse } from "@/interface/company";
import { snackBar } from "@/utils/snackbar";
import { isEmpty } from "@/utils/locDash";
import Pagination from "@/app/components/molecules/pagination";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";

const Department = () => {
  const [dataDepartment, setDataDepartment] = useState<GetDataDepartmentResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departmentName, setDepartmentName] = useState<string>('');
  const [departmentCode, setDepartmentCode] = useState<string>('');
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('')
  const [dataEdit, setDataEdit] = useState<GetDataDepartmentResponse | null>(null);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
 
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [onPage, setOnPage] = React.useState<number>(1);
  const [query, setQuery] = React.useState<string | null>(null);

  const searchData = useRecoilValue(searchAllAtom);

  const resetValueForm = () => {
    setDepartmentCode('');
    setDepartmentName('');
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      departmentCode: departmentCode,
      departmentName: departmentName
    }

    const response = await postDataDepartment(payload);
    if(!response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasDepartmentPagination(params);
      setShowModalForm(false);
      snackBar('success', 'Data Department save successfully');
    } else {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasDepartmentPagination(params)
      setShowModalForm(false);
      snackBar('error', 'Data Department failed to save');
    }
    resetValueForm();
    setIsLoading(false);
  }

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataDepartment(id);

    if(response) {
      const dataAll = await getDataDepartment() as GetDepartmentResoponse;
      const totalData = Math.ceil(dataAll?.data.length / 10);
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasDepartmentPagination(params);
      setShowModalDelete(false);
      snackBar('success', 'Data Department delete successfully');
    }else{
      setShowModalDelete(false);
      snackBar('error', 'Data Department delete failed');
    }
    setListSelected([]);
    setSelectedAll(false);
    setIsLoading(false);
  }

  const handleEditData = async (data : GetDataDepartmentResponse) => {
    setDataEdit(data);
    setDepartmentName(data.departmentName);
    setDepartmentCode(data.departmentCode);
    setShowModalForm(true);
    setListSelected([]);
    setSelectedAll(false);
  }

  const onEditData = async() => {
    setIsLoading(true);
    const payload = {
      id: dataEdit?.id.toString(),
      departmentCode,
      departmentName
    }
    const response =  await updateDataDepartment(dataEdit?.id.toString() || '', payload);
    if(response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasDepartmentPagination(params);
      setShowModalForm(false);
      snackBar('success', 'Data Department edited successfully');
    }else{
      setShowModalForm(false);
      snackBar('error', 'Data Department edited failed');
    }
      setDataEdit(null);
      resetValueForm();
      setIsLoading(false);

  }

  const handleSelected = (data: GetDataDepartmentResponse) => {
    if(listSelected.includes(data)) {
      const arrayFilter = listSelected.filter(e => e !== data)
      setListSelected(arrayFilter);
      
    } else {
      setListSelected([...listSelected, data])
    }
  }

  const handleCheckAll = () => {
    if(selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataDepartment || []);
      setSelectedAll(true);
    }
    
  }

  const getDatasDepartmentPagination = async (params) => {
    setIsLoading(true);

    try {
      const response = await getDataDepartmentPagination(params) as GetDepartmentResoponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataDepartment(response.data);
        
      } else {
        setDataDepartment(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getDatasDepartmentPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  useEffect(()=> {
    if(listSelected.length === dataDepartment?.length)
      setSelectedAll(true);
    else 
      setSelectedAll(false);
  },[listSelected])

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataDepartment(listSelected);
      snackBar("success", "Data Department successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataDepartment() as GetDepartmentResoponse;
      if (dataAll.data) await exportDataDepartment(dataAll?.data);
      snackBar("success", "Data Department successfully downloaded");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataDepartment) {
        const delaySearch = setTimeout(() => {
          setQuery("");
        }, 1500)
    
        return () => clearTimeout(delaySearch)
      } else setQuery("")
    }
  },[searchData])

  useEffect(() => {
    if(query !== null) {
      if(query.length > 0) {
        const params = {
          search: isEmpty(query) ? null : query,
        }
        getDatasDepartmentPagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getDatasDepartmentPagination(params);
      }
    }
  }, [query]);

  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className={'pb-8'}>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
              {'Department'}
            </Typography>
          </CardHeader>
          <div className={'flex flex-row gap-1'}>
            <Button
              variant="filled"
              color={'green'}
              className={'p-2 w-20 ml-4 flex mb-4 justify-center' }
              onClick={()=> setShowModalForm(true)}
            >
              <PlusIcon strokeWidth={4} className="h-4 w-4 mr-1 mt-[1px]" />
              <Typography
                  variant="small"
                  className="font-bold uppercase text-white "
                >
                  {'Add'}
                </Typography>
            </Button>

            {dataDepartment && (
              <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
                <Button
                  disabled={isLoading}
                  variant="filled"
                  color={'blue'}
                  className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                  onClick={handleExportData}
                >
                  {isLoading ? (
                    <>
                      <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                      <Typography
                        variant="small"
                        className="font-bold uppercase text-white text-center"
                      >
                        {'Download ...'}
                      </Typography>
                    </>
                  ):(
                    <>
                      <ArrowUpTrayIcon strokeWidth={5} className="h-4 w-4 mr-2 mt-[1px]" />
                      <Typography
                        variant="small"
                        className="font-bold uppercase text-white "
                      >
                        {`${listSelected.length > 0 ? 'Export' : 'Export All'}`}
                      </Typography>
                    </>
                  )}
                  
                </Button>
              </Badge>
            )} 
          </div>
          
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {dataDepartment && 
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
                {isLoading ? <TableLoading row={4}/> : (
                  <>
                    {dataDepartment && dataDepartment.map(
                      (data : GetDataDepartmentResponse , index) => {
                        const className = `py-3 px-5 border-b border-blue-gray-50`;
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
                                    {data.departmentName}
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
                                    {data.departmentCode}
                                  </Typography>
                            </td>
                            
                            <td className={className}>
                              <div className="flex gap-4">
                                <PencilIcon 
                                  onClick={() => handleEditData(data)}
                                  color="#66BB6A" 
                                  className={'w-4 h-4 cursor-pointer'}
                                />

                                <TrashIcon 
                                  onClick={()=> handleClickDelete(data.id.toString())} 
                                  color="#ef5350" 
                                  className={'w-4 h-4 cursor-pointer'}
                                />
                              </div>
                            </td>
                            
                          </tr>
                        );
                      }
                    )}
                  </>
                ) }
              </tbody>
            </table>
            {dataDepartment && totalPage > 1 ? (
              <Pagination
                onChange={handleChangePage}
                total={totalPage}
                current={currentPage}
              />
            ): !isLoading && !dataDepartment ? (
              <NoData />
            ) : null}
          </CardBody>
        </Card>
        <Modal
          open={showModalDelete}
          header={'Delete Data Department'}
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
          header={ dataEdit ? "Edit Data Department" : "Add Data Department"}
          handleClose={()=> { 
            setShowModalForm(false) ;
            resetValueForm();
            setDataEdit(null);
          }}
          body={
            <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <Input value={departmentName} size="lg" label="Department Name" color="green" onChange={(e) => setDepartmentName(e.target.value)} crossOrigin={undefined}/>
              <Input value={departmentCode} size="lg" label="Department Code" color="green" onChange={(e) => setDepartmentCode(e.target.value)} crossOrigin={undefined}/>
            </div>
          }

          footer={
            <div className="flex flex-row-reverse">
                <Button
                  variant="filled"
                  color={'green'}
                  disabled={isLoading || (!departmentName || !departmentCode)}
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
                  onClick={() => {
                    setShowModalForm(false);
                    resetValueForm();
                    setDataEdit(null);
                  }}
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
  )
}

export default Department;
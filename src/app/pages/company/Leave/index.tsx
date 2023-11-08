import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Typography,
  Button,
  Spinner,
  Input
} from "@material-tailwind/react";
import { authorsTableData } from "@/app/data";
import { dataHeader } from "@/app/data/leaveType";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { HeaderBack, Modal, TableLoading, NoData } from "@/app/components";
import { GetDataLeaveTypeResponse, GetLeaveTypeResponse } from "@/interface/company";
import {
  deleteDataLeaveType,
  exportDataLeaveType,
  getDataLeavePagination,
  getDataLeaveType,
  postDataLeaveType,
  updateDataLeaveType,
} from "@/app/services/company/leaveType";
import { snackBar } from "@/utils/snackbar";
import { isEmpty } from "@/utils/locDash";
import Pagination from "@/app/components/molecules/pagination";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";

const Leave = () => {
  const [dataLeaveType, setDataLeaveType] = useState<GetDataLeaveTypeResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [leaveName, setLeaveName] = useState<string>('');
  const [leaveCode, setLeaveCode] = useState<string>('');
  const [totalDays, setTotalDays] = useState<number>(0)
  const [leaveMoreThanBalance, setLeaveMoreThanBalance] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<GetDataLeaveTypeResponse | null>(null);
  const [idLeaveType, setIdLeaveType] = useState<string>('');
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);

  const searchData = useRecoilValue(searchAllAtom);
  
  const handleClose = () => {
    setShowModalAdd(false);
    setShowModalDelete(false);
  }

  const resetValueForm = () => {
    setLeaveCode("");
    setLeaveName("");
    setTotalDays(0)
    setLeaveMoreThanBalance(false)
  }

  const handleOpen = () => {
    setShowModalAdd(true);
    resetValueForm();
    setDataEdit(null);
  };

  const getDatasLeavePagination = async (params) => {
    setIsLoading(true);

    try {
      const response = await getDataLeavePagination(params) as GetLeaveTypeResponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataLeaveType(response.data);
      } else {
        setDataLeaveType(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }


  const onEditData = async () => {

    setIsLoading(true);
    const payload = {
      leaveCode: leaveCode,
      leaveName: leaveName,
      totalDays: totalDays,
      leaveMoreThanBalance: leaveMoreThanBalance,
    }

    const response = await updateDataLeaveType(dataEdit?.id.toString() || '', payload);
    if (response && !response.isError) {
      setShowModalAdd(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }

      getDatasLeavePagination(params);
      resetValueForm()
      setShowModalAdd(false);
      snackBar("success", "Data Leave Type edited successfully")
    }else{
      setShowModalAdd(false);
      snackBar("error", "Data Leave Type failed to edit")
    }
    setIsLoading(false);
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      leaveCode: leaveCode,
      leaveName: leaveName,
      totalDays: totalDays,
      leaveMoreThanBalance: leaveMoreThanBalance,
    }
    const response = await postDataLeaveType(payload);

    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }      
      getDatasLeavePagination(params);
      setShowModalAdd(false);
      snackBar("success", "Data Leave Type added successfully")
    }else{
      setShowModalAdd(false);
      snackBar("error", "Data Leave Type failed to add")
    }
    setIsLoading(false);
  }


  const handleEditData = async (data: GetDataLeaveTypeResponse) => {
    setDataEdit(data);
    setShowModalAdd(true);
    setLeaveCode(data.leaveCode);
    setLeaveName(data.leaveName);
    setTotalDays(data.totalDays)
    setLeaveMoreThanBalance(data.leaveMoreThanBalance)
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleClickDelete = (id: string) => {
    setIdLeaveType(id);
    setShowModalDelete(true);
  }


  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataLeaveType(id);

    if (response) {
      setShowModalDelete(false);
      const dataAll = await getDataLeaveType() as GetLeaveTypeResponse;
      const totalData = Math.ceil(dataAll.data.length / 10);
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasLeavePagination(params);
      snackBar('success', 'Data Leave Type deleted successfully');
    }else{
      snackBar("error", "Data Leave Type failed to delete")
    }
    
    setIsLoading(false);
  }

  const handleSelected = (data: GetDataLeaveTypeResponse) => {
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
      setListSelected(dataLeaveType || []);
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

    getDatasLeavePagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataLeaveType(listSelected);
      snackBar("success", "Data Leave Type successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataLeaveType() as GetLeaveTypeResponse;
      if (dataAll.data) await exportDataLeaveType(dataAll?.data);
      snackBar("success", "Data Leave Type successfully downloaded");
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
      if(dataLeaveType) {
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
        getDatasLeavePagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getDatasLeavePagination(params);
      }
    }
  }, [query])

  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
              {'Leave'}
            </Typography>
          </CardHeader>

          <div className={'flex flex-row gap-1'}>
            <Button
              variant="filled"
              color={'green'}
              className={'p-2 w-20 ml-4 flex mb-4' }
              onClick={handleOpen}
            >
              <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
              <Typography
                  variant="small"
                  className="font-bold uppercase text-white "
                >
                  {'ADD'}
                </Typography>
            </Button>

            {dataLeaveType && (
              <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
                <Button
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
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {dataLeaveType && 
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
                {isLoading ? <TableLoading row={5} /> : (
                  <>
                    {dataLeaveType && dataLeaveType.map(
                      (data: GetDataLeaveTypeResponse, index) => {
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
                                    {data.leaveCode}
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
                                {data.leaveName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.totalDays}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.leaveMoreThanBalance === true ? 'Yes' : 'No' }
                              </Typography>
                            </td>
    
                            <td className={className}>
                              <div className="flex gap-4">
                                <PencilIcon
                                  color="#66BB6A"
                                  className={'w-4 h-4 cursor-pointer'}
                                  onClick={() => handleEditData(data)}
                                />
                                <TrashIcon
                                  color="#ef5350"
                                  className={'w-4 h-4 cursor-pointer'}
                                  onClick={() => handleClickDelete(data.id.toString())}
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
            {dataLeaveType && totalPage > 1 ? (
              <Pagination
                onChange={handleChangePage}
                total={totalPage}
                current={currentPage}
              />

            ) : !isLoading && !dataLeaveType ? (
              <NoData />
            ) : null}
          </CardBody>
        </Card>

        <Modal
          open={showModalAdd}
          header={dataEdit ? `EDIT DATA LEAVE` : `ADD DATA LEAVE`}
          handleClose={handleClose}
          size="lg"
          body={
            <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <Input 
                defaultValue={leaveCode} 
                size="lg" 
                label="Leave Code" 
                color="green" 
                onChange={(e: { target: { value: string; }; }) => setLeaveCode(e.target.value)} 
                crossOrigin={undefined}
              />
              <Input 
                defaultValue={leaveName} 
                size="lg" 
                label="Leave Name" 
                color="green" 
                onChange={(e: { target: { value: string; }; }) => setLeaveName(e.target.value)} 
                crossOrigin={undefined}
              />
              <Input 
                defaultValue={ dataEdit? totalDays : totalDays < 1 ? "" : totalDays } 
                type="number"
                size="lg" 
                label="Total Days" 
                color="green" 
                onChange={(e) => setTotalDays(Number(e.target.value))} 
                crossOrigin={undefined}
              />
              <Checkbox 
                label="Employee can take Leave > Balance" 
                color="green" 
                defaultChecked={leaveMoreThanBalance === true? true : false}
                value={leaveMoreThanBalance}
                onClick={()=> setLeaveMoreThanBalance(!leaveMoreThanBalance)}
                crossOrigin={undefined}
              />
            </div>
          }
          footer={
              <div className="flex flex-row-reverse">
                <Button
                  variant="filled"
                  color={'green'}
                  disabled={isLoading || (!leaveName && !leaveCode && totalDays <= 0)}
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
                  onClick={() => setShowModalAdd(false)}
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

    <Modal
      open={showModalDelete}
      header="Delete Data"
      handleClose={handleClose}
      body={
          <div>
            Apakah anda yakin ingin menghapus data ?
          </div>
      }
      footer={
        <div className="flex flex-row-reverse">
          <Button
            variant="filled"
            color={'red'}
            className={'p-2 w-28 ml-4 mb-4 content-center'}
            onClick={() => handleDelete(idLeaveType)}
          >
            <Typography
                variant="small"
                className="font-bold uppercase text-white text-center"
              >
                {'Delete'}
              </Typography>
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
    />
      </div>
  )
}

export default Leave;
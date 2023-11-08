import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Checkbox,
    Badge,
    Spinner
} from "@material-tailwind/react";
import {
  PlusIcon,
  HandThumbUpIcon,
  XCircleIcon,
  HandThumbDownIcon,
  EyeIcon
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/app/data";
import { content, contentApproval, dataHeader, dataHeaderApproval } from "@/app/data/workshop";
import { InputDatePicker, HeaderBack, Modal, TableLoading, NoData } from "@/app/components";
import moment from "moment";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import Pagination from "@/app/components/molecules/pagination";
import { isEmpty } from "@/utils/locDash";
import { postUploadData } from "@/app/services/file";
import { getDataLeavePagination } from "@/app/services/company/leaveType";
import { snackBar } from "@/utils/snackbar";
import { addDataApprovalWorkShop, approveAllRequestWorkShop, approveRequestWorkShop, approveWorkShopById, getDataApprovalWorkShopDetail, getDataApproverWorkShopPagination, getDataWorkShopPagination, rejectAllRequestWorkShop, rejectWorkShopById } from "@/app/services/approval/workshop";
import { getDataWorkshop } from "@/app/services/company/workshopType";
import { GetWorkshopResoponse } from "@/interface/company";

interface PropShowApproval {
  show: boolean;
  isApproval: boolean;
  approvalAll: boolean;
  rejectAll: boolean;
  approvalSelect: boolean,
  rejectSelect: boolean,
  id: string;
}
const Workshop = () => {
  const [dataApproval, setDataApproval] = useState<any | null>(null);
  const [dataApprover, setDataApprover] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalApproval, setShowModalApproval] = useState<PropShowApproval>({
    show: false,
    isApproval: false,
    approvalAll: false,
    rejectAll: false,
    approvalSelect: false,
    rejectSelect: false,
    id: ''
  });

  const [dateActive, setDateActive] = useState<string>('');
  const [showModalDate, setShowModalDate] = useState<boolean>(false);

  const [dateNow, setDateNow] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [dateEndRemaining, setDateRemaining] = useState<string | Date>('')
  const [overtimeType, setOvertimeType] = useState<string>('');
  const [isleaveMoreThanBalance, setIsLeaveMoreThanBalance] = useState<boolean>(false)
  const [note, setNote] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [noteApprove, setNoteApprove] = useState<string>('');
  const animatedComponents = makeAnimated();
  const [fileDocs, setFileDocs] = React.useState(null);

  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [onPage, setOnPage] = React.useState<number>(1);
  const [query, setQuery] = React.useState<string | null>(null);

  const [totalPageApprover, setTotalPageApprover] = React.useState<number>(1);
  const [currentPageApprover, setCurrentPageApprover] = React.useState<number>(1)
  const [onPageApprover, setOnPageApprover] = React.useState<number>(1);
  const [dataLeave, setDataLeave] = React.useState<Array<object> | null>(null);
  const [remainingLeave, setRemainingLeave] = React.useState<number>(0);

  const [dataApprovalDetail, setDataApprovalDetail] = React.useState<Array<object> | null>([])
  const [showModalApprovalDetail, setShowModalApprovalDetail] = React.useState<boolean>(false);
  const searchData = useRecoilValue(searchAllAtom);
  

  const getDatasApprovalPagination = async (params) => {
    setIsLoading(true);
    try {
      const response = await getDataWorkShopPagination(params) as any;

      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataApproval(response.data);
      } else {
        setDataApproval(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const getDatasApproverPagination = async (params) => {
    setIsLoading(true);
    try {
      const response = await getDataApproverWorkShopPagination(params) as any;
      if (response.data.length > 0) {
        setTotalPageApprover(response.totalPages);
        setDataApprover(response.data);
        
      } else {
        setDataApprover(null)
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

    getDatasApprovalPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleChangePageApprover = (page: number) => {
    setOnPageApprover(page);
    setCurrentPageApprover(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getDatasApproverPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleSelected = (data: any) => {
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
      setListSelected(dataApprover || []);
      setSelectedAll(true);
    }
    
  }

  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];

      setFileDocs(files[0]);
    }
  };


  const handleSaveRequest = async () => {
    const startDate = moment(dateStart).format();
    const endDate = moment(dateEnd).format();
    const totalDate = moment(endDate).diff(moment(startDate), 'days');

    let document = '';
    if(fileDocs) {
      const resFile = await postUploadData(fileDocs);
      document = resFile?.data.url;
      console.log("testsss", resFile)
    }

    const payload = {
      workShopName: overtimeType,
      workShopAddress: address,
      document: document,
      workShopStart: moment(dateStart).format(),
      workShopEnd: moment(dateEnd).format(),
      note: note,
      status: ""
    }

  const response = await addDataApprovalWorkShop(payload)
  if(response){
    const params = {
      search: isEmpty(query) ? null : query,
    }
    handleResetDate()
    setShowModalForm(false);
    getDatasApprovalPagination(params);
  }
    

    
    
}

  const handleApproveStatus = async (isApprove: boolean) => {

    let payloadSelect: Array<string> = [];

    listSelected.map((data, index) => {
      payloadSelect.push(data.id)
    })
    if(showModalApproval.approvalAll) {
      const response = await approveAllRequestWorkShop(noteApprove);
    } else if(showModalApproval.rejectAll) {
      const response = await rejectAllRequestWorkShop(noteApprove);
    } else if (showModalApproval.approvalSelect) {

      const response = await approveWorkShopById(payloadSelect, noteApprove)

    } else if (showModalApproval.rejectSelect) {
      const response = await rejectWorkShopById(payloadSelect, noteApprove)

    } else {
      const payload = {
        status: isApprove ? 'Approved' : 'Rejected',
        note: noteApprove
      }
  
      const response = await approveRequestWorkShop(showModalApproval.id, payload);
    }

    const params = {
      pageNumber: onPage
    }
    
    getDatasApproverPagination(params);
    setListSelected([]);
    setShowModalApproval({
      show: false,
      isApproval: false,
      approvalAll: false, 
      rejectAll: false,
      approvalSelect: false,
      rejectSelect: false,
      id: ''
    })
    
  }

  const handleResetDate = () => {
    setDateStart('');
    setDateEnd('');
    setNote('');
    setFileDocs(null);
  }

  const handleApproveById = async (id: string) => {
    const response = await getDataApprovalWorkShopDetail(id);
    if(response) {
      setDataApprovalDetail(response.data);
      setShowModalApprovalDetail(true);
    }
  }

  const handleGetRemaining = async() => {
    // const response = await getDataApprovalWorkshopRemaining(overtimeType);

    // if(response)
    //   setRemainingLeave(response.data?.remaining);
  }

  const handleDownloadDocs = (url: string) => {
    window.open(url);
  }

  const handleGetDataLeave = async () => {
    const response =  await getDataWorkshop() as GetWorkshopResoponse;

    let dataLeaves:Array<object> = [{}];

    response.data.map(data => dataLeaves.push({
      label: data.workshopName,
      value: data.workshopName
    }))

    setDataLeave(dataLeaves)
  }

  useEffect(() => {
    if(overtimeType) {
      handleGetRemaining()
    }
  },[overtimeType])

  useEffect(() => {
    handleGetDataLeave();
  }, [])

  useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataApproval) {
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
        getDatasApprovalPagination(params);
        getDatasApproverPagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getDatasApprovalPagination(params);
        getDatasApproverPagination(params);
      }
    }
  }, [query]);

  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
              {'Workshop'}
            </Typography>
          </CardHeader>
          <Button
            variant="filled"
            color={'green'}
            className={'p-2 w-48 ml-4 flex mb-4' }
            onClick={()=> setShowModalForm(true)}
          >
            <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
            <Typography
                variant="small"
                className="font-bold uppercase text-white "
              >
                {'Request Workshop'}
              </Typography>
          </Button>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {dataHeaderApproval.map((data) => (
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
                {isLoading ? <TableLoading row={7}/> : (
                  <>
                    {dataApproval && dataApproval.map(
                      (data, key) => {
                        const className = `py-3 px-5 ${
                          key === authorsTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;
      
                        return (
                          <tr key={key}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {`${data?.createdAt.slice(0, 10)} ${data.createdAt.slice(11, 16)}`}
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
                                  {data?.workShopName}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {data?.workShopAddress}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >

                                  {`${data ? data?.workShopStart?.slice(0, 10) : ''} ${data.workShopStart && data.workShopStart?.slice(11, 16)}`}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                                >
                                  {`${data ? data.workShopEnd.slice(0, 10) : ''} ${data ? data.workShopEnd.slice(11, 16) : '-'}`}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className={'font-semibold cursor-pointer'}
                                >
                                  {data?.note}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  onClick={() => data.documentAttachments ? handleDownloadDocs(data.documentAttachments) : null}
                                  variant="small"
                                  color={data.documentAttachments ? 'green' : 'gray'}
                                  className={`font-semibold ${data.documentAttachments ? 'cursor-pointer' : ''} `}
                                >
                                  {data.documentAttachments ? 'Download' : 'No Attachments'}
                                </Typography>
                              </td>
                            <td className={className}>
                                <Typography
                                variant="small"
                                color={data && data?.status?.includes('Waiting') ? 'orange': data && data?.status?.includes('Rejected') ? 'red' : 'green'}
                                className="font-semibold"
                                >
                                  {data ? data.status : '-'}
                                </Typography>
                            </td>
                            <td className={className}>
                                <div className="flex gap-4">
                                  <EyeIcon color={'blue'} className={'w-4 h-4 cursor-pointer'} onClick={() => handleApproveById(data.id)}/>
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

            {dataApproval && totalPage > 1 ? (
              <Pagination
                onChange={handleChangePage}
                total={totalPage}
                current={currentPage}
              />
            ): !isLoading && (!dataApproval || dataApproval?.length == 0) ? (
              <NoData />
            ) : null}
          </CardBody>
        </Card>
      {dataApprover && dataApprover?.length > 0 && (
        <Card>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <Typography variant="h6" color="white">
              {'Approval Workshop'}
            </Typography>
          </CardHeader>
          <div className={'flex flex-row gap-1'}>

            {dataApprover && (
              <>
                <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
                  <Button
                    disabled={isLoading}
                    variant="filled"
                    color={'blue'}
                    className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                    onClick={() => setShowModalApproval({
                      show: true,
                      isApproval: false,
                      approvalAll: listSelected.length === 0, 
                      rejectAll: false,
                      approvalSelect: listSelected.length > 0,
                      rejectSelect: false,
                      id: ''
                    })}
                  >
                    {isLoading ? (
                      <>
                        <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                        <Typography
                          variant="small"
                          className="font-bold uppercase text-white text-center"
                        >
                          {'Loading ...'}
                        </Typography>
                      </>
                    ):(
                      <>
                        <HandThumbUpIcon strokeWidth={5} className="h-4 w-4 mr-2 mt-[1px]" />
                        <Typography
                          variant="small"
                          className="font-bold uppercase text-white "
                        >
                          {`${listSelected.length > 0 ? 'Approve' : 'Approve All'}`}
                        </Typography>
                      </>
                    )}
                    
                  </Button>
                </Badge>

                <Badge invisible={listSelected.length === 0}  content={listSelected.length}>
                  <Button
                    disabled={isLoading}
                    variant="filled"
                    color={'red'}
                    className={`p-2 ${listSelected.length > 0 ? 'w-30' : 'w-34 '} ml-4 flex mb-4 justify-center`}
                    onClick={() => setShowModalApproval({
                      show: true,
                      isApproval: false,
                      approvalAll: false, 
                      rejectAll: listSelected.length === 0,
                      approvalSelect: false,
                      rejectSelect: listSelected.length > 0,
                      id: ''
                    })}
                  >
                    {isLoading ? (
                      <>
                        <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                        <Typography
                          variant="small"
                          className="font-bold uppercase text-white text-center"
                        >
                          {'Loading ...'}
                        </Typography>
                      </>
                    ):(
                      <>
                        <HandThumbDownIcon strokeWidth={5} className="h-4 w-4 mr-2 mt-[1px]" />
                        <Typography
                          variant="small"
                          className="font-bold uppercase text-white "
                        >
                          {`${listSelected.length > 0 ? 'Rejected' : 'Rejected All'}`}
                        </Typography>
                      </>
                    )}
                  </Button>
                </Badge>
              </>
              
            )} 
          </div>
          
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                      <th className="border-b border-blue-gray-50 w-[2px] pl-2 text-center">
                        {/* <Checkbox color="green" checked={selectedAll} onClick={handleCheckAll} crossOrigin={undefined}  /> */}
                      </th>
                    
                    {dataHeaderApproval.map((data) => (
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
                  {isLoading ? <TableLoading row={8}/> : (
                    <>
                      {dataApprover && dataApprover.map(
                        (data, key) => {
                          const className = `py-3 px-5 ${
                            key === authorsTableData.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;
        
                          return (
                            <tr key={key}>
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
                                    {`${data?.createdAt.slice(0, 10)} ${data.createdAt.slice(11, 16)}`}
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
                                  {data?.workShopName}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {data?.workShopAddress}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >

                                  {`${data ? data?.workShopStart?.slice(0, 10) : ''} ${data.workShopStart && data.workShopStart?.slice(11, 16)}`}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                                >
                                  {`${data ? data.workShopEnd.slice(0, 10) : ''} ${data ? data.workShopEnd.slice(11, 16) : '-'}`}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="green"
                                  className={'font-semibold cursor-pointer'}
                                >
                                  {data?.note}
                                </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                onClick={() => data.documentAttachments ? handleDownloadDocs(data.documentAttachments) : null}
                                variant="small"
                                color={data.documentAttachments ? 'green' : 'gray'}
                                className={`font-semibold ${data.documentAttachments ? 'cursor-pointer' : ''} `}
                              >
                                {data.documentAttachments ? 'Download' : 'No Attachments'}
                              </Typography>
                            </td>
                              
                            <td className={className}>
                              <div className="flex gap-4">
                                <HandThumbUpIcon color="#66BB6A" className={'w-4 h-4 cursor-pointer'} onClick={() => setShowModalApproval(
                                  { show: true,  approvalSelect: false,
                                    rejectSelect: false, approvalAll: false, rejectAll: false, isApproval: true, id: data.id}
                                )}/>
                                <XCircleIcon color="#ef5350" className={'w-4 h-4 cursor-pointer'} onClick={() => setShowModalApproval(
                                  { show: true, approvalSelect: false,
                                    rejectSelect: false, approvalAll: false, rejectAll: false, isApproval: false, id: data.id}
                                )}/>
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
           
            
            {dataApprover && totalPage > 1 ? (
              <Pagination
                onChange={handleChangePageApprover}
                total={totalPageApprover}
                current={currentPageApprover}
              />
            ): !isLoading && (!dataApprover || dataApprover?.length == 0) ? (
              <NoData />
            ) : null}
          </CardBody>
        </Card>
      )}
      <Modal
        open={showModalApprovalDetail}
        header={'Detail Status Request'}
        handleClose={() => {
          setDataApprovalDetail(null)
          setShowModalApprovalDetail(false)
        }}
        body={
          <div className="w-full pt-4 grid gap-6 md:grid-cols-1 xl:grid-cols-1">
            <table className="w-full table-auto">
              <thead>
                <tr>
                    <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {'Date'}
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {'Note'}
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {'Status'}
                      </Typography>
                    </th>
                </tr>
              </thead>
              <tbody>
                {dataApprovalDetail && dataApprovalDetail.map((data: any, index) => {
                  const className = `py-3 px-5 ${
                    index === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={index}>
                      <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {`${data.createdAt.slice(0, 10)} ${data.createdAt.slice(11, 16)}`}
                          </Typography>
                      </td>
                      <td className={className}>
                          <Typography
                           variant="small"
                           color="blue-gray"
                           className="font-semibold"
                          >
                            {data.note}
                          </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color={data.status.includes('Waiting') ? 'orange': data.status.includes('Rejected') ? 'red' : 'green'}
                          className="font-semibold"
                        >
                          {data.status}
                        </Typography>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
        footer={<></>}
      />
      <Modal
        open={showModalApproval.show}
        header={`Are you sure want to ${showModalApproval.isApproval || showModalApproval.approvalAll || showModalApproval.approvalSelect ? 'Approved' : 'Rejected'} request ?`}
        handleClose={()=> { setShowModalApproval({
          show: false,
          isApproval: false,
          approvalAll: false, 
          rejectAll: false,
          approvalSelect: false,
          rejectSelect: false,
          id: ''
        }) }}
        body={
          <div className="w-full pt-4 grid gap-6 md:grid-cols-1 xl:grid-cols-1">
            <Input size="md" value={noteApprove} onChange={(e: any) => setNoteApprove(e.target.value)} label="Reason" color="green"/>
          </div>
        }
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              onClick={()=> handleApproveStatus(showModalApproval.isApproval)}
            >
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Yes"}
              </Typography>
            </Button>
            <Button
              variant="filled"
              color={"red"}
              className={"ml-4 mb-4 w-28 content-center p-2	"}
              onClick={() => setShowModalApproval({
                show: false,
                isApproval: false,
                approvalAll: false, 
                rejectAll: false,
                approvalSelect: false,
                rejectSelect: false,
                id: ''
              })}
            >
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"No"}
              </Typography>
            </Button>
          </div>
        }
      />
        <Modal  
          open={showModalForm}
          header={"Request Workshop"}
          handleClose={()=> { setShowModalForm(false) }}
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
                placeholder={<Typography variant="small" className="text-blue-gray-500 font-normal">Workshop Type *</Typography>}
                isClearable
                options={dataLeave ?? undefined}
                onChange={(selected: any) => {
                  setOvertimeType(selected.label);
                }}
                value={overtimeType ? {label: overtimeType, value: overtimeType}: null}

              />

              <Input size="md" value={address} onChange={(e: any) => setAddress(e.target.value)} label="Workshop Address" color="green"/>
              <InputDatePicker withTime size={'md'} label="Start Workshop *" value={dateStart} onChange={(e: any) => setDateStart(e)} />
              <InputDatePicker withTime size={'md'} label="End Workshop *" value={dateEnd} onChange={(e: any) => setDateEnd(e)} />
              <Input size="md" value={note} onChange={(e: any) => setNote(e.target.value)} label="Reason" color="green"/>
              <Input onChange={handleFileUpload} type="file" size="md" label="Documents" color="green"/>
            </div>
          }
          footer={
            <div className="flex flex-row-reverse">
                <Button
                  variant="filled"
                  color={'green'}
                  disabled={!dateStart || !dateEnd}
                  className={'p-2 w-28 ml-4 mb-4 content-center'}
                  onClick={handleSaveRequest}
                >
                  <Typography
                      variant="small"
                      className="font-bold uppercase text-white text-center"
                    >
                      {'Save'}
                    </Typography>
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
  )
}

export default Workshop;
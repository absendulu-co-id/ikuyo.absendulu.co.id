import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    IconButton,
    Input,
    Checkbox,
    button,
    Chip,
    Spinner,
    Badge,
    
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  ArrowRightIcon, 
  ArrowLeftIcon,
  PlusIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/app/data";
import { content, dataHeader } from "@/app/data/shift-company";
import { Modal, HeaderBack, TableLoading, NoData } from "@/app/components";
import TimeKeeper from "react-timekeeper";
import TimeField from "react-simple-timefield";
import { deleteDataShift, exportDataShift, getDataShift, getDataShiftPagination, postDataShift, updateDataShift } from "@/app/services/company/shift";
import { GetDataShift, GetShiftResponse } from "@/interface/company";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { isEmpty } from "@/utils/locDash";
import Pagination from "@/app/components/molecules/pagination";
import { snackBar } from "@/utils/snackbar";

const ShiftCompany = () => {
  const [dataShift, setDataShift] = useState<GetDataShift[] | null >(null)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [idDelete, setIdDelete] = useState<string>('')
  const searchData = useRecoilValue(searchAllAtom);
  const [query, setQuery] = useState<string | null>(null);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [dataEdit, setDataEdit] = useState<GetDataShift | null>(null)
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [selectedDays,setSelectedDays] = useState<Array<string>>([])
  const [dataForm, setDataForm] = useState({
    shiftCode: '',
    shiftName: '',
    startWorkTime: "00:00",
    endWorkTime: "00:00",
    startBreakTime: "00:00",
    endBreakTime: "00:00",
    maximumLate: "00:00",
    workDays: selectedDays,
  })

  const dataDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleClickDays = (buttonData) => {
    const buttonIndex = selectedDays.indexOf(buttonData)

    if (buttonIndex === -1) {
      setSelectedDays([...selectedDays, buttonData])
      setDataForm((prevValue)=> ({
        ...prevValue,
        workDays: [...selectedDays, buttonData]
      }))
    } else {
      const updatedButtons = [...selectedDays]
      updatedButtons.splice(buttonIndex, 1)
      setSelectedDays(updatedButtons)
      setDataForm((prevValue)=> ({
        ...prevValue,
        workDays: updatedButtons
      }))
    }
  }

  const onTimeChange = (event) => {
    if(dataForm){
      setDataForm((prevValue)=> ({
        ...prevValue,
        [event.target.name]: event.target.value
      }))
    }
  }  

  const getShiftPagination = async (params) => {
    setIsLoading(true)
    
    try {
      const response = await getDataShiftPagination(params) as GetShiftResponse
      if(response.data.length > 0) {
        setTotalPage(response.totalPages)
        setDataShift(response.data)
      }else{
        setDataShift(null)
      }
      setIsLoading(false)
    }catch(e: any) {
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const handleChangePage = (page: number) => {
    setOnPage(page),
    setCurrentPage(page)

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query
    }

    getShiftPagination(params)
    setListSelected([])
    setSelectedAll(false)
  }

  const resetValueForm = () => {
    setDataForm({
      shiftCode: '',
      shiftName: '',
      startWorkTime: "00:00",
      endWorkTime: "00:00",
      startBreakTime: "00:00",
      endBreakTime: "00:00",
      maximumLate: "00:00",
      workDays: [],
    })
  }

  const handleSave = async() => {
    setIsLoading(true)
    const payload = {
      shiftCode: dataForm.shiftCode,
      shiftName: dataForm.shiftName,
      startWorkTime: dataForm.startWorkTime,
      endWorkTime: dataForm.endWorkTime,
      startBreakTime: dataForm.startBreakTime,
      endBreakTime: dataForm.endBreakTime,
      maximumLate: dataForm.maximumLate,
      workDays: dataForm.workDays,
      
    }

    const response = await postDataShift(payload)
    if(response && !response.isError){
      resetValueForm()
      setSelectedDays([])
      setIsLoading(false)
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getShiftPagination(params)
      setShowModalForm(false)
      snackBar('success', 'Success Add Shift Data')
    }else{
      setIsLoading(false)
      resetValueForm()
      setSelectedDays([])
      setShowModalForm(false)
      snackBar('error', 'Failed Add Shift Data')
    }
  }

  const handleEditData = async(data: GetDataShift) => {
    setDataEdit(data)
    setDataForm((prevValue)=>{
      return{
        ...prevValue,
        shiftCode: data.shiftCode,
        shiftName: data.shiftName,
        startWorkTime: data.startWorkTime,
        endWorkTime: data.endWorkTime,
        startBreakTime: data.startBreakTime,
        endBreakTime: data.endBreakTime,
        maximumLate: data.maximumLate,
        workDays: data.workDays,
      }
    })
    setSelectedDays(data.workDays)
    setShowModalForm(true)
    setListSelected([])
    setSelectedAll(false)
  }

  const onEditData = async() => {
    setIsLoading(true)
    const payload = {
      shiftCode: dataForm.shiftCode,
      shiftName: dataForm.shiftName,
      startWorkTime: dataForm.startWorkTime,
      endWorkTime: dataForm.endWorkTime,
      startBreakTime: dataForm.startBreakTime,
      endBreakTime: dataForm.endBreakTime,
      maximumLate: dataForm.maximumLate,
      workDays: dataForm.workDays,
    }

    const response = await updateDataShift(
      dataEdit?.id.toString() || "",
      payload
    )

    if(response && !response.isError){
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getShiftPagination(params)
      setIsLoading(false)
      resetValueForm()
      setDataEdit(null)
      setSelectedDays([])
      setShowModalForm(false)
      snackBar('success', 'Success Edit Shift Data')
    }else{
      resetValueForm()
      setSelectedDays([])
      setIsLoading(false)
      setShowModalForm(false)
      snackBar('error', 'Failed Edit Shift Data')
    }
  }

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  }

  const handleDelete = async(id: string) => {
    setIsLoading(true)
    const response = await deleteDataShift(id)
    if(response && !response.isError){
      const dataAll = await getDataShift() as GetShiftResponse
      const totalData = Math.ceil(dataAll.data.length / 10)
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getShiftPagination(params)
      setShowModalDelete(false)
      snackBar('success', 'Success Delete Data Shift');
    }else{
      setShowModalDelete(false)
      snackBar('error', 'Failed Delete Data Shift');
    }
    setIsLoading(false)
  }

  const handleSelected = (data: GetDataShift) => {
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
      setListSelected(dataShift || []);
      setSelectedAll(true);
    }
  }

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataShift(listSelected);
      snackBar("success", "Success Download Data Shift");
      setIsLoading(false);
    } else {
      const dataAll = await getDataShift() as GetShiftResponse;
      if (dataAll?.data) await exportDataShift(dataAll?.data);
      snackBar("success", "Success Download Data Shift");
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
      if(dataShift) {
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
      getShiftPagination(params)
    }else{
      const params= {
        pageNumber: onPage,
      }
      getShiftPagination(params)
    }
  }, [query])  
  
  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
              {'Shift'}
            </Typography>
          </CardHeader>

          <div className={'flex flex-row gap-1'}>
            <Button
              variant="filled"
              color={'green'}
              className={'p-2 w-20 ml-4 flex mb-4'}
              onClick={() => {
                resetValueForm()
                setShowModalForm(true)
              }} 
            >
              <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
              <Typography
                  variant="small"
                  className="font-bold uppercase text-white"
                >
                  {'ADD'}
                </Typography>
            </Button>
            {dataShift && (
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

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="w-[2px] border-b border-blue-gray-50 pl-2 text-center">
                    <Checkbox
                      color="green"
                      checked={selectedAll}
                      onClick={handleCheckAll}
                      crossOrigin={undefined}
                    />
                  </th>
                  {dataHeader.map((data) => (
                    <th
                      key={data}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400 whitespace-nowrap"
                      >
                        {data}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableLoading row={8} />
                ) : (
                  <>                  
                    {dataShift && dataShift.map(
                      ( data: GetDataShift,
                        key) => {
                        const className = `py-3 px-5 ${
                          key === authorsTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;
      
                        return (
                          <tr key={data.shiftName}>
                            <td className="pl-2">
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
                                    {data.shiftCode}
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
                                {data.shiftName}
                                </Typography>
                            </td>
    
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="green"
                                  className="font-semibold"
                                >
                                    {data.startWorkTime}
                                </Typography>
                            </td>

                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                    {data.maximumLate}
                                </Typography>
                            </td>

                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                    {data.endWorkTime}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                    {data.startBreakTime}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                  variant="small"
                                  color="green"
                                  className="font-semibold"
                                >
                                    {data.endBreakTime}
                                </Typography>
                            </td>
                            <td className={className}>
                              <div className="flex items-center justify-center space-x-2 w-full">
                                {dataDays.map((days, i)=>(
                                  <Chip
                                  variant={`${data.workDays.includes(days) ? 'outlined' : 'ghost'  }`}
                                  color={`${data.workDays.includes(days) ? 'green' : 'blue-gray'  }`}
                                  size="sm"
                                  className={`rounded-full text-center text-xs`}
                                  value={days.slice(0,1)}
                                />
                                ))}
                              </div>
                            </td>
                            
                            <td className={className}>
                              <div className="flex gap-4">
                                <PencilIcon color="#66BB6A" 
                                  className={'w-4 h-4 cursor-pointer'}
                                  onClick={() => handleEditData(data)}
                                />
                                <TrashIcon 
                                  color="#ef5350" 
                                  className={'w-4 h-4 cursor-pointer'}
                                  onClick={()=>handleClickDelete(data.id.toString())}
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

            {dataShift && totalPage > 1 ? (
              <Pagination
                onChange={(handleChangePage)}
                total={totalPage}
                current={currentPage}
              />
            ) : !isLoading && !dataShift ? (
                <NoData />
              ) : null
            }
          </CardBody>
        </Card>

        <Modal 
          className="h-3/4 md:h-fit overflow-auto" 
          open={showModalForm}
          header={dataEdit ? "Edit Data Shift" : "Add Data Shift"}
          handleClose={()=> { 
            setShowModalForm(false) 
            resetValueForm()
            setDataEdit(null)
            setSelectedDays([])
          }}
          body={
            <>
            <div className="flex flex-row justify-around flex-wrap h-1/2 overflow-auto scroll-y-auto">
                <div className="md:basis-1/2 w-full p-2" >
                  <label htmlFor="shiftCode" className="text-xs">Shift Code</label>
                  <Input 
                    size="lg" 
                    color="green" 
                    defaultValue={dataForm.shiftCode} 
                    name="shiftCode"
                    onChange={onTimeChange}
                    crossOrigin={undefined} 
                    className="w-full"
                  />
                </div>
                <div className="md:basis-1/2 w-full p-2" >
                  <label htmlFor="shiftName" className="text-xs">Shift Name</label>
                  <Input 
                    size="lg" 
                    color="green" 
                    name="shiftName"
                    defaultValue={dataForm.shiftName} 
                    onChange={onTimeChange}
                    crossOrigin={undefined}
                    className="w-full"
                  />
                </div>
              <div className="basis-1/2 p-2" >
                <label htmlFor="startWorkTime" className="text-xs mb-2">Start of Work Time</label>
                <TimeField 
                  name="startWorkTime"
                  value={dataForm.startWorkTime} 
                  onChange={onTimeChange} 
                  style={{
                    width:"100%", 
                    borderWidth:1, 
                    borderColor: `${onfocus ? 'green' : 'gray'}`, 
                    borderStyle: "solid",
                    borderRadius: 8,
                    padding: 8,
                  }}
                />
              </div>
              <div className="basis-1/2 p-2" >
                <label htmlFor="endWorktime" className="text-xs mb-2">End of Work Time</label>
                <TimeField 
                  name="endWorkTime"
                  value={dataForm.endWorkTime} 
                  onChange={onTimeChange} 
                  style={{
                    width:"100%", 
                    borderWidth:1, 
                    borderColor:"gray", 
                    borderStyle: "solid",
                    borderRadius: 8,
                    padding: 8,
                  }}
                />
              </div>
              <div className="basis-1/2 p-2" >
                <label htmlFor="startBreakTime" className="text-xs mb-2">Start of Break Time</label>
                <TimeField 
                  name="startBreakTime"
                  value={dataForm.startBreakTime} 
                  onChange={onTimeChange} 
                  style={{
                    width:"100%", 
                    borderWidth:1, 
                    borderColor: "gray", 
                    borderStyle: "solid",
                    borderRadius: 8,
                    padding: 8,
                  }}
              />
              </div>
              <div className="basis-1/2 p-2" >
                <label htmlFor="endWorktime" className="text-xs mb-2">End of Break Time</label>
                <TimeField 
                  name="endBreakTime"
                  value={dataForm.endBreakTime} 
                  onChange={onTimeChange} 
                  style={{
                    width:"100%", 
                    borderWidth:1, 
                    borderColor: "gray", 
                    borderStyle: "solid",
                    borderRadius: 8,
                    padding: 8,
                  }}
              />
              </div>
              <div className="w-full flex flex-col p-2" >
                <label htmlFor="maximumLate" className="text-xs mb-2">Maximum Late</label>
                <TimeField 
                  name="maximumLate"
                  value={dataForm.maximumLate} 
                  onChange={onTimeChange} 
                  style={{
                    width:"50%", 
                    borderWidth:1, 
                    borderColor: `${onfocus ? 'green' : 'gray'}`, 
                    borderStyle: "solid",
                    borderRadius: 8,
                    padding: 8,
                  }}
                />
              </div>
            </div>
              <Typography className="text-xs mt-3 ml-2" >Choose Work Days</Typography>
              <div className="w-full p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-4 text-xs lg:text-md xl:text-xl rounded-xl mt-2">
                {dataDays.map((days, i)=> (
                  <button 
                    name="workDays"
                    key={i} 
                    type="button" 
                    onClick={() => handleClickDays(days)} 
                    className={`${selectedDays.includes(days) ? 'border-b-4 bg-green-100 border-green-700' : 'hover:border-b-4 border-green-700'
                    } cursor-pointer h-10 rounded-xl bg-gray-100 py-2 px-0 text-center text-xs text-gray-900 duration-300 `}
                  >
                      {days}
                  </button>
                ))}
              </div>
            </>

          }
          footer={
            <div className="flex flex-row-reverse">
              <Button
                variant="filled"
                color={'green'}
                className={'p-2 w-28 ml-4 mb-4 content-center'}
                onClick={dataEdit ? onEditData : handleSave } 
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
                onClick={() => {
                  setShowModalForm(false)
                  resetValueForm()
                  setSelectedDays([])
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

        <Modal
          open={showModalDelete}
          header={'Delete Data Shift'}
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
      </div>
  )
}

export default ShiftCompany;
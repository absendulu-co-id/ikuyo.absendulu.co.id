import { useEffect, useState } from "react";
import { HeaderBack, Modal, NoData } from "@/app/components";
import CardDevice from "@/app/components/molecules/CardDevice";
import Pagination from "@/app/components/molecules/pagination";
import { 
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
 } from "@heroicons/react/24/solid";
import { 
  Button, 
  Card, 
  Input, 
  Spinner, 
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import { getDataArea } from "@/app/services/company/area";
import CardDeviceLoading from "@/app/components/molecules/CardDevice/CardDeviceLoading";
import {
  deleteDataDevice,
  deviceReboot,
  disableAlarm,
  doorUnlock,
  getDataDevice,
  syncDataBio,
  syncDataDevice,
  updateDataDevice,
} from "@/app/services/device";
import { snackBar } from "@/utils/snackbar";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { isEmpty } from "@/utils/locDash";


export function Device() {
  const [dataDevice, setDataDevice] = useState<ListDataDevice[] | null >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);
  const [query, setQuery] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const [selectedArea, setSelectedArea] = useState("");
  const [dataArea, setDataArea] = useState<any>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [dataEditDevice, setDataEditDevice] = useState<any>({});
  const [disableEdit, setDisableEdit] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<number>(0);
  const [downloadBioLoading, setDownloadBioLoading] = useState<boolean>(false);
  const [rebootLoading, setRebootLoading] = useState<boolean>(false);
  const [doorUnlockLoading, setDoorUnlockLoading] = useState<boolean>(false);
  const [disableAlarmLoading, setDisableAlarmLoading] = useState<boolean>(false);
  const [syncSingleLoading, setSyncSingleLoading] = useState<boolean>(false);

  const searchData = useRecoilValue(searchAllAtom);

  const handleGetDataArea = async () => {
    let options: Array<object> = []
    const response = await getDataArea();
    await response.data.map((data) => {
      options.push({value: data.id, label: data.areaName})
    })

    setDataArea(options);
  }

  const handleGetDevice = async (params) => {
    setIsLoading(true);
    let datasDevice: ListDataDevice[] | null = null;

    try {
      const response = await getDataDevice(params);
      if (response.data.length > 0){
        
        setTotalPage(response.totalPages);
        datasDevice = response?.data?.map((data: any) => {
          return {
              idDevice: data.id,
              areaId: data.areaId || '-' ,
              areaName: data.areaName || '-',
              deviceName: data.deviceName || '-',
              deviceSn: data.deviceSn || '-',
              deviceIp: data.deviceIp || '-',
              isRegister: data.isRegistered,
              timezone: data.timezone || '-',
              totalEnrolledUser: data.totalEnrolledUser || '0',
              deviceAlias: data.deviceAlias || '-',
              lastHeartbeat: data.lastHeartbeat || '-',
          }
        })
      } else datasDevice = null
      setDataDevice(datasDevice);
    } catch(e) {
      setIsLoading(false);
    }

    setIsLoading(false);

  }

  const handleDownloadBio = async (id: number, deviceName: string) => {
    setDownloadBioLoading(true);
    try {
      const response = await syncDataBio(id);
      if (response.status === 'OK') {
        snackBar('success', `Berhasil sync BIO ${deviceName}`)
        setDownloadBioLoading(false);
      }
    } catch (err) {
      setDownloadBioLoading(false);
    } finally {
      setDownloadBioLoading(false);
    }
    
  }

  const handleEdit = async () => {
    setIsLoading(true);
    const payload = {
      areaId: selectedArea,
      deviceAlias: deviceName
    }

    const response = await updateDataDevice(dataEditDevice.idDevice, payload);
    if(response.status === 'OK') {
      setShowEdit(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      handleGetDevice(params);
      snackBar('success', response.message)
    }
  }

  const handleSyncDevice = async () => {
    setIsLoading(true);

    const dataSync = dataArea.map((data: any) => data.value);
    try {
      const params = {
        areaId: dataSync
      }
      const response = await syncDataDevice(params as any);

      if (response) {
        const params = {
          pageNumber: onPage,
          search: isEmpty(query) ? null : query,
        }
        handleGetDevice(params);
        setIsLoading(false);
        snackBar('success', "Sync device success")
      }
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleRefreshData = async () => {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      handleGetDevice(params);
  }
  

  const handleClickEdit = (data: ListDataDevice) => {
    setDataEditDevice({
      idDevice: data.idDevice,
      deviceAlias: data.deviceAlias === '-' ? '' : data.deviceAlias,
      areaId: data.areaId === '-' ? '' : data.areaId
    })

    setSelectedArea(data.areaId === '-' ? '' : data.areaId);
    setDeviceName(data.deviceAlias === '-' ? '' : data.deviceAlias);

    setShowEdit(true);
  }

  const handleDelete = async (id: number) => {
    const response = await deleteDataDevice(id);
    if(response) setShowModalDelete(false);

    const params = {
      pageNumber: onPage,
      search: isEmpty(query) ? null : query,
    }
    handleGetDevice(params);
  }

  const handleRebootDevice = async (id: number, deviceName: string) => {
    setRebootLoading(true);
    try {
      const response = await deviceReboot(id);
      if (response.status === 'OK') {
        snackBar('success', `Berhasil reboot device ${deviceName}`)
        setRebootLoading(false);
      }
    } catch (err) {
      setRebootLoading(false);
    } finally {
      setRebootLoading(false);
    }
    
  }

  const handleDoorUnlock = async (id: number, deviceName: string) => {
    setDoorUnlockLoading(true)
    try {
      const response = await doorUnlock(id);
      if (response.status === 'OK') {
        snackBar('success', `Berhasil unlock door ${deviceName}`)
        setDoorUnlockLoading(false);
      }
    } catch (err) {
      setDoorUnlockLoading(false);
    } finally {
      setDoorUnlockLoading(false);
    }
    
  }

  const handleDisableAlarm = async (id: number, deviceName: string) => {
    setDisableAlarmLoading(true);
    try {
      const response = await disableAlarm(id);
      if (response.status === 'OK') {
        snackBar('success', `Berhasil menonaktifkan alarm ${deviceName}`)
        setDoorUnlockLoading(false);
      }
    } catch (err) {
      setDisableAlarmLoading(false);
    } finally {
      setDisableAlarmLoading(false);
    }
    
  }

  const handleSyncSingleDevice = async (areaId: string, deviceName: string) => {
    setSyncSingleLoading(true);
    try {
     
      const response = await syncDataDevice({ areaId } as any);
      if (response) {
        setSyncSingleLoading(false);
        snackBar('success', `Sync ${deviceName} success`)
      }
    } catch (err) {
      setSyncSingleLoading(false);
    } finally {
      setSyncSingleLoading(false);
    }
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getDataDevice(params);
  }

  useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataDevice) {
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
        handleGetDevice(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        handleGetDevice(params);
      }
    }
  }, [query]);

  useEffect(() => {
    if(selectedArea === dataEditDevice.areaId && deviceName === dataEditDevice.deviceAlias)
      setDisableEdit(true);
    else setDisableEdit(false);

  }, [selectedArea, deviceName, showEdit]) 

  useEffect(() => {
    setIsLoading(true);
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000)
    handleGetDataArea()
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-4 ">
      <Card variant="gradient" color="green" className="mb-6 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          {'Device'}
        </Typography>
      </Card>
      <div className="flex flex-row gap-3">
        <Button
            variant="filled"
            color={'green'}
            className={'p-2 w-40 flex justify-center' }
            onClick={handleSyncDevice}
          >
            <ArrowPathIcon strokeWidth={4} className={`h-4 w-4 mr-2 mt-[2px] ${isLoading && 'animate-spin' }`} />
            <Typography
                variant="small"
                className="font-bold uppercase text-white "
              >
                {'Sync Device'}
              </Typography>
        </Button>
        <Button
            variant="filled"
            color={'blue'}
            className={'p-2 w-40 flex justify-center' }
            onClick={handleRefreshData}
          >
            <ArrowPathRoundedSquareIcon strokeWidth={4} className={`h-4 w-4 mr-2 mt-[2px] ${isLoading && 'animate-spin' }`} />
            <Typography
                variant="small"
                className="font-bold uppercase text-white "
              >
                {'Refresh Data'}
              </Typography>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {isLoading ? (
          <CardDeviceLoading/>
        ): (
          <>
            {dataDevice && dataDevice.map((data, index) => (
              <CardDevice
                key={index}
                onClickDelete={() => {
                  setIdDelete(data.idDevice)
                  setShowModalDelete(true)
                }}
                loadingSyncSingle={syncSingleLoading}
                loadingDownloadBio={downloadBioLoading}
                loadingReboot={rebootLoading}
                loadingDoorUnlock={doorUnlockLoading}
                loadingDisableAlarm={disableAlarmLoading}
                onClickDownloadBio={()=> handleDownloadBio(data.idDevice, data.deviceAlias)}
                onClickEdit={() => handleClickEdit(data)}
                onClickReboot={() => handleRebootDevice(data.idDevice, data.deviceAlias)}
                onClickDoorUnlock={() => handleDoorUnlock(data.idDevice, data.deviceAlias)}
                onClickDisableAlarm={() => {handleDisableAlarm(data.idDevice, data.deviceAlias)}}
                onClickSyncSingle={() => handleSyncSingleDevice(data.areaId, data.deviceAlias)}
                list={data}
              />
            ))}
          </>
        )}
        
        
      </div>
      {totalPage > 1  ? (
        <Pagination
          onChange={handleChangePage}
          total={totalPage}
          current={currentPage}
        />
      ): !isLoading && !dataDevice  ? (
        <NoData/>
      ): null} 
      <Modal
        open={showModalDelete}
        header={'Disconnect Device'}
        handleClose={()=> setShowModalDelete(false)}
        body={
          <>
          </>
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
                    {'Disconnect'}
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
        open={showEdit}
        size="lg"
        header={'Edit Data Device'}
        handleClose={()=> {setShowEdit(false)}}
        body={
          <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2 mb-4">
            <Input className={'border border-gray-300'} value={deviceName} size="lg" label="Device Name (Alias)" color="green" onChange={(e) => setDeviceName(e.target.value)} crossOrigin={undefined}/>
            <Select size="lg" value={selectedArea} onChange={(e) => {setSelectedArea(e || '')}} label="Area" color={'green'}>
              {dataArea.map((data: any, index) => (
                <Option key={index} value={data.value}>{data.label}</Option>
              ))}
            </Select>
            {/* <Select
              // isMultiple
              primaryColor={'green'}
              value={selectedArea} 
              onChange={handleChange}
              options={dataArea}
              isSearchable
              searchInputPlaceholder={'Select Area'}
            /> */}
          </div>
        }

        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={'green'}
              disabled={disableEdit}
              className={'p-2 w-28 ml-4 mb-4 flex flex-row justify-center'}
              onClick={handleEdit}
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
              onClick={() => {setShowEdit(false)}}
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
  );
}

export default Device;

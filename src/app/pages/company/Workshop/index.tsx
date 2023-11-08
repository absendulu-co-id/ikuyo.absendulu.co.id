import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Checkbox,
    Badge,
    Spinner,
    Input
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/solid";
import { dataHeader } from "@/app/data/workshop";
import { HeaderBack, TableLoading, NoData, Modal } from "@/app/components";
import { GetDataWorkshopResponse, GetWorkshopResoponse } from "@/interface/company";
import {
  deleteDataWorkshop,
  exportDataWorkshop,
  getDataWorkshop,
  getDataWorkshopPagination,
  postDataWorkshop,
  updateDataWorkshop,
} from "@/app/services/company/workshopType";

import { snackBar } from "@/utils/snackbar";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { isEmpty } from "@/utils/locDash";
import Pagination from "@/app/components/molecules/pagination";


const Workshop = () => {
  const [active, setActive] = useState(1);
  const [dataWorkshop, setDataWorkshop] = useState<GetDataWorkshopResponse[] | null >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('')
  const [dataEdit, setDataEdit] = useState<GetDataWorkshopResponse | null>(null);
  const [workshopName, setWorkshopName] = useState<string>('');
  const [workshopCode, setWorkshopCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [query, setQuery] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);

  const searchData = useRecoilValue(searchAllAtom);


  const getWorkshopPagination = async (params) => {
    setIsLoading(true);

    try {
      const response = await getDataWorkshopPagination(params) as GetWorkshopResoponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataWorkshop(response.data);
      } else {
        setDataWorkshop(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const handleCheckAll = () => {
    if(selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataWorkshop || []);
      setSelectedAll(true);
    }
    
  }

  const handleSelected = (data: GetDataWorkshopResponse) => {
    if(listSelected.includes(data)) {
      const arrayFilter = listSelected.filter(e => e !== data)
      setListSelected(arrayFilter);
      
    } else {
      setListSelected([...listSelected, data])
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    const response = await deleteDataWorkshop(id);

    if(response) {
      setShowModalDelete(false);
      const dataAll = await getDataWorkshop() as GetWorkshopResoponse;
      const totalData = Math.ceil(dataAll.data.length / 10);
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getWorkshopPagination(params);
      snackBar('success', 'Data Workshop delete successfully')
    }else{
      setShowModalDelete(false);
      snackBar('error', 'Failed Delete Data Workshop')
    }
    setIsLoading(false);
  }

  const resetValueForm = () => {
    setWorkshopCode('');
    setWorkshopName('');
    setDescription('');
  }

  const onEditData = async() => {
    setIsLoading(true);
    const payload = {
      workshopCode,
      workshopName,
      description,
    }
    const response =  await updateDataWorkshop(dataEdit?.id.toString() || '', payload);
    if(response && !response.isError) {
      const params = {
        pageNumbers: onPage,
        search: isEmpty(query) ? null : query
      }
      getWorkshopPagination(params);
      setShowModalForm(false);
      snackBar('success', 'Data Workshop edited successfully');
    }else{
      setShowModalForm(false);
      snackBar('error', 'Failed Edit Data Workshop')
    }
      setDataEdit(null);
      resetValueForm();
      setIsLoading(false);
  }

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  }

  const handleEditData = async (data : GetDataWorkshopResponse) => {
    setDataEdit(data);
    setWorkshopName(data.workshopName);
    setWorkshopCode(data.workshopCode);
    setDescription(data.description);
    setShowModalForm(true);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      workshopCode,
      workshopName,
      description,
    }

    const response = await postDataWorkshop(payload);
    if(response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getWorkshopPagination(params);
      setShowModalForm(false);
      snackBar('success', 'Data Workshop save successfully');
    } else {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getWorkshopPagination(params);
      setShowModalForm(false);
      snackBar('error', 'Failed Add Data Workshop')
    }
    setIsLoading(false);
    resetValueForm();
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    }

    getWorkshopPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleExportData = async () => {

    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataWorkshop(listSelected);
      snackBar("success", "Data Workshop successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataWorkshop() as GetWorkshopResoponse;
      if (dataAll.data) await exportDataWorkshop(dataAll?.data);
      snackBar("success", "Data Workshop successfully downloaded");
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
      if(dataWorkshop) {
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
        getWorkshopPagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getWorkshopPagination(params);
      }
    }
  }, [query])

  return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
              {'Workshop Type'}
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

            {dataWorkshop && (
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

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {dataWorkshop && 
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
                    {dataWorkshop &&  dataWorkshop.map(
                      (data: GetDataWorkshopResponse, index) => {
                        const className = `py-3 px-5 border-b border-blue-gray-50 capitalize`;
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
                                    {data.workshopCode}
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
                                    {data.workshopName}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                >
                                    {data.description}
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
                )}
                
              </tbody>
            </table>
            {dataWorkshop && totalPage > 1 ? (
              <Pagination
                onChange={handleChangePage}
                total={totalPage}
                current={currentPage}
              />

            ) : !isLoading && !dataWorkshop ? (
              <NoData />
            ) : null}
          </CardBody>
        </Card>
        <Modal
          open={showModalDelete}
          header={'Delete Data Workshop'}
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
          header={ dataEdit ? "Edit Data Workshop" : "Add Data Workshop"}
          handleClose={()=> { 
            setShowModalForm(false) ;
            resetValueForm();
            setDataEdit(null);
          }}
          body={
            <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              <Input value={workshopCode} size="lg" label="Workshop Code" color="green" onChange={(e) => setWorkshopCode(e.target.value)} crossOrigin={undefined}/>
              <Input value={workshopName} size="lg" label="Workshop Name" color="green" onChange={(e) => setWorkshopName(e.target.value)} crossOrigin={undefined}/>
              <Input value={description} size="lg" label="Description" color="green" onChange={(e) => setDescription(e.target.value)} crossOrigin={undefined}/>
            </div>
          }

          footer={
            <div className="flex flex-row-reverse">
                <Button
                  variant="filled"
                  color={'green'}
                  disabled={isLoading || (!workshopName && !workshopCode)}
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

export default Workshop;
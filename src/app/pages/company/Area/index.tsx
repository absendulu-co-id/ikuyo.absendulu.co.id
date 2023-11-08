import * as React from 'react';
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Checkbox,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { authorsTableData } from "@/app/data";
import { dataHeader } from '@/app/data/area';
import { Button } from "@material-tailwind/react";
import { TrashIcon, PencilIcon, PlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { snackBar } from '@/utils/snackbar';
import {
  deleteDataArea,
  postDataArea,
  updateDataArea,
  getDataAreaPagination,
  exportDataArea,
  getDataArea,
} from '@/app/services/company/area';
import { GetAreaResponse, GetDataAreaResponse } from '@/interface/area';
import { TableLoading, NoData, HeaderBack } from '@/app/components';
import Modal from '@/app/components/molecules/modal';
import Pagination from '@/app/components/molecules/pagination';
import { useRecoilValue } from 'recoil';
import { searchAllAtom } from '@/app/recoils/search';
import { isEmpty } from '@/utils/locDash';

export interface IAreaProps {
}

export default function Area (props: IAreaProps) {
  const [dataArea, setDataArea] = React.useState<GetDataAreaResponse[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModalForm, setShowModalForm] = React.useState<boolean>(false);
  const [areaName, setAreaName] = React.useState<string>('');
  const [areaCode, setAreaCode] = React.useState<string>('');
  const [idArea, setIdArea] = React.useState<string>('');
  const [showModalDelete, setShowModalDelete] = React.useState<boolean>(false);
  const [dataEdit, setDataEdit] = React.useState<GetDataAreaResponse | null>(null);
  const [selectedAll, setSelectedAll] = React.useState<boolean>(false);
  const [listSelected, setListSelected] = React.useState<Array<object>>([]);

  const [query, setQuery] = React.useState<string | null>(null);

  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [onPage, setOnPage] = React.useState<number>(1);

  // get data search global
  const searchData = useRecoilValue(searchAllAtom);

  const handleClose = () => {
    setShowModalForm(false);
    setShowModalDelete(false);
  };

  const resetValueForm = () => {
    setAreaCode("");
    setAreaName("");
  }

  const handleOpen = () => {
    setShowModalForm(true);
    resetValueForm();
    setDataEdit(null);
  };

  const getDatasAreaPagination = async (params) => {
    setIsLoading(true);

    try {
      const response = await getDataAreaPagination(params) as GetAreaResponse;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataArea(response.data);
      } else {
        setDataArea(null)
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const handleSave = async () => {
    const payload = {
      areaCode: areaCode,
      areaName: areaName
    };

    const response = await postDataArea(payload);

    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasAreaPagination(params);
      setShowModalForm(false);
      snackBar("success", "Data Area added successfully")
    } else {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasAreaPagination(params);
      setShowModalForm(false);
      snackBar("error", "Failed Add Data Area")
    }
  }

  const handleClickDelete = (id: string) => {
    setIdArea(id);
    setShowModalDelete(true);
  }

  const handleDelete = async (id: string) => {
    const response = await deleteDataArea(id);

    if (response) {
      const dataAll = await getDataArea() as GetAreaResponse;
      const totalData = Math.ceil(dataAll.data.length / 10);
      const params = {
        pageNumber: totalData < onPage ? totalData : onPage,
        search: isEmpty(query) ? null : query,
      }
      getDatasAreaPagination(params);
      snackBar('success', 'Data Area deleted successfully');
    }else{
      snackBar('error', 'Failed Detele Data Area');
    }

    setShowModalDelete(false);
  }

  const handleEditData = async (data: GetDataAreaResponse) => {
    setDataEdit(data);
    setAreaCode(data.areaCode);
    setAreaName(data.areaName);
    setShowModalForm(true);
    setListSelected([]);
    setSelectedAll(false);
  }

  const onEditData = async () => {
    setIsLoading(true);
    const payload = {
      areaCode,
      areaName
    }

    const response = await updateDataArea(dataEdit?.id.toString() || '', payload);
    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      }

      getDatasAreaPagination(params);
      resetValueForm();
      setShowModalForm(false);
      snackBar("success", "Data Area edited successfully")
    }else{
      setShowModalForm(false);
      snackBar("error", "Failed Edit Data Area")
    }
    setIsLoading(false);
  }

  const handleSelected = (data: GetDataAreaResponse) => {

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
      setListSelected(dataArea || []);
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

    getDatasAreaPagination(params);
    setListSelected([]);
    setSelectedAll(false);
  }

  const handleExportData = async () => {
    setIsLoading(true);

    if (listSelected.length > 0) {
      await exportDataArea(listSelected);
      snackBar("success", "Data Area successfully downloaded");
      setIsLoading(false);
    } else {
      const dataAll = await getDataArea() as GetAreaResponse;
      if (dataAll.data) await exportDataArea(dataAll?.data);
      snackBar("success", "Data Area successfully downloaded");
      setIsLoading(false);
    }
    
  }

  React.useEffect(() => {
    if(searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
       
      }, 1500)
  
      return () => clearTimeout(delaySearch)
    } else {
      if(dataArea) {
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
        getDatasAreaPagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getDatasAreaPagination(params);
      }
    }
  }, [query]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 inset-2">
    <Card>
      <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
        <HeaderBack />
        <Typography variant="h6" color="white">
          Area
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
        {dataArea && (
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

              {dataArea && 
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
            {isLoading ? <TableLoading row={3} /> : (
              <>
                {dataArea && dataArea.map(
                  (data: GetDataAreaResponse, index) => {
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
                                {data.areaName}
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
                            {data.areaCode}
                          </Typography>
                        </td>
                        
                        <td className={className}>
                          <div className='flex flex-row gap-4'>
                            <PencilIcon
                              color='green'
                              className='w-4 h-4 cursor-pointer'
                              onClick={() => handleEditData(data)}
                            />
                            <TrashIcon
                              color='red'
                              className='w-4 h-4 cursor-pointer'
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

      {dataArea && totalPage > 1 ? (
        <Pagination
          onChange={handleChangePage}
          total={totalPage}
          current={currentPage}
        />

      ) : !isLoading && !dataArea ? (
        <NoData />
      ) : null}
      </CardBody>
    </Card>

    <Modal
      open={showModalForm}
      header={dataEdit ? `EDIT DATA AREA` : `ADD DATA AREA`}
      handleClose={handleClose}
      body={
        <div className="w-full grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        <Input value={areaName} size="lg" label="Nama Area" color="green" onChange={(e: { target: { value: any; }; }) => setAreaName(e.target.value)} crossOrigin={undefined}/>
        <Input value={areaCode} size="lg" label="Kode Area" color="green" onChange={(e: { target: { value: any; }; }) => setAreaCode(e.target.value)} crossOrigin={undefined}/>
      </div>
      }
      footer={
        <div className="flex flex-row-reverse">
          <Button
            variant="filled"
            color={'green'}
            disabled={!areaCode || !areaName}
            className={'p-2 w-28 ml-4 mb-4 content-center'}
            onClick={dataEdit ? onEditData : handleSave}
          >
            <div className="flex flex-row justify-center items-center gap-2">
              {isLoading && <Spinner className="h-4 w-4" color="green" />}
              <Typography
                  variant="small"
                  className="font-bold uppercase text-white text-center"
                >
                  {'Save'}
              </Typography>

            </div>
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
            onClick={() => handleDelete(idArea)}
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
  );
}

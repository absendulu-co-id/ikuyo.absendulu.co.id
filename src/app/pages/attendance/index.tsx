import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
  Checkbox,
  Badge,
} from "@material-tailwind/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { authorsTableData } from "@/app/data";
import { content, dataTable } from "@/app/data/attendance";
import { IFrame, NoData } from "@/app/components";
import { GetAttendanceResponse, GetDataAttendances } from "@/interface/attendance";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/Actions/setLoading";
import { exportDataAttendance, getAttendance, getDataAttendancePagination } from "@/app/services/attendance";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { isEmpty } from "@/utils/locDash";
import Pagination from "@/app/components/molecules/pagination";
import store from "@/redux/Store";
import { snackBar } from "@/utils/snackbar";

export function Attendance() {
  const [dataAttendances, setDataAttendances] = useState<GetDataAttendances[] | null>(null)
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onPage, setOnPage] = useState<number>(1);

  const [iframeState, setIFrameState] = useState<{
    showIFrameForm: boolean;
    varname: string;
    varphoto: string;
    varaddress: string;
    varclockin: string;
  }>({
    showIFrameForm: false,
    varname: "",
    varphoto: "",
    varaddress: "",
    varclockin: "",
  });

  const handleClose = () => {
    setIFrameState({
      showIFrameForm: false,
      varname: "",
      varphoto: "",
      varaddress: "",
      varclockin: "",
    });
  };

  const dispatch = useDispatch()
  const searchData = useRecoilValue(searchAllAtom);

  const getAttendancePagination = async (params) => {
    dispatch(setLoading(true))

    try {
      const response = await getDataAttendancePagination(params) as GetAttendanceResponse
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataAttendances(response.data);
      } else {
        setDataAttendances(null);
      }
      dispatch(setLoading(false));
    } catch (e: any) {
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500)

      return () => clearTimeout(delaySearch)
    } else {
      if (dataAttendances) {
        const delaySearch = setTimeout(() => {
          setQuery("");
        }, 1500)

        return () => clearTimeout(delaySearch)
      } else setQuery("")
    }
  }, [searchData])

  useEffect(() => {
    if (query !== null) {
      if (query.length > 0) {
        const params = {
          search: isEmpty(query) ? null : query,
        }
        getAttendancePagination(params);
      } else {
        const params = {
          pageNumber: onPage
        }
        getAttendancePagination(params);
      }
    }
  }, [query]);

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    };

    getAttendancePagination(params);
    setListSelected([]);
    setSelectedAll(false);
  };

  const handleSelected = (data: GetDataAttendances) => {

    if (listSelected.includes(data)) {
      const arrayFilter = listSelected.filter(e => e !== data)
      setListSelected(arrayFilter);

    } else {
      setListSelected([...listSelected, data]);
    }
  }

  const handleCheckAll = () => {
    if (selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataAttendances || []);
      setSelectedAll(true);
    }

  }

  const handleExportData = async () => {
    dispatch(setLoading(true));

    if (listSelected.length > 0) {
      await exportDataAttendance(listSelected);
      snackBar("success", "Data Attendance successfully downloaded");
      dispatch(setLoading(false));
    } else {
      const dataAll = await getAttendance() as GetAttendanceResponse;
      if (dataAll.data) await exportDataAttendance(dataAll?.data);
      snackBar("success", "Data Attendance successfully downloaded");
      dispatch(setLoading(false));
    }

  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {"Attendance"}
          </Typography>
        </CardHeader>
        <div className='flex flex-row gap-1'>
          {dataAttendances && (
            <Badge invisible={listSelected.length === 0} content={listSelected.length}>
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
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-10">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {dataAttendances &&
                  <th className="border-b border-blue-gray-50 w-[2px] pl-2 text-center">
                    <Checkbox color="green" checked={selectedAll} onClick={handleCheckAll} crossOrigin={undefined} />
                  </th>
                }
                {dataTable.map((data) => (
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
              {dataAttendances && dataAttendances.map(
                (data: GetDataAttendances, index) => {
                  const className = `py-3 px-5 ${index === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={index}>
                      <td className="border-b border-blue-gray-50 pl-2">
                        <Checkbox color="green" checked={listSelected.includes(data)} onClick={() => handleSelected(data)} crossOrigin={undefined} />
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.employeeName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.departmentName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.employeeShift ? data.employeeShift : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`text-xs font-semibold`}
                        >
                          {data.clockIn}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold truncate ..."
                        >
                          {data.clockInAddress?.slice(0, 20)} ...
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.clockInMethod ? data.clockInMethod : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.clockInNote ? data.clockInNote : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex justify-center">
                          <EyeIcon
                            color="#66BB6A"
                            className="h-4 w-4 cursor-pointer"
                            onClick={() =>
                              setIFrameState({
                                ...iframeState,
                                showIFrameForm: true,
                                varname: data.employeeName,
                                varphoto: data.clockinPhoto,
                                varaddress: data.clockInAddress,
                                varclockin: data.clockIn,
                              })
                            }
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`text-xs font-semibold`}
                        >
                          {data.clockOut ? data.clockOut : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.clockOutAddress ? data.clockOutAddress : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.clockOutMethod ? data.clockOutMethod : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-xs font-semibold"
                        >
                          {data.clockOutNote ? data.clockOutNote : '-'}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex justify-center">
                          {!data.clockoutPhoto ?
                            <EyeSlashIcon
                              color="#66BB6A"
                              className="h-4 w-4 cursor-pointer"
                            />
                            : <EyeIcon
                              color="#66BB6A"
                              className="h-4 w-4 cursor-pointer"
                              onClick={() =>
                                setIFrameState({
                                  ...iframeState,
                                  showIFrameForm: true,
                                  varname: data.employeeName,
                                  varphoto: data.clockoutPhoto,
                                  varaddress: data.clockOutAddress,
                                  varclockin: data.clockOut,
                                })
                              }
                            />
                          }
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {dataAttendances && totalPage > 1 ? (
            <Pagination
              onChange={handleChangePage}
              total={totalPage}
              current={currentPage}
            />
          ) : store.getState() && !dataAttendances ? (
            <NoData />
          ) : null}
        </CardBody>
      </Card>
      <IFrame
        open={iframeState.showIFrameForm}
        handleClose={handleClose}
        name={iframeState.varname}
        url={iframeState.varphoto}
        address={iframeState.varaddress}
        clockin={iframeState.varclockin}
      />
    </div>
  );
}

export default Attendance;

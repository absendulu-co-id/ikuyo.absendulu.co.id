import {
    HeaderBack,
    InputDatePicker,
    NoData,
    TableLoading,
  } from "@/app/components";
  import { dataHeader } from "@/app/data/schedule";
  import { setLoading } from "@/redux/Actions/setLoading";
  import store from "@/redux/Store";
  import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Spinner,
    Typography,
  } from "@material-tailwind/react";
  import { useDispatch } from "react-redux";
  import { useState, useEffect } from "react";
  import { useRecoilValue } from "recoil";
  import { searchAllAtom } from "@/app/recoils/search";
  import { isEmpty } from "@/utils/locDash";
  import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
  import Pagination from "@/app/components/molecules/pagination";
  import {
    exportDataListSchedule,
    getAllListSchedule,
    getSchedulePagination,
  } from "@/app/services/schedule";
  import {
    GetScheduleByDate,
    GetScheduleByDateResponse,
  } from "@/interface/schedule";
  import { snackBar } from "@/utils/snackbar";
  
  export function ListSchedule() {
    const dispatch = useDispatch();
    const searchData = useRecoilValue(searchAllAtom);
  
    const [query, setQuery] = useState<string | null>(null);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [onPage, setOnPage] = useState<number>(1);
    const [data, setData] = useState<GetScheduleByDate[] | null>(null);
    const [selectedAll, setSelectedAll] = useState<boolean>(false);
    const [listSelected, setListSelected] = useState<Array<object>>([]);
  
    const today = new Date();
    const todayString = today.toLocaleString();
    const todaySliced = todayString.split("/");
    const todayMonth = todaySliced[0];
    const todayDay = todaySliced[1];
    const todayYear = todaySliced[2].slice(0, 4);
    const formattedToday = `${todayYear}-${todayMonth}-${todayDay}`;
  
    const [startDate, setStartDate] = useState<Date | string>(formattedToday);
    const [toDate, setToDate] = useState<Date | string>(formattedToday);
    const [dateRange, setDateRange] = useState([today, today]);
    const [start, to] = dateRange;
  
    const startDateToString = start.toLocaleString();
    const startDateParts = startDateToString.split("/");
    const startMonth = startDateParts[0];
    const startDay = startDateParts[1];
    const startYear = startDateParts[2].slice(0, 4);
    const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
  
    let formattedTo;
    if (to) {
      const toDateToString = to.toLocaleString();
      const toDateParts = toDateToString.split("/");
      const toMonth = toDateParts[0];
      const toDay = toDateParts[1];
      const toYear = toDateParts[2].slice(0, 4);
      const formattedToDate = `${toYear}-${toMonth}-${toDay}`;
      formattedTo = formattedToDate;
    }
  
    const getScheduleByDate = async (params) => {
      dispatch(setLoading(true));
      try {
        const response = (await getSchedulePagination(
          params
        )) as GetScheduleByDateResponse;
        if (response.data.length > 0) {
          setTotalPage(response.totalPages);
          setData(response.data);
        } else {
          setData(null);
        }
        dispatch(setLoading(false));
      } catch (e: any) {
        dispatch(setLoading(false));
      }
      dispatch(setLoading(false));
    };
    
    const onClickGo = () => {
      const params = {
        startDate: formattedStartDate,
        toDate: formattedTo,
      };
      getScheduleByDate(params);
    };
  
    const handleChangePage = (page: number) => {
      setOnPage(page), setCurrentPage(page);
  
      const params = {
        startDate: formattedStartDate,
        toDate: formattedTo,
        pageNumber: page,
        search: isEmpty(query) ? null : query,
      };
  
      getScheduleByDate(params);
      setListSelected([]);
      setSelectedAll(false);
    };
  
    const handleSelected = (data: GetScheduleByDate) => {
      if (listSelected.includes(data)) {
        const arrayFilter = listSelected.filter((e) => e !== data);
        setListSelected(arrayFilter);
      } else {
        setListSelected([...listSelected, data]);
      }
    };
  
    const handleCheckAll = () => {
      if (selectedAll) {
        setListSelected([]);
        setSelectedAll(false);
      } else {
        setListSelected(data || []);
        setSelectedAll(true);
      }
    };
  
    const handleExportData = async () => {
      dispatch(setLoading(true));
  
      if (listSelected.length > 0) {
        await exportDataListSchedule(listSelected);
        dispatch(setLoading(false));
        snackBar("success", "Data Schedule successfully downloaded");
      } else {
        const params = {
          startDate: formattedStartDate,
          toDate: formattedTo,
        };
        const dataAll = await getAllListSchedule(params) as GetScheduleByDateResponse
        if (dataAll.data) await exportDataListSchedule(dataAll?.data);
        snackBar("success", "Data Schedule successfully downloaded");
        dispatch(setLoading(false));
      }
    };
  
    useEffect(() => {
      if (searchData) {
        const delaySearch = setTimeout(() => {
          setQuery(searchData);
        }, 1500);
  
        return () => clearTimeout(delaySearch);
      } else {
        if (data) {
          const delaySearch = setTimeout(() => {
            setQuery("");
          }, 1500);
  
          return () => clearTimeout(delaySearch);
        } else setQuery("");
      }
    }, [searchData]);
  
    useEffect(() => {
      if (query !== null) {
        if (query.length > 0) {
          const params = {
            search: isEmpty(query) ? null : query,
          };
          getScheduleByDate(params);
        } else {
          const params = {
            startDate,
            toDate,
            pageNumber: onPage,
          };
          getScheduleByDate(params);
        }
      }
    }, [query]);
  
    return (
      <div className="inset-2 mt-12 mb-8 flex flex-col gap-1">
        <Card>
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-8 flex flex-row gap-4 p-6"
          >
            <HeaderBack />
            <Typography variant="h6" color="white">
              {"Schedule"}
            </Typography>
          </CardHeader>  
            <div className="mt-5">
              <div
                className={`${
                  data ? "justify-between" : "justify-end"
                } mb-2 flex w-full gap-1 px-5`}
              >
                {data && (
                  <Badge
                    invisible={listSelected.length === 0}
                    content={listSelected.length}
                  >
                    <Button
                      disabled={!store.getState()}
                      variant="filled"
                      color={"blue"}
                      className={`p-2 ${
                        listSelected.length > 0 ? "w-30" : "w-34 "
                      } ml-4 mb-4 flex justify-center`}
                      onClick={handleExportData}
                    >
                      {!store.getState() ? (
                        <>
                          <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                          <Typography
                            variant="small"
                            className="text-center font-bold uppercase text-white"
                          >
                            {"Download ..."}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <ArrowUpTrayIcon
                            strokeWidth={5}
                            className="mr-2 mt-[1px] h-4 w-4"
                          />
                          <Typography
                            variant="small"
                            className="font-bold uppercase text-white "
                          >
                            {`${
                              listSelected.length > 0 ? "Export" : "Export All"
                            }`}
                          </Typography>
                        </>
                      )}
                    </Button>
                  </Badge>
                )}
                <div className="flex w-1/4 items-start space-x-2">
                  <InputDatePicker
                    label="Select Date Range"
                    selectsRange={true}
                    startDate={start}
                    endDate={to}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    size="sm"
                  />
                  <button
                    className="btn rounded-md bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                    onClick={onClickGo}
                  >
                    Go
                  </button>
                </div>
              </div>
              <CardBody className="px-0 pt-0 pb-10">
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
                            className="whitespace-nowrap text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {data}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!store.getState() ? (
                      <TableLoading row={8} />
                    ) : (
                      <>
                        {data &&
                          data.map((data: GetScheduleByDate, index) => {
                            const className = `py-3 px-5 border-b border-blue-gray-50`;
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
                                        className="font-medium capitalize"
                                      >
                                        {data.employeName}
                                      </Typography>
                                    </div>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.departmentName}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.positionName}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.shiftName}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.clockIn || "-"}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.clockOut || "-"}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.date.slice(0, 10)}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium capitalize"
                                  >
                                    {data.attendanceStatus}
                                  </Typography>
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </tbody>
                </table>
  
                {data && totalPage > 1 ? (
                  <Pagination
                    onChange={handleChangePage}
                    total={totalPage}
                    current={currentPage}
                  />
                ) : store.getState() && !data ? (
                  <NoData />
                ) : null}
              </CardBody>
            </div>
        </Card>
      </div>
    );
  }
  
  export default ListSchedule;
  
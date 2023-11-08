import { chartsConfig } from "@/app/configs";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { GetEmployeeAttendanceMonth, GetEmployeeAttendanceToday } from "@/interface/dashboard";
import { NoData, StatisticsCard, StatisticsChart } from "@/app/components";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, ClockIcon } from "@heroicons/react/24/solid";
import DonutChart from "@/app/components/molecules/charts/donutChart";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/Actions/setLoading";
import { getDataApproval } from "@/app/services/approval/onleave";
import { GetApprovalResponse, GetDataApproval } from "@/interface/approval";
import { getWebDashboard } from "@/app/services/dashboard";

interface DashboardUserProps {
  employeeAttendanceToday: GetEmployeeAttendanceToday | null
  employeeAttendanceMonth: GetEmployeeAttendanceMonth | null
}
export function DashboardUser({
    employeeAttendanceToday,
    employeeAttendanceMonth,
}: DashboardUserProps ) {

  const [showAll, setShowAll] = useState<boolean>(false);
  const [dataApproval, setDataApproval] = useState<GetDataApproval[] | null>()
  const [employeeName, setEmployeeName] = useState<string>('')

  const attendanceCardsData = [
    {
      color: "pink",
      icon: "img/icon/employee-white.png",
      title: "Employee Name",
      value: employeeName || 'N/A',
    },
    {
      color: "blue",
      icon: "img/clockIn.png",
      title: "Clock-In Time",
      value: employeeAttendanceToday?.clockIn || 'N/A',
    },
    {
      color: "orange",
      icon: "img/clock-out.png",
      title: "CLock-Out Time",
      value: employeeAttendanceToday?.clockOut || 'N/A',
    },
  ];

  const series = [ employeeAttendanceMonth?.present, employeeAttendanceMonth?.late, employeeAttendanceMonth?.absent]

  const attendanceByMonthChart =
  {
    type: "donut",
    height: 220,
    width: "100%",
    series,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
      labels: ["Present", "Late", "Absent"],
      colors: ["#049F52", "#C05520", "#BA1B1B"]
    },
  }

  const attendanceChartsData = [
    {
      color: "green",
      chart: attendanceByMonthChart,
    }
  ]

  const dispatch = useDispatch();

  const getEmployeeData = async () => {
    dispatch(setLoading(true));

    const response = await getWebDashboard();
    try {
      if (!response.isError) {
        setEmployeeName(response.data.employeeName);
      } else {
        setEmployeeName('');
      }
      dispatch(setLoading(false));
    } catch (error) {}
  }

  const getApproval = async () => {
    dispatch(setLoading(true));
    const response = (await getDataApproval()) as GetApprovalResponse;
    try {
      if (!response.isError) {
        setDataApproval(response.data);
      } else {
        setDataApproval(null);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getApproval();
    getEmployeeData()
  }, []);

  return (
    <div>
      <div className="mt-4 flex md:h-1/2 flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-10">
        <div className="flex flex-col space-y-10 md:w-1/3">
        {attendanceCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={<img src={icon} alt="Icon" className="h-6 w-6" />}
          />
        ))}
        </div>
        <div className="flex flex-col md:w-2/3 space-y-5">
          <Card className="w-full h-full shadow-md">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between px-6 pt-6"
            >
              <div className="border-b-2 border-gray-100 w-full">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Attendance
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="py-3 h-full flex flex-col justify-between">
                {employeeAttendanceMonth ? (
                <div>
                  <div className="flex justify-between">
                    <div>
                      <ul className="list-disc px-4">
                        <li className="text-green-500 font-semibold">
                          <Typography variant="small" color="green" className="font-medium mb-3 whitespace-nowrap">
                            {employeeAttendanceMonth.present} Total Present
                          </Typography>
                        </li>
                        <li className="text-orange-500 font-semibold">
                          <Typography variant="small" color="orange" className="font-medium mb-3 whitespace-nowrap">
                            {employeeAttendanceMonth.late} Total Late
                          </Typography>
                        </li>
                        <li className="text-red-500 font-semibold">
                          <Typography variant="small" color="red" className="font-medium mb-3 whitespace-nowrap">
                            {employeeAttendanceMonth.absent} Total Absent
                          </Typography>
                        </li>
                      </ul>
                    </div>
                    {!(employeeAttendanceMonth?.present === 0 && employeeAttendanceMonth?.late === 0 && employeeAttendanceMonth?.absent === 0) && attendanceChartsData.map((props) => (
                      <DonutChart
                        {...props}
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between border-l-4 border-blue-500 mt-3 my-1 bg-gray-50 px-4 py-2">
                      <Typography variant="small" color="blue-gray">
                        Details
                      </Typography>
                      {showAll ? (
                          <ChevronUpIcon
                              onClick={()=> setShowAll(!showAll)}
                              color={'#616161'}
                              className={'w-6 h-6 cursor-pointer'}
                          />
                      ):(
                          <ChevronDownIcon
                              onClick={()=> setShowAll(!showAll)}
                              color={'#616161'}
                              className={'w-6 h-6 cursor-pointer'}
                          />
                      )}
                      </div>
                      {showAll && (
                        <div className="flex flex-col space-y-3 p-4 bg-gray-50 border-l-4 border-blue-500 ">
                          <div>
                            <Typography variant="small" color="blue-gray">
                              Shift  : {employeeAttendanceMonth?.shift || '-'}
                            </Typography>
                          </div>
                          <div className="grid grid-cols-2">
                            <Typography variant="small" color="blue-gray" className="whitespace-nowrap">
                              Start Worktime  : {employeeAttendanceMonth?.startWorkTime || '-'}
                            </Typography>
                            <div className="border-l-4 border-blue-500 px-6">
                            <Typography variant="small" color="blue-gray" className="whitespace-nowrap">
                              End Worktime  : {employeeAttendanceMonth?.endWorkTime || '-'}
                            </Typography>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <Typography variant="small" color="blue-gray" className="whitespace-nowrap">
                              Start Breaktime  : {employeeAttendanceMonth?.startBreakTime || '-'}
                            </Typography>
                            <div className="border-l-4 border-blue-500 px-6">
                              <Typography variant="small" color="blue-gray" className="whitespace-nowrap">
                                End Breaktime  : {employeeAttendanceMonth?.endBreakTime || '-'}
                              </Typography>
                            </div>
                          </div>
                          <div>
                            <Typography variant="small" color="blue-gray">
                              Workdays  : {employeeAttendanceMonth.workDays?.join(', ') || '-'}
                            </Typography>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                ): (
                  <div className="flex flex-row justify-center w-full mt-8 mb-10 bg-white">
                    <div className={'flex flex-col justify-center items-center'}>
                        <img
                        src={'/img/empty-data.png'}
                        alt="card-image"
                        className="rounded-sm h-32"
                    />
                    <h5 className="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{'Data is Empty'}</h5>
                  </div>
                </div>
                )}
            </CardBody>
          </Card>
        </div>
      </div>
      <Card className="mt-10">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between px-6 pt-6"
      >
        <div className="border-b-2 border-gray-100 w-full">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Approval History
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="py-3">
        {dataApproval ? (
          <div className="flex space-x-5 py-5 sm:p-5 my-3 bg-gray-50 rounded-lg w-full lg:w-1/2">
            <div className="hidden sm:block">
              <div className="bg-gray-300 p-5 rounded-full">
              {dataApproval[0]?.approvalType === "Approval Onleave" ? (
                <img src="/img/leave.jpg" alt="leave-icon" className="w-10 h-10" />
              ): dataApproval[0]?.approvalType === "Approval Overtime" ? (
                <img src="/img/overtime.png" alt="overtime-icon" className="w-10 h-10" />
              ): dataApproval[0]?.approvalType === "Approval Shift" ? (
                <img src="/img/shift.png" alt="approval-icon" className="w-10 h-10" />
              ): (
                <img src="/img/workshop-icon.png" alt="workshop-icon" className="w-10 h-10" />
              )}
              </div>
            </div>
            <div className="flex justify-between flex-col">
              <div>
                <div className="bg-blue-500 px-3 py-1 mb-3 rounded-lg w-fit">
                  <Typography color="white" className="text-sm font-semibold">
                    {dataApproval[0]?.approvalType}
                  </Typography>
                </div>
                <div className="flex space-x-5">
                  <Typography variant="small" color="red" className="mb-1 font-medium">
                    Start Date : {dataApproval[0]?.properties?.fromDate?.slice(0, 10) || 'N/A'}
                  </Typography>
                  <Typography variant="small" color="red" className="mb-1 font-medium">
                    End Date : {dataApproval[0]?.properties?.toDate.slice(0, 10) || 'N/A'}
                  </Typography>
                </div>
                <div className="">
                  <Typography color="blue-gray" className="mb-3 text-xs">
                    Total Date : {dataApproval[0]?.properties?.total || 'N/A'}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Approver : {dataApproval[0]?.properties?.approver || 'N/A'}
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-medium">
                  Status Approval  : {dataApproval[0]?.properties?.status || 'N/A'}
                </Typography>
              </div>
            </div>
          </div>
        ):
        <div className="flex flex-row justify-center w-full mt-8 mb-10 bg-white">
          <div className={'flex flex-col justify-center items-center'}>
            <img
            src={'/img/empty-data.png'}
            alt="card-image"
            className="rounded-sm h-32"
            />
            <h5 className="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{'Data is Empty'}</h5>
          </div>
        </div>
        }
      </CardBody>
    </Card>
    </div>
  );
}

export default DashboardUser;
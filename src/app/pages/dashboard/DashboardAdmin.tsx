import { chartsConfig } from "@/app/configs";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Progress,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  attendanceChartsData,
  employeeIcon,
  onTimeIcon,
  lateIcon,
  absentIcon,
  appsIcon,
  devicesIcon,
} from "@/app/data";
import { StatisticsCard, StatisticsChart } from "@/app/components";

interface ListMonth {
  name: string;
  value: number;
}

export function DashboardAdmin({
  detailCompanies,
  attendanceAbsent,
  attendancePresent,
  attendanceLate,
  attendanceLateByEmployees,
  attendanceLateByDepartment
}) {

  let descAttendanceAbsent = "";
  let descAttendancePresent = "";
  let descAttendanceLate = "";

  if (attendanceAbsent?.length > 0) {
    descAttendanceAbsent = "4% absences increase in today";
  } else {
    descAttendanceAbsent = "No Data Found";
  }

  if (attendancePresent?.length > 0) {
    descAttendancePresent = "12% attendance increase in today";
  } else {
    descAttendancePresent = "No Data Found";
  }

  if (attendanceLate?.length > 0) {
    descAttendanceLate = "12% late increase in today";
  } else {
    descAttendanceLate = "No Data Found";
  }

  let listMonth: ListMonth[] = [
    {
      name: "Jan",
      value: 1,
    },
    {
      name: "Feb",
      value: 2,
    },
    {
      name: "Mar",
      value: 3,
    },
    {
      name: "Apr",
      value: 4,
    },
    {
      name: "May",
      value: 5,
    },
    {
      name: "Jun",
      value: 6,
    },
    {
      name: "Jul",
      value: 7,
    },
    {
      name: "Aug",
      value: 8,
    },
    {
      name: "Sep",
      value: 9,
    },
    {
      name: "Oct",
      value: 10,
    },
    {
      name: "Nov",
      value: 11,
    },
    {
      name: "Des",
      value: 12,
    },
  ];

  let dataCategoriesPresent: string[] = [];
  let dataSeriesPresent: number[] = [];
  let dataCategoriesLate: string[] = [];
  let dataSeriesLate: number[] = [];
  let dataCategoriesAbsence: string[] = [];
  let dataSeriesAbsence: number[] = [];

  attendanceLate?.forEach((late) => {
    const matchingMonth = listMonth.find((month) => month.value === late.month);
    if (matchingMonth) {
      dataCategoriesLate.push(matchingMonth.name);
    }
  });
  function getTotalLate(attendance) {
    return attendance.map((item) => item.total);
  }
  dataSeriesLate = getTotalLate(attendanceLate);

  attendanceAbsent?.forEach((absence) => {
    const matchingMonth = listMonth.find(
      (month) => month.value === absence.month
    );
    if (matchingMonth) {
      dataCategoriesAbsence.push(matchingMonth.name);
    }
  });
  function getTotalAbsences(absences) {
    return absences.map((item) => item.total);
  }
  dataSeriesAbsence = getTotalAbsences(attendanceAbsent);

  attendancePresent?.forEach((present) => {
    const matchingMonth = listMonth.find(
      (month) => month.value === present.month
    );
    if (matchingMonth) {
      dataCategoriesPresent.push(matchingMonth.name);
    }
  });

  function getTotalPresent(present) {
    return present.map((item) => item.total);
  }
  dataSeriesPresent = getTotalPresent(attendancePresent);

  const attendanceByMonthChart = {
    type: "line",
    height: 220,
    width: "100%",
    series: [
      {
        name: "Attendance",
        data: dataSeriesPresent,
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        range: dataCategoriesPresent.length - 1,
        categories: dataCategoriesPresent,
      },
    },
  };

  const attendanceLateByMonthChart = {
    type: "line",
    height: 220,
    width: "100%",
    series: [
      {
        name: "Late",
        data: dataSeriesLate,
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        range: dataCategoriesLate.length,
        categories: dataCategoriesLate,
      },
    },
  };

  const absencesByMonthChart = {
    type: "line",
    height: 220,
    width: "100%",
    series: [
      {
        name: "Absences",
        data: dataSeriesAbsence,
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        range: dataCategoriesAbsence.length,
        categories: dataCategoriesAbsence,
      },
    },
  };

  const attendanceCardsData = [
    {
      color: "orange",
      icon: employeeIcon,
      title: "Employees",
      value: detailCompanies?.employees,
    },
    {
      color: "green",
      icon: onTimeIcon,
      title: "On Time",
      value: detailCompanies?.ontime,
    },
    {
      color: "pink",
      icon: lateIcon,
      title: "Late",
      value: detailCompanies?.late,
    },
    {
      color: "red",
      icon: absentIcon,
      title: "Absent",
      value: detailCompanies?.absent,
    },
    {
      color: "blue",
      icon: appsIcon,
      title: "Active Apps",
      value: detailCompanies?.activeApps,
    },
    {
      color: "teal",
      icon: devicesIcon,
      title: "Active Devices",
      value: detailCompanies?.activeDecices,
    },
  ];

  const attendanceChartsData = [
    {
      color: "green",
      title: "Attendance by Month",
      description: descAttendancePresent,
      footer: "updated 1 min ago",
      chart: attendanceByMonthChart,
    },
    {
      color: "yellow",
      title: "Attendance Late by Month",
      description: descAttendanceLate,
      footer: "updated 1 min ago",
      chart: attendanceLateByMonthChart,
    },
    {
      color: "pink",
      title: "Absences by Month",
      description: descAttendanceAbsent,
      footer: "updated 4 min ago",
      chart: absencesByMonthChart,
    },
  ];

  return (
    <div className="mt-4">
      <div className="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:gap-x-5 xl:grid-cols-6" data-tut="reactour__dashboard_card">
        {attendanceCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={<img src={icon} alt="Icon" className="h-6 w-6" />}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between" data-tut="reactour__dashboard_statistics">
        {attendanceChartsData.map((props) => (
          <div
            key={props.title}
            className={`mb-6 grid w-full grid-cols-1 gap-y-12 gap-x-6 p-4 lg:w-1/3`}
          >
            <StatisticsChart
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          </div>
        ))}
      </div>
      <div className="my-4 grid grid-cols-1 gap-x-8 gap-y-10 md:px-4 lg:grid-cols-2">
        <Card data-tut="reactour__dashboard_top_absence">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Top 5 Employees by Absence
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-6 scrollbar-hide">
            {!attendanceLateByEmployees ||
            attendanceLateByEmployees.length === 0 ? (
              <div className="w-full py-10 text-center text-xs">
                No Data Found
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    {["Employee", "Department", "Clock IN"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceLateByEmployees.length > 0 &&
                    attendanceLateByEmployees.map(
                      ({ employee, departmentName, clockIn }, key) => {
                        const className = `py-3 px-5 ${
                          key === attendanceLateByEmployees.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={employee}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {employee}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {departmentName}
                              </Typography>
                            </td>
                            <td className={className}>
                              <div className="w-10/12">
                                <Typography
                                  variant="small"
                                  className="mb-1 block text-xs font-medium text-blue-gray-600"
                                >
                                  {clockIn}
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
        <Card data-tut="reactour__dashboard_top_late">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Top 5 Late by Department
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-6 scrollbar-hide">
            {!attendanceLateByDepartment ||
            attendanceLateByDepartment.length === 0 ? (
              <div className="w-full py-10 text-center text-xs">
                No Data Found
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    {["Department", "Percentage Late"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceLateByDepartment.length > 0 &&
                    attendanceLateByDepartment.map(
                      ({ departmentName, percentageLate }, key) => {
                        const className = `py-3 px-5 ${
                          key === attendanceLateByDepartment.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={departmentName}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  color="blue-gray"
                                  className="text-sm font-bold"
                                >
                                  {departmentName}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="w-10/12">
                                <Progress
                                  value={percentageLate}
                                  variant="gradient"
                                  color={
                                    percentageLate === 100 ? "green" : "blue"
                                  }
                                  className="h-1"
                                />
                                <Typography className="mb-1 block text-xs font-medium text-blue-gray-600">
                                  {percentageLate}%
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default DashboardAdmin;
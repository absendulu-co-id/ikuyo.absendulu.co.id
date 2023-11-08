import { chartsConfig } from "@/app/configs";

const absencesByMonthChart = {
  type: "line",
  height: 220,
  width: 600,
  series: [
    {
      name: "Absences",
      // data: [2, 2, 4, 5, 5, 7, 7, 8, 7, 7, 6, 6],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const attendanceByMonthChart = {
  type: "line",
  height: 220,
  width: 600,
  series: [
    {
      name: "Attendance",
      data: [2, 3, 4, 5, 8, 8, 9, 8, 7, 7, 5, 8],
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

export const attendanceChartsData = [
  {
    color: "pink",
    title: "Absences by Month",
    description: "4% absences increase in today",
    footer: "updated 4 min ago",
    chart: absencesByMonthChart,
  },
  {
    color: "green",
    title: "Attendance by Month",
    description: "12% attendance increase in today",
    footer: "updated 1 min ago",
    chart: attendanceByMonthChart,
  },
];

export default attendanceChartsData;

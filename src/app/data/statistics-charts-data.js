import { chartsConfig } from "@/app/configs";

const absencesByMonthChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Absences",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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
  series: [
    {
      name: "Attendance",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
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

export const statisticsChartsData = [
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

export default statisticsChartsData;

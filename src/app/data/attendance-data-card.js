import {
  UserGroupIcon,
  UserMinusIcon,
  UserPlusIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/solid";

import absentPNG from "/img/icon/absent-white.png";
import onTimePNG from "/img/icon/ontime-white.png";
import latePNG from "/img/icon/late-white.png";
import employeePNG from "/img/icon/employee-white.png";
import appsPNG from "/img/icon/apps-white.png";
import devicesPNG from "/img/icon/devices-white.png";

export const onTimeIcon = onTimePNG;
export const lateIcon = latePNG;
export const employeeIcon = employeePNG;
export const absentIcon = absentPNG;
export const appsIcon = appsPNG;
export const devicesIcon = devicesPNG;

export const attendanceCardsData = [
  {
    color: "orange",
    icon: employeeIcon,
    title: "Employees",
    value: "100",
  },
  {
    color: "green",
    icon: onTimeIcon,
    title: "On Time",
    value: "80",
  },
  {
    color: "pink",
    icon: lateIcon,
    title: "Late",
    value: "13",
  },
  {
    color: "red",
    icon: absentIcon,
    title: "Absent",
    value: "7",
  },
  {
    color: "blue",
    icon: appsIcon,
    title: "Active Apps",
    value: "60",
  },
  {
    color: "teal",
    icon: devicesIcon,
    title: "Active Devices",
    value: "40",
  },
];

export default attendanceCardsData;

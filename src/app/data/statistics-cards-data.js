import {
  UserPlusIcon,
  UserGroupIcon,
  UserMinusIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: UserGroupIcon,
    title: "Employees",
    value: "100",
    footer: {
      color: null,
      value: null,
      label: null,
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "On Time",
    value: "80",
    footer: {
      color: null,
      value: null,
      label: null,
    },
  },
  {
    color: "pink",
    icon: UserMinusIcon,
    title: "Late Corners",
    value: "13",
    footer: {
      color: null,
      value: null,
      label: null,
    },
  },
  {
    color: "orange",
    icon: HandThumbDownIcon,
    title: "Absent",
    value: "7",
    footer: {
      color: null,
      value: null,
      label: null,
    },
  },
];

export default statisticsCardsData;

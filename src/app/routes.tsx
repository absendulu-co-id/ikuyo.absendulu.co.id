import { ReactElement, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { isEmpty } from "@/utils/locDash";
import {
  HomeIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { combineArrays } from "@/utils/general";
import { Home } from "@/app/pages/dashboard";
import { SignIn, SignUp } from "@/app/pages/auth";
import {
  Approval,
  Attendance,
  Company,
  Device,
  Payroll,
  Schedule,
} from "@/app/pages";
import Department from "./pages/company/Department";
import Leave from "./pages/company/Leave";
import Workshop from "@/app/pages/company/Workshop";
import Employee from "@/app/pages/company/Employee";
// import Workflow from "@/app/pages/workflow";

// Page approval
import Area from "@/app/pages/company/Area";
import Position from "@/app/pages/company/Position";
import Overtime from "./pages/approval/Overtime";
import Shift from "./pages/approval/Shift";
import Onleave from "@/app/pages/approval/Onleave";
import Reimburse from "@/app/pages/approval/Reimburse";
import WorkshopApproval from "@/app/pages/approval/Workshop";
// import AddEmployee from "./pages/company/Employee/addEmployee";

// Page Workflow
import OnleaveWorkflow from "@/app/pages/workflow/Onleave";
import ShiftCompany from "./pages/company/ShiftCompany";
import Reimbursement from "./pages/company/Reimbursement";
import Access from "./pages/access";

import NotificationPage from "@/app/pages/notification";
import Calendar from "@/app/pages/calendar";


interface RouteConfig {
  icon: ReactElement;
  name: string;
  path: string;
  element: ReactElement;
  showSidebar?: boolean;
  image?: string;
}

interface LayoutConfig {
  layout: string;
  pages: RouteConfig[];
  title?: string;
}

const icon = {
  className: "w-5 h-5 text-inherit",
};

const newIcon = {
  width: "40px",
  style: { filter: `brightness(0) saturate(100%) invert(100%) sepia(10%) saturate(34%) hue-rotate(282deg) brightness(98%) contrast(107%)` }
}

export const routesAuth: LayoutConfig[] = [
  {
    title: 'SignIn',
    layout: 'signin',
    pages: [
      {
        icon: <HomeIcon {...icon}/>,
        name: 'SignIn',
        path: '/s',
        element: <SignIn/>
      }
    ]
  },
  {
    title: 'SignUp',
    layout: 'signup',
    pages: [
      {
        icon: <HomeIcon {...icon}/>,
        name: 'SignUp',
        path: '/',
        element: <SignUp/>
      }
    ]
  }
]

const initRoutes = [
  {
    title: "MAIN MENU",
    layout: "dashboard",
    pages: [
      {
        icon: <img src={'/img/icon/dashboard.svg'} {...newIcon} />,
        name: "Dashboard",
        path: "",
        element: <Home />,
        showSidebar: true,
      },
    ],
  },
  {
    layout: "access",
    pages: [
      {
        icon: <img src={'/img/icon/company.svg'} {...newIcon} />,
        name: "Access",
        path: "",
        element: <Access />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Access Manager'),
      },
    ],
  },
  {
    layout: "company",
    pages: [
      {
        icon: <img src={'/img/icon/company.svg'} {...newIcon} />,
        // name: "Company Data",
        name: "Company",
        path: "",
        element: <Company />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Company Data'),
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Area",
        path: "/area",
        element: <Area />,
        showSidebar: false,
        image: 'company-area'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Department",
        path: "/department",
        element: <Department />,
        showSidebar: false,
        image: 'company-department'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Position",
        path: "/position",
        element: <Position />,
        showSidebar: false,
        image: 'company-position'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Leave",
        path: "/leave",
        element: <Leave />,
        showSidebar: false,
        image: 'company-leave'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Workshop Type",
        path: "/workshop",
        element: <Workshop />,
        showSidebar: false,
        image: 'company-workshop'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Shift",
        path: "/shift",
        element: <ShiftCompany />,
        showSidebar: false,
        image: 'Shift-company'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Employee",
        path: "/employee",
        element: <Employee />,
        showSidebar: false,
        image: 'company-employee'
      },

      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Reimbursement",
        path: "/reimbursement",
        element: <Reimbursement />,
        showSidebar: false,
        image: 'reimbursement'
      },
    ],
  },
  {
    layout: "approval",
    pages: [
      {
        icon: <img src={'/img/icon/approval.svg'} {...newIcon} />,
        name: "Approval",
        path: "",
        element: <Approval />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Approval'),
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Overtime",
        path: "/overtime",
        element: <Overtime />,
        showSidebar: false,
        image: 'approval-overtime'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Shift",
        path: "/shift",
        element: <Shift />,
        showSidebar: false,
        image: 'Shift-company'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "On Leave",
        path: "/onleave",
        element: <Onleave />,
        showSidebar: false,
        image: 'approval-onleave'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Reimburse",
        path: "/reimburse",
        element: <Reimburse />,
        showSidebar: false,
        image: 'approval-reimbursement'
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "Workshop",
        path: "/workshop-approval",
        element: <WorkshopApproval />,
        showSidebar: false,
        image: 'approval-workshop'
      },
    ],
  },
  {
    layout: "workflow",
    pages: [
      {
        icon: <img src={'/img/icon/workflow.svg'} {...newIcon} />,
        name: "Workflow",
        path: "/workflow",
        element: <OnleaveWorkflow />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Workflow'),
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Onleave",
        path: "/onleave",
        element: <OnleaveWorkflow />,
        showSidebar: false,
        image: 'company-leave'
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Workshop",
        path: "/workshop",
        element: <p>Workshop</p>,
        showSidebar: false,
        image: 'company-workshop'
      },
    ],
  },

  {
    layout: "calendar",
    pages: [
      {
        icon: <img src={'/img/icon/schedule.svg'} {...newIcon} />,
        name: "Calendar",
        path: "",
        element: <Calendar />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Calendar'),
      }
    ],
  },
  {
    layout: "schedule",
    pages: [
      {
        icon: <img src={'/img/icon/schedule.svg'} {...newIcon} />,
        name: "Schedule",
        path: "",
        element: <Schedule />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Schedule'),
      }
    ],
  },
  {
    layout: "attendance",
    pages: [
      {
        icon: <img src={'/img/icon/attendance.svg'} {...newIcon} />,
        name: "Attendance",
        path: "",
        element: <Attendance />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Attendance'),
      },
    ],
  },
  {
    layout: "payroll",
    pages: [
      {
        icon: <img src={'/img/icon/payroll.svg'} {...newIcon} />,
        name: "Payroll",
        path: "",
        element: <Payroll />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Payroll'),
      },
    ],
  },
  {
    layout: "device",
    pages: [
      {
        icon: <img src={'/img/icon/device.svg'} {...newIcon} />,
        name: "Device",
        path: "",
        element: <Device />,
        showSidebar: true
        // showSidebar: mainMenu.includes('Device'),
      },
    ],
  },
  {
    layout: "notification",
    pages: [
      {
        icon: <img src={'/img/icon/device.svg'} {...newIcon} />,
        name: 'Notification',
        path: "",
        element: <NotificationPage />,
        showSidebar: false
      }
    ],
  }
  // {
  //   layout: "import",
  //   pages: [
  //     {
  //       icon: <img src={'/img/icon/import.svg'} {...newIcon} />,
  //       name: "Import",
  //       path: "",
  //       element: <Import />,
  //       showSidebar: true,
  //     },
  //   ],
  // },
]


  const token = localStorage.getItem('token');
  const isLogin = token && token.length > 0;

  const defaultAccess = [
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Dashboard",
      subMenu: ["Dashboard"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Access",
      subMenu: ["Access"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Company",
      subMenu: [
        "Company",
        "Area",
        "Department",
        "Position",
        "Leave",
        "Workshop Type",
        "Employee",
        "Shift",
        "Reimbursement",
      ],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Approval",
      subMenu: [
        "Approval",
        "Overtime",
        "Shift",
        "On Leave",
        "Workshop"
      ],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Workflow",
      subMenu: [
        "Workflow",
        "On Leave",
        "Department",
      ],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Calendar",
      subMenu: ["Calendar"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Schedule",
      subMenu: ["Schedule"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Payroll",
      subMenu: ["Payroll"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Device",
      subMenu: ["Device"],
    },
    {
      action: ["Add", "Edit", "Delete"],
      mainMenu: "Notification",
      subMenu: ["Notification"],
    },
  ];

export const getRoutes = () => {  
  if (!isLogin) {
    return initRoutes
  } else {
    
    const tempAccess = localStorage.getItem('access');
    const access = JSON.parse(tempAccess!) || defaultAccess;
  ;
    const arrSubmenuRaw = access?.map((list) => list?.subMenu?.map((newList) => newList));
    const arrSubmenu = combineArrays(arrSubmenuRaw);
    const filteredSubmenu = initRoutes?.map((element) => {
      return {...element, pages: element?.pages?.filter((subElement) => arrSubmenu.includes(subElement?.name))}
    })
    
    const arrMenu = access?.map((list) => list?.mainMenu?.toLowerCase());
    const newRoutes = filteredSubmenu?.filter((obj) => {
      return arrMenu.includes(obj.layout);
    })

    return newRoutes
  }

}

export const routes:LayoutConfig[] = getRoutes()
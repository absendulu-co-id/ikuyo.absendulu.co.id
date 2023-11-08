export const listMenus = [
  {
    label: "Dashboard",
    value: "Dashboard",
    checked: true,
  },
  {
    label: "Company Data",
    value: "CompanyData",
    checked: false
  },
  {
    label: "Workflow",
    value: "Workflow",
    checked: false,
  },
  {
    label: "Approval",
    value: "Approval",
    checked: false
  },
  {
    label: "Calendar",
    value: "Calendar",
    checked: false,
  },
  {
    label: "Schedule",
    value: "Schedule",
    checked: true,
  },
  {
    label: "Attendance",
    value: "Attendance",
    checked: true,
  },
  {
    label: "Payroll",
    value: "Payroll",
    checked: false
  },
  {
    label: "Device",
    value: "Device",
    checked: false
  },
  {
    label: "Import",
    value: "Import",
    checked: false
  }
]

export const subMenus = {
  companyData: ["Area", "Department", "Position", "Leave", "Workshop Type", "Employee", "Shift", "Reimbursement"],
  workFlow: ["On Leave", "Workshop"],
  approval: ["Overtime", "Shift", "On Leave", "Workshop"],
}

export const action = ["Add", "Edit", "Delete"]

export const dataAksesMenu = [
  {
    positionName: "Dev",
    departmentName: "IT",
    aksesMenu : ["dashbord", "schedule", "attendance"],
    aksesSubMenu: {},
    action: {},
  },
  {
    positionName: "Akuntan",
    departmentName: "Finance",
    AksesMenu : ["dashbord", "companyData", "approval", "schedule", "attendance"],
    aksesSubMenu: {
      companyData: ["Department", "Position", "Leave", "Workshop Type", "Employee", "Shift", "Reimbursement"],
      approval: ["Overtime", "Shift", "On Leave", "Workshop"],
    },
    action: ["Add", "Edit", "Delete"]
  },
  {
    positionName: "HR",
    departmentName: "HR",
    AksesMenu : ["dashbord", "companyData", "workflow", "approval", "schedule", "attendance"],
    aksesSubMenu: {
      companyData: ["Department", "Position", "Leave", "Workshop Type", "Employee", "Shift", "Reimbursement"],
      workFlow: ["On Leave", "Workshop"],
      approval: ["Overtime", "Shift", "On Leave", "Workshop"],
    },
    action: ["Add", "Edit", "Delete"]
  },
]

export const newListMenus = [
  {
    id: 1,
    name: 'dashboard',
    checked: true,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 10,
        name: 'dashboard',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        status: 1,
      }
    ],
    // items: null,
    status: 1,
  },
  {
    id: 2,
    name: 'company',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 20,
        name: 'company',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 21,
        name: 'area',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 22,
        name: 'department',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 23,
        name: 'position',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 24,
        name: 'leave',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 25,
        name: 'workshop-type',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 26,
        name: 'employee',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 27,
        name: 'shift',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 28,
        name: 'reimbursement',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'workflow',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 30,
        name: 'workflow',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 31,
        name: 'on-leave',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 32,
        name: 'department',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'approval',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 40,
        name: 'approval',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 41,
        name: 'overtime',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 42,
        name: 'shift',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 43,
        name: 'on-leave',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
      {
        id: 44,
        name: 'workshop',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'calendar',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 50,
        name: 'calendar',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'schedule',
    checked: true,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    status: 1,
    items: [
      {
        id: 60,
        name: 'schedule',
        checked: true,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        status: 1,
      },
    ],
  },
  {
    id: 8,
    name: 'attendance',
    checked: true,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    status: 1,
    items: [
      {
        id: 80,
        name: 'attendance',
        checked: true,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        status: 1,
        items: null,
      },
    ],
  },
  {
    id: 9,
    name: 'payroll',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 90,
        name: 'payroll',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        items: null,
      },
    ],
  },
  {
    id: 10,
    name: 'device',
    checked: false,
    icon: 'icon',
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 100,
        name: 'device',
        checked: false,
        icon: 'icon',
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        items: null,
      },
    ],
  },
  {
    id: 11,
    name: 'notification',
    checked: true,
    icon: 'icon',
    status: 1,
    action: [
      {
        actionId: 1,
        actionName: 'add',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 2,
        actionName: 'edit',
        checked: false,
        icon: 'icon',
      },
      {
        actionId: 3,
        actionName: 'delete',
        checked: false,
        icon: 'icon',
      },
    ],
    items: [
      {
        id: 11,
        name: 'notification',
        checked: true,
        icon: 'icon',
        status: 1,
        action: [
          {
            actionId: 1,
            actionName: 'add',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 2,
            actionName: 'edit',
            checked: false,
            icon: 'icon',
          },
          {
            actionId: 3,
            actionName: 'delete',
            checked: false,
            icon: 'icon',
          },
        ],
        items: null,
      }
    ],
  }
  // {
  //   id: 11,
  //   name: 'import',
  //   checked: false,
  //   icon: 'icon',
  //   action: [
  //     {
  //       actionId: 1,
  //       actionName: 'add',
  //       checked: false,
  //       icon: 'icon',
  //     },
  //     {
  //       actionId: 2,
  //       actionName: 'edit',
  //       checked: false,
  //       icon: 'icon',
  //     },
  //     {
  //       actionId: 3,
  //       actionName: 'delete',
  //       checked: false,
  //       icon: 'icon',
  //     },
  //   ],
  // }
];

export const treeMenus = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    children: [
      {
        value: 'action',
        label: 'ACTION',
        children: [
          {
            value: 'add',
            label: 'Add'
          },
          {
            value: 'edit',
            label: 'Edit'
          },
          {
            value: 'delete',
            label: 'Delete'
          },
        ],
      },
      {
        value: 'submenu',
        label: 'SUBMENU',
        children: []
      }
    ],
  },
  {
    value: 'company-data',
    label: 'Company Data',
    children: [
      {
        value: 'submenu',
        label: 'Submenu',
        children: [
          {
            value: 'area',
            label: 'area',
          }
        ],
      }
    ],
  }

];
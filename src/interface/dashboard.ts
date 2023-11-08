export interface GetDetailCompanies {
  employees: number,
  ontime: number,
  late: number,
  absent: number,
  activeApps: number,
  activeDecices: number,
  date: null,
  companyId: string
}

export interface GetAttendanceByDepartments {
  departmentName: string,
  percentageLate: number,
  companyId: string,
  date: string,
}

export interface GetAttendanceByEmployees {
  employee: string,
  departmentName: string,
  clockIn: string,
  companyId: string,
  date: string,
}

export interface DetailCompaniesResponse {
  detailCompanies: GetDetailCompanies;
  isError: boolean;
  message: string;
  attendancesLate: [],
  attendancesAbsent: [],
  attendancesPresent: [],
  attendancesLateByDepartment: [],
  attendancesLateByEmployees: [],
  companyDetails: CompanyDetailsResponse[],
  employeAttendanceToday: GetEmployeeAttendanceToday,
  employeAttendanceMonth: GetEmployeeAttendanceMonth
}

export interface GetEmployeeAttendanceToday {
  employeeName: string
  employeeId: number
  positionName: string
  departmentName: string
  date: string
  late: number
  clockIn: string
  clockInAddress:string
  clockInNote: string | null
  clockOut: string | null
  clockOutAddress: string | null
  clockOutNote: string |null
  employeeShift: string | null
  companyId: string
  profilePicture: string | null
}

export interface GetEmployeeAttendanceMonth {
  employeeName: string
  companyId: string
  late: number
  present: number
  absent: number
  shift: string
  startWorkTime: string
  endWorkTime: string
  startBreakTime: string
  endBreakTime: string
  workDays: Array<string>
  latitude: string | null
  longitude: string |null
}

export interface CompanyDetailsResponse {
  id: string,
  companyName: string,
  companyLocation: string,
  longitude: string,
  latitude: string,
  companyBusinessType: string,
  director: string,
  contactNumber: string,
  phoneNuber1: string,
  phoneNuber2: string | null,
  pic: string | null,
  isActive: boolean,
  isLock: boolean,
  subcribeDate: string | Date,
  expiredDate:  string | Date,
  icon: string,
  createdAt:  string | Date,
  updatedDate:  string | Date,
}
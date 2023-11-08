export interface GetDataAttendances  {
  employeeName: string,
  date: string,
  clockIn: string,
  clockInMethod: string,
  clockInAddress: string,
  clockInNote: string,
  clockinPhoto: string,
  clockOut: string,
  clockOutMethod: string,
  clockOutAddress: string,
  clockOutNote: string,
  clockoutPhoto: string,
  departmentName: string,
  employeeShift: string,
  companyId: string
}

export interface GetAttendanceResponse {
  data: GetDataAttendances[],
  isError: boolean,
  message: string,
  totalPages: number,
}
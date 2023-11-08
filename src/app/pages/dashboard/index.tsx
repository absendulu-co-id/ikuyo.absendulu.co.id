import { useEffect, useState } from "react";
import { getDataDashboard } from "@/app/services/dashboard";
import {
  DetailCompaniesResponse,
  GetAttendanceByDepartments,
  GetAttendanceByEmployees,
  GetDetailCompanies,
} from "@/interface/dashboard";
import { setLoading } from "@/redux/Actions/setLoading";
import { useDispatch } from "react-redux";
import { GetEmployeeAttendanceMonth, GetEmployeeAttendanceToday } from "@/interface/dashboard";
import DashboardUser from "./DashboardUser";
import DashboardAdmin from "./DashboardAdmin";

export function Home() {
  const [detailCompanies, setDetailCompanies] = useState<GetDetailCompanies | null>(null);
  const [attendanceAbsent, setAttendanceAbsent] = useState<DetailCompaniesResponse[]>([]);
  const [attendancePresent, setAttendancePresent] = useState<DetailCompaniesResponse[]>([]);
  const [attendanceLate, setAttendanceLate] = useState<DetailCompaniesResponse[]>([]);
  const [attendanceLateByEmployees, setAttendanceLateByEmployees] = useState<GetAttendanceByEmployees[] | null>(null);
  const [attendanceLateByDepartment, setAttendanceLateByDepartment] = useState<GetAttendanceByDepartments[] | null>(null);
  const [employeeAttendanceToday, setEmployeeAttendanceToday] = useState<GetEmployeeAttendanceToday | null>(null)
  const [employeeAttendanceMonth, setEmployeeAttendanceMonth] = useState<GetEmployeeAttendanceMonth | null>(null)

  const decodedToken = localStorage.getItem("decoded");
  const decoded = JSON.parse(decodedToken || "");
  const role = decoded?.role.toLowerCase()

  const dispatch = useDispatch();

  const getDashboard = async () => {
    dispatch(setLoading(true));
    const response = (await getDataDashboard()) as DetailCompaniesResponse;
    try {
      if (!response.isError) {
        setDetailCompanies(response.detailCompanies);
        setAttendanceAbsent(response.attendancesAbsent);
        setAttendancePresent(response.attendancesPresent);
        setAttendanceLate(response.attendancesLate);
        setAttendanceLateByEmployees(response.attendancesLateByEmployees);
        setAttendanceLateByDepartment(response.attendancesLateByDepartment);
        setEmployeeAttendanceToday(response.employeAttendanceToday)
        setEmployeeAttendanceMonth(response.employeAttendanceMonth)
      } else {
        setDetailCompanies(null);
        setAttendanceAbsent([]);
        setAttendancePresent([]);
        setAttendanceLate([]);
        setAttendanceLateByEmployees(null);
        setAttendanceLateByDepartment(null);
        setEmployeeAttendanceToday(null)
        setEmployeeAttendanceMonth(null)
      }
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="mt-4">
      {role === "admin" ? (
        <DashboardAdmin
          detailCompanies = {detailCompanies}
          attendanceAbsent = {attendanceAbsent}
          attendancePresent = {attendancePresent}
          attendanceLate = {attendanceLate}
          attendanceLateByEmployees = {attendanceLateByEmployees}
          attendanceLateByDepartment = {attendanceLateByDepartment}
        />
      ) :
      (
        <DashboardUser
          employeeAttendanceToday = {employeeAttendanceToday}
          employeeAttendanceMonth = {employeeAttendanceMonth}
        />
      )}
    </div>
  );
}

export default Home;

import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Spinner,
  Badge,
  Input,
} from "@material-tailwind/react";
import { Modal, HeaderBack, NoData, InputDatePicker } from "@/app/components";
import { snackBar } from "@/utils/snackbar";
import {
  ArrowLeftIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import {
  deleteDataEmployee,
  postDataEmployee,
  updateDataEmployee,
  getDataEmployeePagination,
  getDataSubscribe,
  exportDataEmployee,
  getDataEmployee,
} from "@/app/services/company/employee";
import { EmployeeTable } from "@/app/components";
import Pagination from "@/app/components/molecules/pagination";
import { isEmpty } from "@/utils/locDash";
import { useRecoilValue } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { GetDataPositionResponse } from "@/interface/position";
import {
  GetDataDepartmentResponse,
  GetDataEmployee,
  GetDataEmployees,
  GetDataSalaries,
  GetDataShift,
  GetDataSubscribe,
  GetDatasSubscribe,
  GetDepartmentResoponse,
  GetSalariesResponse,
  GetShiftResponse,
} from "@/interface/company";
import AddEmployee from "./addEmployee";
import { GetAreaResponse, GetDataAreaResponse } from "@/interface/area";
import { register } from "@/app/services/auth";
import { getDataPosition } from "@/app/services/company/position";
import { getDataArea } from "@/app/services/company/area";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/Actions/setLoading";
import store from "@/redux/Store";
import AddSalary from "./addSalary";
import {
  getDataSalaries,
  postDataSalaries,
  updateDataSalaries,
} from "@/app/services/company/salary";
import { getDataDepartment } from "@/app/services/company/department";
import { getDataShift } from "@/app/services/company/shift";
import { GetPositionResponse } from "@/interface/position";

export interface IEmployeeProps {
  open: boolean;
  header: string | JSX.Element | JSX.Element[];
  handleClose(): void;
  body: string | JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[];
  size?: "md" | "sm" | "lg";
}

export default function Employee() {
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [addSalary, setAddSalary] = useState<boolean>(false);
  const [editSalary, setEditSalary] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [dataEmployee, setDataEmployee] = useState<GetDataEmployee[] | null>(null);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<Array<object>>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>("");
  const [dataEdit, setDataEdit] = useState<GetDataEmployee | GetDataSalaries[] | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onPage, setOnPage] = useState<number>(1);

  const [form, setForm] = useState({
    id: 0,
    employeeId : "",
    employeeName: "",
    departmentId: "",
    departmentCode: "",
    departmentName: "",
    positionId: "",
    positionCode: "",
    positionName: "",
    shiftId: "",
    shiftName: "",
    employeeTypeCode: "",
    employeeTypeName: "",
    gender: "",
    birthday: undefined,
    phoneNumber: "",
    address: "",
    postalCode: "",
    national: "",
    religion: "",
    emailAddress: "",
    earning: 0,
    currency: "",
    bankName: "",
    bankAccount: "",
    paymentMethod: "",
    bpjsEmployeeNo: "",
    bpjsEmployeeStartPay: undefined,
    bpjsEmployeeEndPay: undefined,
    bpjsHealthCareNo: "",
    bpjsHealthCareStartPay: undefined,
    bpjsHealthCareEndPay: undefined,
    npwpNo: "",
    martialAndDependents: "",
    taxStartPay: undefined,
    taxEndPay: undefined,
    profilePhoto: "",
    workTypeId: "",
    workTypeName: "",
    areaId: "",
    areaCode: "",
    areaName: "",
    isResign: false,
    joinDate: undefined,
    resignDate: undefined,
    effectiveStart: undefined,
    effectiveEnd: undefined,
    accountTypeId: 0,
  });

  const resetValueForm = () => {
    setForm((prevValue) => {
      return {
        ...prevValue,
        id: 0,
        employeeId: "",
        employeeName: "",
        departmentId: "",
        departmentCode: "",
        departmentName: "",
        positionId: "",
        positionCode: "",
        positionName: "",
        shiftId: "",
        shiftName: "",
        employeeTypeCode: "",
        employeeTypeName: "",
        gender: "",
        birthday: undefined,
        phoneNumber: "",
        address: "",
        postalCode: "",
        national: "",
        religion: "",
        emailAddress: "",
        earning: 0,
        currency: "",
        bankName: "",
        bankAccount: "",
        paymentMethod: "",
        bpjsEmployeeNo: "",
        bpjsEmployeeStartPay: undefined,
        bpjsEmployeeEndPay: undefined,
        bpjsHealthCareNo: "",
        bpjsHealthCareStartPay: undefined,
        bpjsHealthCareEndPay: undefined,
        npwpNo: "",
        martialAndDependents: "",
        taxStartPay: undefined,
        taxEndPay: undefined,
        profilePhoto: "",
        workTypeId: "",
        workTypeName: "",
        areaId: "",
        areaCode: "",
        areaName: "",
        isResign: false,
        joinDate: undefined,
        resignDate: undefined,
        effectiveStart: undefined,
        effectiveEnd: undefined,
        accountTypeId: 0,
      };
    });
  };

  const searchData = useRecoilValue(searchAllAtom);
  const dispatch = useDispatch();

  const getEmployeePagination = async (params) => {
    dispatch(setLoading(true));
    try {
      const response = (await getDataEmployeePagination(
        params
      )) as GetDataEmployees;
      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataEmployee(response.data);
      } else {
        setDataEmployee(null);
      }
      dispatch(setLoading(false));
    } catch (e: any) {
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (searchData) {
      const delaySearch = setTimeout(() => {
        setQuery(searchData);
      }, 1500);

      return () => clearTimeout(delaySearch);
    } else {
      if (dataEmployee) {
        const delaySearch = setTimeout(() => {
          setQuery("");
        }, 1500);

        return () => clearTimeout(delaySearch);
      } else setQuery("");
    }
  }, [searchData]);

  useEffect(() => {
    if (query !== null) {
      if (query.length > 0) {
        const params = {
          search: isEmpty(query) ? null : query,
        };
        getEmployeePagination(params);
      } else {
        const params = {
          pageNumber: onPage,
        };
        getEmployeePagination(params);
      }
    }
  }, [query]);

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
      search: isEmpty(query) ? null : query,
    };

    getEmployeePagination(params);
    setListSelected([]);
    setSelectedAll(false);
  };

  const handleClickDelete = (id: string) => {
    setIdDelete(id);
    setShowModalDelete(true);
  };

  const handleDelete = async (id: string) => {
    dispatch(setLoading(true));
    const response = await deleteDataEmployee(id);

    if (response) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      dispatch(setLoading(false));
      setShowModalDelete(false);
      snackBar("success", "Data Employee delete successfully");
    } else {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      dispatch(setLoading(false));
      setShowModalDelete(false);
      snackBar("error", "Data Employee failed to delete");
    }
  };

  const handleAdd = () => {
    setAddClicked(true);
  };

  const handleSave = async () => {
    dispatch(setLoading(true));
    const payload = {
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      positionId: form.positionId,
      positionCode: form.positionCode,
      positionName: form.positionName,
      departmentId: form.departmentId,
      departmentCode: form.departmentCode,
      departmentName: form.departmentName,
      shiftId: form.shiftId,
      shiftName: form.shiftName,
      employeeTypeCode: form.employeeTypeCode,
      employeeTypeName: form.employeeTypeName,
      gender: form.gender,
      birthday: form.birthday,
      phoneNumber: form.phoneNumber,
      address: form.address,
      postalCode: form.postalCode,
      national: form.national,
      religion: form.religion,
      emailAddress: form.emailAddress,
      workTypeId: form.workTypeId,
      workTypeName: form.workTypeName,
      areaId: form.areaId,
      areaCode: form.areaCode,
      areaName: form.areaName,
      joinDate: form.joinDate,
      effectiveStart: form.effectiveStart,
      accountTypeId: form.accountTypeId,
    };

    const response = await postDataEmployee(payload);
    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      dispatch(setLoading(false));
      getEmployeePagination(params);
      setAddClicked(false);
      setShowModalRegister(true);
    } else {
      setAddClicked(false);
      dispatch(setLoading(false));
      resetValueForm();
      snackBar("error", "Data Employee failed to add")
    }
  };

  const handleSaveSalary = async () => {
    dispatch(setLoading(true));
    const payload = {
      employeeId: Number(form.employeeId),
      employeeName: form.employeeName,
      earning: Number(form.earning),
      currency: form.currency,
      bankName: form.bankName,
      bankAccount: form.bankAccount,
      paymentMethod: form.paymentMethod,
      bpjsEmployeeNo: form.bpjsEmployeeNo,
      bpjsEmployeeStartPay: form.bpjsEmployeeStartPay,
      bpjsEmployeeEndPay: form.bpjsEmployeeEndPay,
      bpjsHealthCareNo: form.bpjsHealthCareNo,
      bpjsHealthCareStartPay: form.bpjsEmployeeStartPay,
      bpjsHealthCareEndPay: form.bpjsEmployeeEndPay,
      npwpNo: form.npwpNo,
      martialAndDependents: form.martialAndDependents,
      taxStartPay: form.taxStartPay,
      taxEndPay: form.taxEndPay,
    };

    const response = await postDataSalaries(payload);
    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      dispatch(setLoading(false));
      getEmployeePagination(params);
      getSalaries()
      setAddSalary(false);
      snackBar("success", "Data Salary saved successfully");
      resetValueForm();
    } else {
      setAddSalary(false);
      dispatch(setLoading(false));
      snackBar("error", "Data Salary failed to save");
      resetValueForm();
    }
  };

  const handleEditSalary = async () => {
    dispatch(setLoading(true));
    const payload = {
      employeeId: Number(form.employeeId),
      employeeName: form.employeeName,
      earning: Number(form.earning),
      currency: form.currency,
      bankName: form.bankName,
      bankAccount: form.bankAccount,
      paymentMethod: form.paymentMethod,
      bpjsEmployeeNo: form.bpjsEmployeeNo,
      bpjsEmployeeStartPay: form.bpjsEmployeeStartPay,
      bpjsEmployeeEndPay: form.bpjsEmployeeEndPay,
      bpjsHealthCareNo: form.bpjsHealthCareNo,
      bpjsHealthCareStartPay: form.bpjsEmployeeStartPay,
      bpjsHealthCareEndPay: form.bpjsEmployeeEndPay,
      npwpNo: form.npwpNo,
      martialAndDependents: form.martialAndDependents,
      taxStartPay: form.taxStartPay,
      taxEndPay: form.taxEndPay,
    };

    const response = await updateDataSalaries(
      Number(form?.employeeId),
      payload
    );
    if (response && !response.isError) {
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      dispatch(setLoading(false));
      getEmployeePagination(params);
      getSalaries()
      setAddSalary(false);
      setEditSalary(false);
      snackBar("success", "Data Salary saved successfully");
      resetValueForm();
    } else {
      setAddSalary(false);
      setEditSalary(false);
      dispatch(setLoading(false));
      snackBar("error", "Data Salary failed to save");
      resetValueForm();
    }
  };

  const handleRegister = async () => {
    dispatch(setLoading(true));

    const payload = {
      userName: form.employeeId,
      fullname: form.employeeName,
      email: form.emailAddress,
      password: "123456",
      role: form.positionName,
      accountTypeId: form.accountTypeId,
    };

    const response = await register(payload);

    if (response && !response.isError) {
      snackBar("success", "user registered successfully");
      resetValueForm();
      dispatch(setLoading(false));
      setShowModalRegister(false);
    } else {
      resetValueForm();
      dispatch(setLoading(false));
      setShowModalRegister(false);
    }
  };

  const [dataSubscribe, setDataSubscribe] = useState<GetDataSubscribe[] | null>(null);
  const getSubscribe = async () => {
    dispatch(setLoading(true));

    try {
      const response = (await getDataSubscribe()) as GetDatasSubscribe;
      if (response.data.length > 0) {
        setDataSubscribe(response.data);
      } else {
        setDataSubscribe(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const [dataPosition, setDataPosition] = useState<GetDataPositionResponse[] | null >(null);
  const getPosition = async () => {
    dispatch(setLoading(true));

    try {
      const response = (await getDataPosition()) as GetPositionResponse;
      if (response.data.length > 0) {
        setDataPosition(response.data);
      } else {
        setDataPosition(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const [dataArea, setDataArea] = useState<GetDataAreaResponse[] | null>(null);
  const getDataAreas = async () => {
    dispatch(setLoading(true));

    try {
      const response = (await getDataArea()) as GetAreaResponse;
      if (response.data.length > 0) {
        setDataArea(response.data);
      } else {
        setDataArea(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const [dataDepartment, setDataDepartment] = useState<GetDataDepartmentResponse[] | null>(null);
  const getDepartment = async () => {
    dispatch(setLoading(true));

    try {
      const response = (await getDataDepartment()) as GetDepartmentResoponse;
      if (response.data.length > 0) {
        setDataDepartment(response.data);
      } else {
        setDataDepartment(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const [dataShift, setDataShift] = useState<GetDataShift[] | null>(null);
  const getShift = async () => {
    dispatch(setLoading(true));

    try {
      const response = (await getDataShift()) as GetShiftResponse;
      if (response.data.length > 0) {
        setDataShift(response.data);
      } else {
        setDataShift(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const [dataSalaries, setDataSalaries] = useState<GetDataSalaries[] | null>(null);
  const getSalaries = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getDataSalaries();
      if (response.data) {
        setDataSalaries(response.data);
      } else {
        setDataSalaries(null);
      }
    } catch (e: any) {}
    dispatch(setLoading(false));
  };

  const handleEditData = async (data: GetDataEmployee) => {
    setDataEdit(data);
    setForm((prevValue) => {
      return {
        ...prevValue,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        departmentId: data.departmentId,
        departmentCode: data.departmentCode,
        departmentName: data.departmentName,
        positionId: data.positionId,
        positionCode: data.positionCode,
        positionName: data.positionName,
        employeeTypeCode: data.employeeTypeCode,
        employeeTypeName: data.employeeTypeName,
        pic: data.pic,
        gender: data.gender,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
        address: data.address,
        postalCode: data.postalCode,
        national: data.national,
        religion: data.religion,
        emailAddress: data.emailAddress,
        profilePhoto: data.profilePhoto,
        workTypeId: data.workTypeId,
        workTypeName: data.workTypeName,
        areaId: data.areaId,
        areaCode: data.areaCode,
        areaName: data.areaName,
        shiftId: data.shiftId,
        shiftCode: data.shiftCode,
        shiftName: data.shiftName,
        isResign: data.isResign,
        joinDate: data.joinDate,
        resignDate: data.resignDate,
        effectiveStart: data.effectiveStart,
        effectiveEnd: data.effectiveEnd,
        accountTypeId: data.accountTypeId,
      };
    });
    setEditClicked(true);
    setAddClicked(false);
    setAddSalary(false);
  };
  
  const handleSalary = async (data: GetDataEmployee, id: number) => {

    if(dataSalaries){
      dataSalaries?.forEach(salaries => {
        if(salaries.employeeId === Number(id)){
          setEditSalary(true)
          setForm((prevValue)=>{
            return{
              ...prevValue,
            employeeId: data.id,
            employeeName: data.employeeName,
            departmentId: data.departmentId,
            departmentCode: data.departmentCode,
            departmentName: data.departmentName,
            positionId: data.positionId,
            positionCode: data.positionCode,
            positionName: data.positionName,
            earning: salaries.earning,
            currency: salaries.currency,
            bankName: salaries.bankName,
            bankAccount: salaries.bankAccount,
            paymentMethod: salaries.paymentMethod,
            bpjsEmployeeNo: salaries.bpjsEmployeeNo,
            bpjsEmployeeStartPay: salaries.bpjsEmployeeStartPay,
            bpjsEmployeeEndPay: salaries.bpjsEmployeeEndPay,
            bpjsHealthCareNo: salaries.bpjsHealthCareNo,
            bpjsHealthCareStartPay: salaries.bpjsEmployeeStartPay,
            bpjsHealthCareEndPay: salaries.bpjsHealthCareEndPay,
            npwpNo: salaries.npwpNo,
            martialAndDependents: salaries.martialAndDependents,
            taxStartPay: salaries.taxStartPay,
            taxEndPay: salaries.taxEndPay,
            }
          })
        }else{
          setForm((prevValue)=>{
            return{
              ...prevValue,
            employeeId: data.id,
            employeeName: data.employeeName,
            departmentId: data.departmentId,
            departmentCode: data.departmentCode,
            departmentName: data.departmentName,
            positionId: data.positionId,
            positionCode: data.positionCode,
            positionName: data.positionName,
          }
        })
        }
      })
    }else{
      setForm((prevValue)=>{
        return{
          ...prevValue,
        employeeId: data.id,
        employeeName: data.employeeName,
        departmentId: data.departmentId,
        departmentCode: data.departmentCode,
        departmentName: data.departmentName,
        positionId: data.positionId,
        positionCode: data.positionCode,
        positionName: data.positionName,
      }
    })
    }

    setAddSalary(true);
    setListSelected([]);
    setSelectedAll(false);
  };

  const onEditData = async () => {
    dispatch(setLoading(true));
    let areaId: string | Array<string> = form.areaId;
    let areaName: string | Array<string> = form.areaName;
    let areaCode: string | Array<string> = form.areaCode;
    if (
      typeof areaId === "string" &&
      typeof areaCode === "string" &&
      typeof areaName === "string"
    ) {
      areaId = [areaId];
      areaCode = [areaCode];
      areaName = [areaName];
    }
    const payload = {
      employeeId: form.employeeId,
      employeeName: form.employeeName,
      departmentId: form.departmentId,
      departmentCode: form.departmentCode,
      departmentName: form.departmentName,
      positionCode: form.positionCode,
      positionName: form.positionName,
      shiftId: form.shiftId,
      shiftName: form.shiftName,
      employeeTypeCode: form.employeeTypeCode,
      employeeTypeName: form.employeeTypeName,
      gender: form.gender,
      birthday: form.birthday,
      phoneNumber: form.phoneNumber,
      address: form.address,
      postalCode: form.postalCode,
      national: form.national,
      religion: form.religion,
      emailAddress: form.emailAddress,
      profilePhoto: form.profilePhoto,
      workTypeId: form.workTypeId,
      workTypeName: form.workTypeName,
      areaId: areaId,
      areaCode: areaCode,
      areaName: areaName,
      isResign: form.isResign,
      joinDate: form.joinDate,
      resignDate: form.resignDate,
      effectiveStart: form.effectiveStart,
      effectiveEnd: form.effectiveEnd,
      accountTypeId: form.accountTypeId,
      updatedBy: "tapasya",
    };

    const response = await updateDataEmployee(
      dataEdit?.id.toString() || "",
      payload
    );

    if (response && !response.isError) {
      setEditClicked(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      resetValueForm();
      setDataEdit(null);
      snackBar("success", "Success Edit Data Employee");
    } else {
      setEditClicked(false);
      const params = {
        pageNumber: onPage,
        search: isEmpty(query) ? null : query,
      };
      getEmployeePagination(params);
      resetValueForm();
      setDataEdit(null);
      dispatch(setLoading(false));
      snackBar("error", "Failed Edit Data Employee");
    }
  };

  const handleSelected = (data: GetDataEmployee) => {
    if (listSelected.includes(data)) {
      const arrayFilter = listSelected.filter((e) => e !== data);
      setListSelected(arrayFilter);
    } else {
      setListSelected([...listSelected, data]);
    }
  };

  const handleCheckAll = () => {
    if (selectedAll) {
      setListSelected([]);
      setSelectedAll(false);
    } else {
      setListSelected(dataEmployee || []);
      setSelectedAll(true);
    }
  };

  const handleExportData = async () => {
    dispatch(setLoading(true));

    if (listSelected.length > 0) {
      await exportDataEmployee(listSelected);
      snackBar("success", "Data Employee successfully downloaded");
      dispatch(setLoading(false));
    } else {
      const dataAll = (await getDataEmployee()) as GetDataEmployees;
      if (dataAll.data) await exportDataEmployee(dataAll?.data);
      snackBar("success", "Data Employee failed to download");
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDataAreas();
    getPosition();
    getShift();
    getDepartment();
    getSubscribe();
    getSalaries()
  }, []);

  return (
    <div className="inset-2 mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-8 flex flex-row gap-4 p-6"
        >
          {!addClicked && !editClicked && !addSalary && (
            <>
              <HeaderBack />
              <Typography variant="h6" color="white">
                Employee
              </Typography>
            </>
          )}
          {addClicked && (
            <>
              <div
                className="flex w-5 cursor-pointer items-center"
                onClick={() => {
                  setAddClicked(false);
                  resetValueForm();
                }}
              >
                <ArrowLeftIcon />
              </div>
              <Typography variant="h6" color="white">
                Add Employee
              </Typography>
            </>
          )}

          {addSalary && (
            <>
              <div
                className="flex w-5 cursor-pointer items-center"
                onClick={() => {
                  setAddSalary(false);
                  setEditSalary(false);
                  resetValueForm();
                }}
              >
                <ArrowLeftIcon />
              </div>
              <Typography variant="h6" color="white">
                Set Salary Employee
              </Typography>
            </>
          )}

          {editClicked && (
            <>
              <div
                className="flex w-5 cursor-pointer items-center"
                onClick={() => {
                  setEditClicked(false);
                  resetValueForm();
                }}
              >
                <ArrowLeftIcon />
              </div>
              <Typography variant="h6" color="white">
                Edit Employee
              </Typography>
            </>
          )}
        </CardHeader>

        {!addClicked && !editClicked && !addSalary && (
          <div className="flex flex-row gap-1">
            <Button
              variant="filled"
              color={"green"}
              className={"px ml-4 mb-4 flex w-20 justify-center p-2"}
              onClick={handleAdd}
            >
              <PlusIcon strokeWidth={4} className="mr-1 mt-[1px] h-4 w-4" />
              <Typography
                variant="small"
                className="font-bold uppercase text-white "
              >
                {"Add"}
              </Typography>
            </Button>
            {dataEmployee && (
              <Badge
                invisible={listSelected?.length === 0}
                content={listSelected.length}
              >
                <Button
                  variant="filled"
                  color={"blue"}
                  className={`p-2 ${
                    listSelected.length > 0 ? "w-30" : "w-34 "
                  } ml-4 mb-4 flex justify-center`}
                  onClick={handleExportData}
                >
                  <ArrowUpTrayIcon
                    strokeWidth={5}
                    className="mr-2 mt-[1px] h-4 w-4"
                  />
                  <Typography
                    variant="small"
                    className="font-bold uppercase text-white "
                  >
                    {`${listSelected.length > 0 ? "Export" : "Export All"}`}
                  </Typography>
                </Button>
              </Badge>
            )}
          </div>
        )}
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-5">
          {!addClicked && !editClicked && !addSalary && (
            <EmployeeTable
              isLoading={store.getState()}
              getDataEmployee={dataEmployee}
              dataSalaries={dataSalaries}
              selectedAll={selectedAll}
              listSelected={listSelected}
              handleDelete={handleClickDelete}
              handleEdit={handleEditData}
              handleSalary={handleSalary}
              handleCheckAll={handleCheckAll}
              handleSelected={handleSelected}
            />
          )}
          {addClicked && (
            <AddEmployee
              form={form}
              setForm={setForm}
              addClicked={addClicked}
              handleSave={handleSave}
              isLoading={store.getState()}
              dataArea={dataArea}
              dataPosition={dataPosition}
              dataSubscribe={dataSubscribe}
              dataShift={dataShift}
            />
          )}

          {addSalary && (
            <AddSalary
              addSalary={addSalary}
              editSalary={editSalary}
              dataEdit={dataEdit}
              form={form}
              setForm={setForm}
              handleSave={handleSaveSalary}
              handleEdit={handleEditSalary}
              isLoading={store.getState()}
              dataPosition={dataPosition}
            />
          )}
          {editClicked && (
            <AddEmployee
              form={form}
              setForm={setForm}
              isLoading={store.getState()}
              onEdit={onEditData}
              dataArea={dataArea}
              dataPosition={dataPosition}
              dataSubscribe={dataSubscribe}
              dataShift={dataShift}
            />
          )}

          {!addClicked &&
          !editClicked &&
          !addSalary &&
          dataEmployee &&
          totalPage > 1 ? (
            <Pagination
              onChange={handleChangePage}
              total={totalPage}
              current={currentPage}
            />
          ) : store.getState() &&
            !dataEmployee &&
            !addClicked &&
            !addSalary &&
            !editClicked ? (
            <NoData />
          ) : null}
        </CardBody>
      </Card>

      <Modal
        open={showModalDelete}
        header={" Are you sure want to delete this employee's data?"}
        handleClose={() => setShowModalDelete(false)}
        body={
          <>
            {" "}
            <Typography>
              {" "}
              All related data will be deleted and cannot be retrieved.{" "}
            </Typography>{" "}
          </>
        }
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"red"}
              disabled={!store.getState()}
              className={"ml-4 mb-4 flex w-32 flex-row justify-center p-2"}
              onClick={() => handleDelete(idDelete)}
            >
              {!store.getState() ? (
                <>
                  <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                  <Typography
                    variant="small"
                    className="text-center text-xs font-bold uppercase text-white lg:text-sm"
                  >
                    {"Loading"}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="small"
                  className="text-center text-xs font-bold uppercase text-white lg:text-sm"
                >
                  {"Delete"}
                </Typography>
              )}
            </Button>
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2	"}
              onClick={() => setShowModalDelete(false)}
            >
              <Typography
                variant="small"
                className="text-center text-xs font-bold uppercase text-white lg:text-sm"
              >
                {"Cancel"}
              </Typography>
            </Button>
          </div>
        }
        size="sm"
      />

      <Modal
        open={showModalRegister}
        header={"Would you like to register this employee?"}
        handleClose={() => setShowModalRegister(false)}
        body={<></>}
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              disabled={!store.getState()}
              className={"ml-4 mb-4 flex w-32 flex-row justify-center p-2"}
              onClick={() => handleRegister()}
            >
              {!store.getState() ? (
                <>
                  <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                  <Typography
                    variant="small"
                    className="text-center text-xs font-bold uppercase text-white lg:text-sm"
                  >
                    {"Loading"}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="small"
                  className="items-center text-center text-xs font-bold uppercase text-white lg:text-sm"
                >
                  {"Yes"}
                </Typography>
              )}
            </Button>
            <Button
              variant="filled"
              color={"red"}
              className={"ml-4 mb-4 w-28 content-center p-2	"}
              onClick={() => {
                setShowModalRegister(false);
                resetValueForm();
              }}
            >
              <Typography
                variant="small"
                className="text-center text-xs font-bold uppercase text-white lg:text-sm"
              >
                {"No"}
              </Typography>
            </Button>
          </div>
        }
        size="sm"
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Typography, Button, Input, Spinner } from "@material-tailwind/react";
import { InputDatePicker } from "@/app/components";
import Select from "react-select";
import CustomSelect from "@/app/components/atoms/CustomSelect";
import { GetDataPositionResponse } from "@/interface/position";

export interface IEmployeeProps {
  isLoading: boolean | any;
  addSalary?: boolean;
  editSalary?: boolean;
  handleSave?: () => void;
  handleEdit?: () => void;
  form: any;
  setForm: any;
  dataEdit: any;
  dataPosition: GetDataPositionResponse[] | null;
}

export default function AddSalary({
  isLoading,
  handleSave,
  handleEdit,
  editSalary,
  form,
  setForm,
  dataEdit,
}: IEmployeeProps) {
  const dataCurrency = [
    {
      label: "IDR",
      value: "idr",
    },
    {
      label: "USD",
      value: "usd",
    },
  ];
  const paymentMethod = [
    {
      label: "Bank Transfer",
      value: "Bank Transfer",
    },
    {
      label: "Cash",
      value: "cash",
    },
  ];

  const martialAndDependents = [
    {
      label:"TK/0",
      value:"TK/0",
    },
    {
      label:"K/0",
      value:"K/0",
    },
    {
      label:"K/1",
      value:"K/1",
    },
    {
      label:"K/2",
      value:"K/2",
    },
    {
      label:"K/3",
      value:"K/3",
    },
  ]

  const handleInputChange = (event) => {
    setForm((prevValue) => {
      return {
        ...prevValue,
        id: form.employeeId,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="inset-2 mb-8 flex flex-col gap-12">
      <form className="p-5">
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-2">
          <Input
            name="employeeName"
            defaultValue={form.employeeName}
            label="Name"
            color="green"
            onChange={handleInputChange}
            disabled
            crossOrigin={undefined}
          />

          <Select
            className="text-sm"
            isClearable={true}
            placeholder="Position Name"
            value={{
              value: [form.departmentCode, " - ", form.positionCode],
              label: [form.departmentName, " - ", form.positionName],
            }}
            isDisabled
          />

          <Input
            type="number"
            name="earning"
            defaultValue={form.earning == 0 ? "" : form.earning}
            label="Salary"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />

          <CustomSelect
            value={
              form.currency != ""
                ? { value: form.currency, label: form.currency }
                : null
            }
            placeholder="Currency"
            options={dataCurrency}
            onChange={(selectedOption) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  currency: selectedOption?.value,
                };
              });
            }}
          />

          <CustomSelect
            value={
              form.paymentMethod != ""
                ? { value: form.paymentMethod, label: form.paymentMethod }
                : null
            }
            placeholder="Payment Method"
            options={paymentMethod}
            onChange={(selectedOption) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  paymentMethod: selectedOption?.value,
                };
              });
            }}
          />

          <Input
            name="bankName"
            defaultValue={form.bankName}
            label="Bank Name"
            color="green"
            onChange={handleInputChange}
            required={form.paymentMethod === "" ||  form.paymentMethod === "cash" ? false : true}
            crossOrigin={undefined}
          />

          <Input
            name="bankAccount"
            defaultValue={form.bankAccount}
            label="Bank Account"
            color="green"
            onChange={handleInputChange}
            required={form.paymentMethod === "" ||  form.paymentMethod === "cash" ? false : true}
            crossOrigin={undefined}
          />

          <Input
            name="npwpNo"
            defaultValue={form.npwpNo}
            label="NPWP"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <CustomSelect
            value={
              form.martialAndDependents != ""
                ? { value: form.martialAndDependents, label: form.martialAndDependents }
                : null
            }
            placeholder="Martial and Dependents"
            options={martialAndDependents}
            onChange={(selectedOption) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  martialAndDependents: selectedOption?.value,
                };
              });
            }}
          />
          <InputDatePicker
            label="Tax Start Pay"
            value={!form.taxStartPay ? null : new Date(form.taxStartPay)}
            onChange={(date: Date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  taxStartPay: date,
                };
              });
            }}
          />
          <InputDatePicker
            label="Tax End Pay"
            value={!form.taxEndPay ? null : new Date(form.taxEndPay)}
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  taxEndPay: date,
                };
              });
            }}
          />
          <Input
            name="bpjsEmployeeNo"
            defaultValue={form.bpjsEmployeeNo}
            label="BPJS Employe Number"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          <Input
            name="bpjsHealthCareNo"
            defaultValue={form.bpjsHealthCareNo}
            label="BPJS Health Care Number"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />
          <InputDatePicker
            label="BPJS Employee Start Pay"
            value={
              !form.bpjsEmployeeStartPay
                ? null
                : new Date(form.bpjsEmployeeStartPay)
            }
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  bpjsEmployeeStartPay: date,
                };
              });
            }}
          />
          <InputDatePicker
            label="BPJS Health Care Start Pay"
            value={
              form.bpjsHealthCareStartPay
                ? new Date(form.bpjsHealthCareStartPay)
                : null
            }
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  bpjsHealthCareStartPay: date,
                };
              });
            }}
          />
          <InputDatePicker
            label="BPJS Employee End Pay"
            value={
              !form.bpjsEmployeeEndPay
                ? null
                : new Date(form.bpjsEmployeeEndPay)
            }
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  bpjsEmployeeEndPay: date,
                };
              });
            }}
          />
          <InputDatePicker
            label="BPJS Health Care End Pay"
            value={
              !form.bpjsHealthCareEndPay
                ? null
                : new Date(form.bpjsHealthCareEndPay)
            }
            onChange={(date: Date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  bpjsHealthCareEndPay: date,
                };
              });
            }}
          />
        </div>
        <div className="mt-5 flex flex-row-reverse">
          <Button
            variant="filled"
            color={"green"}
            disabled={
              !isLoading ||
              form.earning == 0 ||
              form.currency == "" ||
              form.paymentMethod == "" ||
              form.martialAndDependents == ""
            }
            className={"ml-4 mb-4 flex w-28 flex-row justify-center p-2"}
            onClick={!editSalary ? handleSave : handleEdit}
          >
            {!isLoading ? (
              <>
                <Spinner color="blue" className="mr-2 mt-0.5 h-4 w-4" />
                <Typography
                  variant="small"
                  className="text-center font-bold uppercase text-white"
                >
                  {"Loading"}
                </Typography>
              </>
            ) : (
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Save"}
              </Typography>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

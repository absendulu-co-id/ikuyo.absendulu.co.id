import { Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import {
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { dataHeader } from "@/app/data/employee";
import { TableLoading } from "../../organisms";

const EmployeeTable = ({
  getDataEmployee,
  dataSalaries,
  isLoading,
  selectedAll,
  listSelected,
  handleDelete,
  handleEdit,
  handleSalary,
  handleSelected,
  handleCheckAll,
}) => {
  const renderTableCell = (content: string | boolean) => (
    <Typography
      variant="small"
      color="blue-gray"
      className="whitespace-nowrap px-4 text-xs font-medium capitalize"
    >
      {content}
    </Typography>
  );

  
  return (
    <>
      <table>
        <thead>
          <tr>
            {getDataEmployee && (
              <th className="w-[2px] border-b border-blue-gray-50 pl-2 text-center">
                <Checkbox
                  color="green"
                  checked={selectedAll}
                  onClick={handleCheckAll}
                  crossOrigin={undefined}
                />
              </th>
            )}
            {dataHeader.map((data) => (
              <th
                key={data}
                className="border-b border-blue-gray-50 py-3 px-5 text-left"
              >
                <Typography
                  variant="small"
                  className="whitespace-nowrap text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {data}
                </Typography>
              </th>
            ))}
            <th className="sticky right-0 border-b border-blue-gray-50 bg-gray-50 py-3 px-5">
              <Typography
                variant="small"
                className="whitespace-nowrap text-[11px] font-bold uppercase text-blue-gray-400"
              >
                action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            <TableLoading row={30} />
          ) : (
            <>
              {getDataEmployee &&
                getDataEmployee.map((data, index) => {
                  const matchingSalary = dataSalaries?.find(
                    salary => salary.employeeId === Number(data.id)
                  );
            
                  return (

                  <tr key={index}>
                    <td className="pl-2">
                      <Checkbox
                        color="green"
                        checked={listSelected.includes(data)}
                        onClick={() => handleSelected(data)}
                        crossOrigin={undefined}
                      />
                    </td>
                    <td>{renderTableCell(data.employeeId)}</td>
                    <td>{renderTableCell(data.employeeName)}</td>
                    <td>{renderTableCell(data.employeeTypeName)}</td>
                    <td>
                      {renderTableCell(
                        data.workTypeName ? (
                          data.workTypeName
                        ) : (
                          <center>-</center>
                        )
                      )}
                    </td>
                    <td>{renderTableCell(data.departmentName)}</td>
                    <td>{renderTableCell(data.positionName)}</td>
                    <td>{renderTableCell(data.areaName)}</td>
                    <td>{renderTableCell(data.shiftName)}</td>
                    <td>{renderTableCell(data.gender)}</td>
                    <td>{renderTableCell(data.birthday.slice(0, 10))}</td>
                    <td>{renderTableCell(data.phoneNumber)}</td>
                    <td>{renderTableCell(data.address)}</td>
                    <td>{renderTableCell(data.postalCode)}</td>
                    <td>{renderTableCell(data.national)}</td>
                    <td>{renderTableCell(data.religion)}</td>
                    <td>{renderTableCell(data.emailAddress)}</td>
                    <td>
                      {renderTableCell(
                        data.joinDate ? (
                          data.joinDate.slice(0, 10)
                        ) : (
                          <center>-</center>
                        )
                      )}
                    </td>
                    <td>
                      {renderTableCell(
                        data.effectiveStart ? (
                          data.effectiveStart.slice(0, 10)
                        ) : (
                          <center>-</center>
                        )
                      )}
                    </td>
                    <td>
                      {renderTableCell(
                        data.effectiveEnd ? (
                          data.effectiveEnd.slice(0, 10)
                        ) : (
                          <center>-</center>
                        )
                      )}
                    </td>
                    <td>
                      {renderTableCell(data.isResign === true ? "Yes" : "No")}
                    </td>
                    <td>
                      {renderTableCell(
                        data.resignDate ? (
                          data.resignDate.slice(0, 10)
                        ) : (
                          <center>-</center>
                        )
                      )}
                    </td>
                    <td className="sticky right-0 bg-gray-50 py-3 px-5">
                      <div className="flex items-center justify-end gap-4">
                        {data.accountTypeId === 1 ? 
                          <div className="flex space-x-1">
                            <Tooltip
                              content={
                                <Typography color="white" className="text-xs">
                                    Available on Mobile
                                </Typography>
                              }
                            >
                            <DevicePhoneMobileIcon
                              color="green"
                              strokeWidth={1}
                              className="h-5 w-5 cursor-pointer"
                            />
                            </Tooltip>
                            <Tooltip
                              content={
                                <Typography color="white" className="text-xs">
                                    Available on Website
                                </Typography>
                              }
                            >
                              <ComputerDesktopIcon
                                color="green"
                                className="h-5 w-5 cursor-pointer"
                              />
                            </Tooltip>
                        </div>
                        :
                        <Tooltip
                          content={
                            <Typography color="white" className="text-xs">
                                Available on Website
                            </Typography>
                          }
                        >
                          <ComputerDesktopIcon
                            color="green"
                            className="h-5 w-5 cursor-pointer"
                          />
                        </Tooltip>
                        }
                        {matchingSalary ? (
                          <Tooltip
                            content={
                              <Typography color="white" className="text-xs">
                                  Edit Salary Employee
                              </Typography>
                            }
                          >
                            <CurrencyDollarIcon
                              key={matchingSalary.employeeId}
                              color="green"
                              className="h-5 w-5 cursor-pointer"
                              onClick={() => handleSalary(data, data.id)}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={
                              <Typography color="white" className="text-xs">
                                  Add Salary Employee
                              </Typography>
                            }
                          >
                            <CurrencyDollarIcon
                              key={data.id} 
                              color="orange"
                              className="h-5 w-5 cursor-pointer"
                              onClick={() => handleSalary(data, data.id)}
                            />
                          </Tooltip>
                        )}
                        <PencilIcon
                          color="green"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => handleEdit(data)}
                        />
                        <TrashIcon
                          color="#ef5350"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => handleDelete(data.id.toString())}
                        />
                      </div>
                    </td>
                  </tr>
                )})}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTable;

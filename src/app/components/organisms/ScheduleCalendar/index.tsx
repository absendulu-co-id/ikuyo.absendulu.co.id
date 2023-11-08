import { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import moment from "moment";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { Modal } from "@/app/components/molecules";

const nameOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface Props {
    data: Array<Object> | [];
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    month: number;
    year: number | string;
    handleClickMonth: (param: number) => any;
    isOpenMonth: boolean;
    setIsOpenMonth: (param: boolean) => any;
}
const ScheduleCalendar = ({
    data,
    handlePrevMonth,
    handleNextMonth,
    month,
    year,
    handleClickMonth,
    isOpenMonth,
    setIsOpenMonth,
}: Props) => {

    const [totalDate, setTotalDate] = useState<number>(0);
    const dateNow = parseInt(moment().format('DD'));
    const thisMonth = new Date().getMonth() + 1;

    const handleOpenMonth = () => {
        setIsOpenMonth(true);
    }

    const selectedMonth = nameOfMonth[month - 1];

    useEffect(() => {
        const totalDate = moment(new Date()).daysInMonth();
        setTotalDate(data?.length || totalDate);
    }, [data?.length]);

    return (
        <>
            <div className="mx-auto mt-10">
                <div className="wrapper bg-white rounded shadow w-full" data-tut="reactour_calendar_all">
                    <div className="header flex justify-between border-b p-2">
                        <ArrowLeftIcon strokeWidth={2} className="h-8 w-8 cursor-pointer" onClick={handlePrevMonth} data-tut="reactour_calendar_prev" />
                        <span className="text-lg font-bold" data-tut="reactour_calendar_month">
                            <span
                                className="cursor-pointer hover:border-b-4 border-green-700"
                                onClick={handleOpenMonth}
                            >
                                {selectedMonth}
                            </span>
                            -
                            {(year)}
                        </span>
                        <ArrowRightIcon strokeWidth={2} className="h-8 w-8 cursor-pointer" onClick={handleNextMonth} data-tut="reactour_calendar_next" />  
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden text-red-500">Sunday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
                                </th>
                                <th className="p-2 border-r h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 xl:text-sm text-xs">
                                    <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
                                </th>
                            </tr>
                        </thead>
                    

                        
                        <tbody>
                            {data?.map((list: any, index: number) =>{
                                return (
                                    
                                    <>
                                        {index % 7 === 0 && (
                                            <tr key={`table-row-${index}`} className="text-center h-20 mb-4">
                                                {data.slice(index, index + 7).map((newList: any, newIndex: number) => {

                                                    let bgDate = '';
                                                    if (newList.date === dateNow && month === thisMonth) bgDate = 'bg-green-100';

                                                    let textDate = 'text-gray-500';
                                                    if (newList.isSunday) textDate = 'text-red-500';

                                                    let textOpacity = 'text-opacity-100';
                                                    if (newList.month !== month) {
                                                        bgDate = 'bg-white';
                                                        textOpacity = 'text-opacity-50';
                                                    }

                                                    return (
                                                        <td key={`table-data-${newIndex}`} className={`border p-1 h-10 2xl:w-32 xl:w-20 lg:w-24 md:w-12 sm:w-2 w-2 overflow-auto transition cursor-pointer duration-500 ease bg-gray-100 hover:bg-gray-300 ${bgDate}`}>
                                                            <div className="flex flex-col h-40 2xl:w-32	xl:w-30	lg:w-24 md:w-12 sm:w-6 w-8 mx-auto overflow-hidden">
                                                                <div className="top h-5 w-full">
                                                                    <span className={`${textDate} ${textOpacity}`}>{newList.date}</span>
                                                                </div>

                                                                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                                                                    {newList.isHoliday && (
                                                                        <Tooltip content={newList.holidayName}>
                                                                            <div className="event bg-red-400 text-white rounded p-1 text-xs mb-1">
                                                                                <span className="event-name">
                                                                                    {newList.holidayName}
                                                                                </span>
                                                                            </div>
                                                                        </Tooltip>
                                                                    )}
                                                                    
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )}
                                    
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                open={isOpenMonth}
                header={""}
                handleClose={() => setIsOpenMonth(false)}
                body={
                    <div className="w-full p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-4 text-xs lg:text-md xl:text-xl rounded-xl mt-2">
                    {nameOfMonth.map((singleMonth, index)=> (
                      <button 
                        name="workDays"
                        key={`singleMonth-${index}`} 
                        type="button" 
                        onClick={() => handleClickMonth(index + 1)} 
                        className={` ${singleMonth === selectedMonth && 'border-b-4 bg-green-100 border-green-700'} hover:border-b-4 border-green-700 cursor-pointer h-10 rounded-xl bg-gray-100 py-2 px-0 text-center text-xs text-gray-900 duration-300 `}
                      >
                          {singleMonth}
                      </button>
                    ))}
                  </div>
                }
                footer={""}
            />
        </>
    )
}

export default ScheduleCalendar;
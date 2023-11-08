import { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import moment from "moment";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Modal } from "@/app/components/molecules";

const nameOfMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
const Schedule = ({
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

  const dateNow = parseInt(moment().format("DD"));
  const thisMonth = new Date().getMonth() + 1;

  const handleOpenMonth = () => {
    setIsOpenMonth(true);
  };

  const selectedMonth = nameOfMonth[month - 1];  

  useEffect(() => {
    const totalDate = moment(new Date()).daysInMonth();
    setTotalDate(data?.length || totalDate);
  }, [data?.length]);

  return (
    <>
      <div className="mx-auto mt-10">
        <div className="wrapper w-full rounded bg-white shadow ">
          <div className="header flex justify-between border-b p-2">
            <ArrowLeftIcon
              strokeWidth={2}
              className="h-8 w-8 cursor-pointer"
              onClick={handlePrevMonth}
            />
            <span className="text-lg font-bold">
              <span
                className="cursor-pointer border-green-700 hover:border-b-4"
                onClick={handleOpenMonth}
              >
                {selectedMonth}
              </span>{" "}
              - {year}
            </span>
            <ArrowRightIcon
              strokeWidth={2}
              className="h-8 w-8 cursor-pointer"
              onClick={handleNextMonth}
            />
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden text-red-500 sm:block md:block lg:block xl:block">
                    Sunday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Sun
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Monday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Mon
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Tuesday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Tue
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Wednesday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Wed
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Thursday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Thu
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Friday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Fri
                  </span>
                </th>
                <th className="h-10 w-2 border-r p-2 text-xs sm:w-2 md:w-12 lg:w-24 xl:w-20 xl:text-sm 2xl:w-32">
                  <span className="hidden sm:block md:block lg:block xl:block">
                    Saturday
                  </span>
                  <span className="block sm:hidden md:hidden lg:hidden xl:hidden">
                    Sat
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((list: any, index: number) => {
                return (
                  <>
                    {index % 7 === 0 && (
                      <tr
                        key={`table-row-${index}`}
                        className="mb-4 h-20 text-center"
                      >
                        {data
                          .slice(index, index + 7)
                          .map((newList: any, newIndex: number) => {
                            let bgDate = "";
                            let bgLabel = "";
                            if (newList.date === dateNow && month === thisMonth)
                              bgDate = "bg-green-100";
                              bgLabel = "bg-blue-500"

                            let textDate = "text-gray-500 font-semibold";
                            if (newList.isSunday) textDate = "text-red-500";

                            let textOpacity = "text-opacity-100 font-semibold";
                            let statusOpacity = "opacity-100";
                            if (newList.month !== month) {
                              bgDate = "bg-white";
                              bgLabel = "bg-blue-500/50"
                              textOpacity = "text-opacity-50";
                              statusOpacity = "opacity-50";
                            }

                            return (
                              <td
                                key={`table-data-${newIndex}`}
                                className={`ease h-10 w-2 cursor-pointer overflow-auto border bg-gray-100 p-1 transition duration-500 hover:bg-gray-300 sm:w-2 md:w-12 lg:w-24 xl:w-20 2xl:w-32 ${bgDate}`}
                              >
                                <div className="xl:w-30 mx-auto flex h-40	w-8	flex-col overflow-hidden sm:w-6 md:w-12 lg:w-24 2xl:w-32">
                                  <div className="top h-5 w-full">
                                    <span
                                      className={`${textDate} ${textOpacity}`}
                                    >
                                      {newList.date}
                                    </span>
                                  </div>

                                  <div className="bottom h-30 w-full flex-grow cursor-pointer py-1">
                                    {newList.workShift && (
                                      <div className="flex flex-col space-y-1">
                                        <div className="flex items-center">
                                          <div
                                            className={`${
                                              newList.workStatus.toLowerCase() === "work" || newList.workStatus.toLowerCase() === "leave"
                                                ? `bg-green-500 ${statusOpacity}`
                                                : newList.workStatus.toLowerCase() === "off day"
                                                ? `bg-pink-300 ${statusOpacity}`
                                                : newList.workStatus === ""
                                                ? `hidden`
                                                : `bg-red-600 ${statusOpacity}`
                                            } event rounded-full p-1`}
                                          ></div>
                                          <div
                                            className={`${
                                              newList.workStatus.toLowerCase() === "work" || newList.workStatus.toLowerCase() === "leave"
                                                ? `text-green-500 ${statusOpacity}`
                                                : newList.workStatus.toLowerCase() === "off day"
                                                ? `text-pink-300 ${statusOpacity}`
                                                : newList.workStatus === ""
                                                ? `hidden`
                                                : `text-red-600 ${statusOpacity}`
                                            } event p-1 text-start text-xs`}
                                          >
                                            {newList.workStatus}
                                          </div>
                                        </div>

                                        <div
                                          className={`${
                                            newList.workStatus != "Work"
                                              ? "hidden"
                                              : newList.isHoliday
                                              ? "flex bg-red-400"
                                              : `flex ${bgLabel}`
                                          } event mb-1 flex w-fit flex-col items-center rounded p-1 text-start text-xs capitalize text-white`}
                                        >
                                          <Tooltip content={newList.workShift}>
                                            <div>
                                              <span className="event-name capitalize">
                                                {newList.workShift} {" | "}{" "}
                                                {newList.startWorkTime} {" - "}{" "}
                                                {newList.endWorkTime}
                                              </span>
                                            </div>
                                          </Tooltip>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                      </tr>
                    )}
                  </>
                );
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
          <div className="lg:text-md mt-2 grid w-full grid-cols-2 gap-2 rounded-xl p-3 text-xs md:grid-cols-4 lg:grid-cols-7 lg:gap-4 xl:text-xl">
            {nameOfMonth.map((singleMonth, index) => (
              <button
                name="workDays"
                key={`singleMonth-${index}`}
                type="button"
                onClick={() => handleClickMonth(index + 1)}
                className={` ${
                  singleMonth === selectedMonth &&
                  "border-b-4 border-green-700 bg-green-100"
                } h-10 cursor-pointer rounded-xl border-green-700 bg-gray-100 py-2 px-0 text-center text-xs text-gray-900 duration-300 hover:border-b-4 `}
              >
                {singleMonth}
              </button>
            ))}
          </div>
        }
        footer={""}
      />
    </>
  );
};

export default Schedule;

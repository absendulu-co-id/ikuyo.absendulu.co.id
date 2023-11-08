import Schedule from "@/app/components/organisms/Schedule";
import { getDataCalendar } from "@/app/services/calendar";
import { getScheduleEmployee } from "@/app/services/schedule";
import { GetDataSchedule, GetScheduleResponse } from "@/interface/schedule";
import { isEmpty } from "@/utils/locDash";
import { useState, useEffect } from "react";

export function MyCalendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [data, setData] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenMonth, setIsOpenMonth] = useState<boolean>(false);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleClickMonth = async (selectedMonth: number) => {
    setIsLoading(true);
    try {
      const params = {
        year,
        month: selectedMonth,
      };

      setMonth(selectedMonth);
      const response = await getDataCalendar(params);

      if (!isEmpty(response)) setData(response);
    } catch (err) {
      setIsLoading(false);
      setIsOpenMonth(false);
    } finally {
      setIsLoading(false);
      setIsOpenMonth(false);
    }
  };

  const getSchedules = async () => {
    setIsLoading(true);
    try {
      const params = {
        year,
        month,
      };

      const response = await getScheduleEmployee(params);

      if (!isEmpty(response)) setData(response);
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSchedules();
  }, [month]);

  return (
    <div>
      <Schedule
        data={data}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        month={month}
        year={year.toString()}
        handleClickMonth={handleClickMonth}
        isOpenMonth={isOpenMonth}
        setIsOpenMonth={setIsOpenMonth}
      />
    </div>
  );
}

export default MyCalendar;

import { useState, useEffect } from "react";
import { ScheduleCalendar } from "@/app/components";
import { getDataCalendar } from "@/app/services/calendar";
import { isEmpty } from "@/utils/locDash";
import Tour from 'reactour';
import { TourConfigInterface } from "@/interface/tour";

export function Calendar() {
  const today = new Date();
  
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [data, setData] = useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenMonth, setIsOpenMonth] = useState<boolean>(false);

  const handlePrevMonth = () => {
    
    if (month === 1) {
      setMonth(12)
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
  }

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
  }

  const getDatasCalendar = async () => {
    setIsLoading(true);
    try {
        const params = {
            year,
            month,
        };

        const response = await getDataCalendar(params);
       
        if (!isEmpty(response)) setData(response);
        
    } catch (err) {
        setIsLoading(false);
    } finally {
        setIsLoading(false);
    }
  }

  const initialTourConfig = [
    {
      selector: '[data-tut="reactour_calendar_all"]',
      content: 'Here you access all calendar page',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour_calendar_month"]',
      content: 'Here you can change the month',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour_calendar_prev"]',
      content: 'Here you choose previous month',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour_calendar_next"]',
      content: 'Here you choose next month',
      isRead: false,
    },
  ];

  const pathUrl = document.location.href.split('/');

  const [isTourOpen, setIsTourOpen] = useState<string | null | boolean>(localStorage.getItem(`play-tour-${pathUrl.at(3)}`));
  const [tourConfig, setTourConfig] = useState<TourConfigInterface[]>(initialTourConfig);

  const handleCloseTour = () => {
    localStorage.setItem(`play-tour-${pathUrl.at(3)}`, 'false');
  }

  useEffect(() => {
    getDatasCalendar();
  }, [month])

  return (
    <>
      <ScheduleCalendar
        data={data}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        month={month}
        year={year.toString()}
        handleClickMonth={handleClickMonth}
        isOpenMonth={isOpenMonth}
        setIsOpenMonth={setIsOpenMonth}
      />

      <Tour 
        lastStepNextButton={<p onClick={handleCloseTour}>Done! Let's start exploring another menu !</p>}
        accentColor={"#57af5b"}
        rounded={5}
        isOpen={isTourOpen === 'true'}
        steps={tourConfig}
        onRequestClose={() => {
          setIsTourOpen(false);
        }}
      />
    </>
  );
}

export default Calendar;

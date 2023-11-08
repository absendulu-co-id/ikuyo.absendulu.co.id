import { getDataSubscribe } from "@/app/services/company/employee";
import { GetDatasSubscribe } from "@/interface/company";
import { useState, useEffect } from "react";

function useExpirationCountdown() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [isWarn, setIsWarn] = useState<boolean>(false);

  const getSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = (await getDataSubscribe()) as GetDatasSubscribe;
      if (response.data.length > 0) {
        const date = new Date(
          response.data[0].companyExpiredSubcribe.slice(0, 10)
        );
        setExpireDate(date);
      } else {
        setExpireDate(null);
      }
    } catch (e: any) {}
    setIsLoading(false);
  };

  useEffect(() => {
    const now = new Date();
    let timeDifference;
    if (expireDate) {
      timeDifference = expireDate.getTime() - now.getTime();
    }

    switch (true) {
      case timeDifference === 0:
        setRemainingTime(`Expired today : ${expireDate?.toLocaleString()}`);
        break;
      case timeDifference > 0:
        const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        const remainingDays = days % 30;

        if (years === 0 && remainingMonths < 1) {
          setIsWarn(true);
        } else {
          setIsWarn(false);
        }

        const yearText =
          years > 0 ? `${years} year${years > 1 ? "s" : ""} ` : "";
        const monthText =
          remainingMonths > 0
            ? `${remainingMonths} month${remainingMonths > 1 ? "s" : ""} `
            : "";
        const dayText =
          remainingDays > 0
            ? `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
            : "";

        let timeText = "";

        if (yearText || monthText || dayText) {
          timeText = `Expired in ${yearText}${monthText}${dayText}`;
        } else {
          timeText = "Expired Today";
        }

        setRemainingTime(
          `${timeText} : ${expireDate?.toLocaleString().slice(0, 10)}`
        );
        break;
      default:
        setRemainingTime("expired");
    }
  }, [expireDate]);

  useEffect(() => {
    getSubscribe();
  }, []);

  return {
    expireDate,
    remainingTime,
    isWarn,
  };
}

export default useExpirationCountdown;

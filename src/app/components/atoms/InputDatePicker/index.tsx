import { Input } from "@material-tailwind/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  value?: string | Date | null;
  label?: string;
  size?: "sm" | "md" | "lg";
  withTime?: boolean;
  onChange: (e: any) => void;
  selectsRange?: boolean;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
}

const InputDatePicker = ({
  value,
  label,
  size = "lg",
  withTime,
  selectsRange,
  startDate,
  endDate,
  onChange,
}: Props) => {
  interface Props {
    value: string | Date | null;
    disable: boolean;
    label: string;

    onClick?: () => void;
  }

  const CustomInput = ({ value, disable, label, onClick }: Props) => {
    return (
      <Input
        disabled={disable}
        value={value}
        size={size || "lg"}
        label={label}
        color="green"
        icon={
          <i className="fas fa-calendar cursor-pointer" onClick={onClick} />
        }
        crossOrigin={undefined}
      />
    );
  };

  return (
    <DatePicker
      selected={value}
      customInput={<CustomInput value={value} disable={false} label={label} />}
      onChange={(date) => onChange(date)}
      popperPlacement="bottom"
      timeInputLabel="Time:"
      showMonthDropdown
      showYearDropdown
      dateFormat={`MM/dd/yyyy ${withTime ? "h:mm aa" : ""}`}
      showTimeInput={withTime}
      selectsRange={selectsRange}
      startDate={startDate}
      endDate={endDate}
      dropdownMode="select"
    />
  );
};

export default InputDatePicker;

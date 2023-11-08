import Select from "react-select";
import makeAnimated from "react-select/animated";

interface CustomSelectProps {
  value: object | null;
  placeholder: string;
  options: Array<object>;
  isMulti?: boolean;
  onChange: (selectedOption) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  placeholder,
  options,
  isMulti,
  onChange,
}) => {
  const animatedComponents = makeAnimated();
  return (
    <Select
      className="text-sm"
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: "green",
        },
      })}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          textTransform: "capitalize",
        }),
      }}
      value={value}
      isMulti={isMulti}
      placeholder={placeholder}
      isClearable={true}
      options={options}
      onChange={onChange}
      components={animatedComponents}
    />
  );
};
export default CustomSelect;

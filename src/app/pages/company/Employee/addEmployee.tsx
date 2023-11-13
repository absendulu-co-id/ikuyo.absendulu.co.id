import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Input,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import { InputDatePicker, TableLoading } from "@/app/components";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { GetDataPositionResponse } from "@/interface/position";
import { GetDataAreaResponse } from "@/interface/area";
import { GetDataShift, GetDataSubscribe } from "@/interface/company";
import CustomSelect from "@/app/components/atoms/CustomSelect";
import MapPicker from "react-google-map-picker";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export interface IEmployeeProps {
  addClicked?: boolean;
  handleEdit?: () => void;
  isLoading?: boolean | any;
  handleSave?: () => void;
  onEdit?: () => void;
  form?: any;
  setForm?: any;
  dataPosition?: GetDataPositionResponse[] | null;
  dataArea?: GetDataAreaResponse[] | null;
  dataShift?: GetDataShift[] | null;
  dataSubscribe?: GetDataSubscribe[] | null;
}


export default function AddEmployee({
  addClicked,
  handleEdit,
  isLoading,
  handleSave,
  onEdit,
  form,
  setForm,
  dataArea,
  dataShift,
  dataSubscribe,
  dataPosition,
}: IEmployeeProps) {
  const dataReligion = [
    {
      label: "Islam",
      value: "islam",
    },
    {
      label: "Kristen",
      value: "kristen",
    },
    {
      label: "Katolik",
      value: "katolik",
    },
    {
      label: "Hindu",
      value: "hindu",
    },
    {
      label: "Budha",
      value: "budha",
    },
    {
      label: "Konghuchu",
      value: "konghuchu",
    },
  ];

  const dataWorkType = [
    {
      workTypeName: "On Site",
      workTypeId: "WT-1",
    },
    {
      workTypeName: "WFH",
      workTypeId: "WT-2",
    },
    {
      workTypeName: "Hybrid",
      workTypeId: "WT-3",
    },
  ];

  const employeeType = [
    {
      employeeTypeName: "Full Time",
      employeeTypeCode: "type-1",
    },
    {
      employeeTypeName: "Intern",
      employeeTypeCode: "type-2",
    },
    {
      employeeTypeName: "Kontrak",
      employeeTypeCode: "type-3",
    },
  ];

  const optionsGender = [
    { value: "perempuan", label: "Perempuan" },
    { value: "laki-laki", label: "Laki-laki" },
  ];

  const optionsResign = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const [selectedOption, setSelectedOption] = useState<Array<object> | null>(
    null
  );

  const [isMobile, setIsMobile] = useState<number>(1);

  //* Map
  const DefaultZoom = 10;
  const DefaultLocation = { lat: -6.2087634, lng: 106.845599 };
  const [address, setAddress] = useState("");
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [location, setLocation] = useState<any>(DefaultLocation);

  function handleChangeLocation(latitude, longitude) {
    setLocation({ latitude, longitude });
    setAddress(""); // Clear the address when location changes
    setForm({ ...form, latitude, longitude });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  const handleSelect = async (address) => {
    setAddress(address);
    try {
      if (typeof address === "string") {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setLocation(latLng);
        setForm({ ...form, latitude: latLng.lat, longitude: latLng.lng })
      }
    } catch (error) {
      console.error("Error while geocoding address:", error);
    }
  };


  const handleInputChange = (event) => {
    setForm((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSwitchChange = () => {
    const newValue = isMobile === 0 ? 1 : 0;
    setIsMobile(newValue);
    setForm((prevValue) => {
      return {
        ...prevValue,
        accountTypeId: isMobile,
      };
    });
  };

  useEffect(() => {
    const handleGoogleMapsLoad = () => setGoogleMapsLoaded(true);
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAuyS1LLibOZOGt-eliwsfzzTSYb3fVkmQ&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.onload = handleGoogleMapsLoad;
    document.body.appendChild(googleMapsScript);


    if (form.areaCode && form.areaId && form.areaName) {
      const dataAreas = form.areaName.split(",").map((value) => value.trim());
      const dataAreasId = form.areaId.split(",").map((value) => value.trim());
      const dataAreasCode = form.areaCode
        .split(",")
        .map((value) => value.trim());
      const objectArea = dataAreas.map((value, index) => ({
        value: [dataAreasId[index], dataAreasCode[index]],
        label: value,
      }));
      setSelectedOption(objectArea);
    }

    return () => { document.body.removeChild(googleMapsScript) };
  }, []);

  const handleSelected = (selectedOptions) => {
    if (selectedOptions) {
      setSelectedOption(selectedOptions);
      setForm((prevValue) => {
        return {
          ...prevValue,
          areaName: selectedOptions.map((option: any) => option.label),
          areaId: selectedOptions.map((option: any) => option.value[0]),
          areaCode: selectedOptions.map((option: any) => option.value[1]),
        };
      });
    }
  };

  const handleSelectChange = (field, selectedOptions) => {
    if (selectedOptions) {
      setForm((prevValue) => ({
        ...prevValue,
        [`${field}Id`]: selectedOptions.value,
        [`${field}Code`]: selectedOptions.value,
        [`${field}Name`]: selectedOptions.label,
      }));
    } else {
      setForm((prevValue) => ({
        ...prevValue,
        [`${field}Id`]: "",
        [`${field}Code`]: "",
        [`${field}Name`]: "",
      }));
    }
  };

  const generateSelectOptions = (data, valueKey, labelKey) => {
    return (data || []).map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  };

  const generateAreaOptions = (dataArea) => {
    if (dataArea && dataArea.length > 0) {
      return dataArea.map((area) => ({
        value: [area.id, area.areaCode],
        label: area.areaName,
      }));
    } else {
      return [
        {
          value: "",
          label: "Data Area is Empty",
        },
      ];
    }
  };

  const generatePositionOptions = (dataPosition) => {
    if (dataPosition && dataPosition.length > 0) {
      return dataPosition.map((position) => ({
        value: [
          position.departmentId,
          " - ",
          position.departmentCode,
          " - ",
          position.id,
          " - ",
          position.positionCode,
        ],
        label: [position.departmentName, " - ", position.positionName],
      }));
    } else {
      return [
        {
          value: "",
          label: "Data Position is Empty",
        },
      ];
    }
  };

  const handlePositionChange = (selectedOptions) => {
    if (selectedOptions) {
      const [departmentId, , departmentCode, , id, , positionCode] =
        selectedOptions.value;
      const [departmentName, , positionName] = selectedOptions.label;
      setForm((prevValue) => ({
        ...prevValue,
        positionId: id,
        positionCode,
        positionName,
        departmentId,
        departmentCode,
        departmentName,
      }));
    } else {
      setForm((prevValue) => ({
        ...prevValue,
        positionId: "",
        positionCode: "",
        positionName: "",
        departmentId: "",
        departmentCode: "",
        departmentName: "",
      }));
    }
  };

  if (!googleMapsLoaded) return <div>Google Map Loading</div>
  return (
    <div className="inset-2 mb-8 flex flex-col gap-12">
      <form className="p-5">
        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-2">
          <Input
            name="employeeId"
            defaultValue={form.employeeId}
            label="ID Employee"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="employeeName"
            defaultValue={form.employeeName}
            label="Name"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <CustomSelect
            placeholder="Gender"
            options={optionsGender}
            value={
              form.gender != ""
                ? { value: form.gender, label: form.gender }
                : null
            }
            onChange={(selectedOption) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  gender: selectedOption?.value,
                };
              });
            }}
          />

          <InputDatePicker
            label="Birthday"
            value={!form.birthday ? null : new Date(form.birthday)}
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  birthday: date,
                };
              });
            }}
          />

          <Input
            name="emailAddress"
            defaultValue={form.emailAddress}
            type="email"
            label="E-Mail"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="phoneNumber"
            defaultValue={form.phoneNumber}
            type="number"
            label="Phone Number"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="address"
            defaultValue={form.address}
            label="Address"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="postalCode"
            defaultValue={form.postalCode}
            label="Postal Code"
            color="green"
            onChange={handleInputChange}
            crossOrigin={undefined}
          />

          <Input
            name="national"
            defaultValue={form.national}
            label="Nationality"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />

          <CustomSelect
            value={
              form.religion != ""
                ? { value: form.religion, label: form.religion }
                : null
            }
            placeholder="Religion"
            options={dataReligion}
            onChange={(selectedOption) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  religion: selectedOption?.value,
                };
              });
            }}
          />
          <CustomSelect
            placeholder="Employee Area"
            options={generateAreaOptions(dataArea)}
            isMulti={true}
            value={selectedOption}
            onChange={(selected) => handleSelected(selected)}
          />

          <CustomSelect
            placeholder="Employee Type"
            value={
              form.employeeTypeCode != ""
                ? { value: form.employeeTypeCode, label: form.employeeTypeName }
                : null
            }
            options={generateSelectOptions(
              employeeType,
              "employeeTypeCode",
              "employeeTypeName"
            )}
            onChange={(selectedOptions) =>
              handleSelectChange("employeeType", selectedOptions)
            }
          />

          <CustomSelect
            placeholder="Work Type"
            value={
              form.workTypeId != ""
                ? {
                  value: form.workTypeId,
                  label: form.workTypeName,
                }
                : null
            }
            options={generateSelectOptions(
              dataWorkType,
              "workTypeId",
              "workTypeName"
            )}
            onChange={(selectedOptions) =>
              handleSelectChange("workType", selectedOptions)
            }
          />

          <CustomSelect
            placeholder="Employee Shift"
            value={
              form.shiftId != ""
                ? {
                  label: form.shiftName,
                  value: form.shiftId,
                }
                : null
            }
            options={generateSelectOptions(dataShift, "id", "shiftName")}
            onChange={(selectedOptions) =>
              handleSelectChange("shift", selectedOptions)
            }
          />

          <CustomSelect
            placeholder="Position Name"
            value={
              form.departmentCode != ""
                ? {
                  value: [form.departmentCode, " - ", form.positionCode],
                  label: [form.departmentName, " - ", form.positionName],
                }
                : null
            }
            options={generatePositionOptions(dataPosition)}
            onChange={handlePositionChange}
          />

          <InputDatePicker
            label="Join Date"
            value={!form.joinDate ? null : new Date(form.joinDate)}
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  joinDate: date,
                };
              });
            }}
          />

          <InputDatePicker
            label="Effective Start"
            value={
              !form.effectiveStart ? null : new Date(form.effectiveStart)
            }
            onChange={(date) => {
              setForm((prevValue) => {
                return {
                  ...prevValue,
                  effectiveStart: date,
                };
              });
            }}
          />


          {!addClicked && (
            <>
              <CustomSelect
                value={
                  form.isResign
                    ? {
                      value: true,
                      label: 'Yes',
                    }
                    : {
                      value: false,
                      label: 'No',
                    }
                }
                placeholder="Status Resign"
                options={optionsResign}
                onChange={(selectedOption) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      isResign: selectedOption?.value,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Resign Date"
                value={!form.resignDate ? null : new Date(form.resignDate)}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      resignDate: date,
                    };
                  });
                }}
              />
              <InputDatePicker
                label="Effective End"
                value={!form.effectiveEnd ? null : new Date(form.effectiveEnd)}
                onChange={(date: Date) => {
                  setForm((prevValue) => {
                    return {
                      ...prevValue,
                      effectiveEnd: date,
                    };
                  });
                }}
              />
            </>
          )}

          {addClicked && (
            <Switch
              color="green"
              label="Include Mobile"
              disabled={
                !dataSubscribe ||
                dataSubscribe.length === 0 ||
                dataSubscribe[0].appsUsed >= dataSubscribe[0].appsTotal
              }
              crossOrigin={undefined}
              checked={isMobile === 0}
              defaultValue={form.accountTypeId}
              onChange={handleSwitchChange}
            />
          )}
          <div className="flex flex-col gap-1 w-full" style={{ gridColumn: 'span 2' }}>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div>
                  <input
                    {...getInputProps({ placeholder: "Search Places..." })}
                    className="p-3 border-2 text-lg"
                    style={{
                      borderRadius: 1,
                      borderColor: "gray",
                      boxShadow: "0 0 0 1px gray",
                      width: "100%",
                      padding: "4px",
                    }}
                  />
                  {loading ? <p>Loading</p> : (
                    <div>
                      {suggestions.map((suggestion, index) => (
                        <div
                          {...getSuggestionItemProps(suggestion, { key: index })}
                          className="p-3 border-2 text-lg"
                          style={{
                            borderRadius: 6,
                            borderColor: "gray",
                            boxShadow: "0 0 0 1px gray",
                          }}
                          key={index}
                        >
                          {suggestion.description}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <Input
            name="latitude"
            defaultValue={form.latitude}
            label="Latitude"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <Input
            name="longitude"
            defaultValue={form.longitude}
            label="Longitude"
            color="green"
            onChange={handleInputChange}
            required
            crossOrigin={undefined}
          />
          <MapPicker
            defaultLocation={location}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "300px" }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyAuyS1LLibOZOGt-eliwsfzzTSYb3fVkmQ"
          />
        </div>
        <div
          className={`${addClicked ? "mt-0" : "mt-5"} flex flex-row-reverse`}
        >
          <Button
            variant="filled"
            color={"green"}
            disabled={
              !isLoading ||
              form.employeeId == "" ||
              form.employeeName == "" ||
              form.gender == "" ||
              form.birthday == "" ||
              form.email == "" ||
              form.phoneNumber == "" ||
              form.address == "" ||
              form.national == "" ||
              form.religion == "" ||
              form.areaCode == "" ||
              form.employeeTypeCode == "" ||
              form.workTypeId == "" ||
              form.shiftId == "" ||
              form.positionCode == "" ||
              !form.joinDate ||
              !form.effectiveStart
            }
            className={"ml-4 mb-4 flex w-28 flex-row justify-center p-2"}
            onClick={addClicked ? handleSave : onEdit}
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

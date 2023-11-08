import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { 
    Button,  
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import { getDataPosition } from "@/app/services/company/position";
import { GetDataPositionResponse, GetPositionResponse } from "@/interface/position";
import List from "@/app/pages/access/List";
import {
    newListMenus,
} from '@/app/data/access'
import { postDataAccess } from "@/app/services/access";
import { status } from "./constants";
import { capitalizeFLetter } from "@/utils/general";
import { isEmpty } from "@/utils/locDash";

export interface IAddAccessProps {
}

export default function AddAccess (props: IAddAccessProps) {
    const animatedComponents = makeAnimated();
    const [dataPosition, setDataPosition] = useState<GetDataPositionResponse[] | null>(null);
    const [options, setOptions] = useState({
        positionCode: "" ,
        positionName: "",
        departmentCode: "",
        departmentName: "",
        positionId: "",
      })

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPositionAll = async () => {
    try {
        const response = await getDataPosition() as GetPositionResponse;
            if (response.data.length > 0) {
                setDataPosition(response.data);
            } else {
                setDataPosition(null)
            }
        } catch (e: any) {
        }
    }

    const generatePositionOptions = (dataPosition) => {
        if (dataPosition && dataPosition.length > 0) {
        return dataPosition.map((position) => ({
            value: [position.departmentCode, ' - ', position.positionCode, position.id],
            label: [position.departmentName, ' - ', position.positionName],
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
          const [departmentCode, , positionCode, positionId] = selectedOptions.value;
          const [departmentName, , positionName] = selectedOptions.label;
          setOptions((prevValue) => ({
            ...prevValue,
            positionCode,
            positionName,
            departmentCode,
            departmentName,
            positionId,
          }));
        } else {
          setOptions((prevValue) => ({
            ...prevValue,
            positionCode: "",
            positionName: "",
            departmentCode: "",
            departmentName: "",
            positionId: "",
          }));
        }
      };

      const setStatus = (root, status) => {
        root.status = status;
        if (Array.isArray(root.items)) {
          return root.items.forEach((item) => {
            setStatus(item, status);
          });
        }
      };
    
      const computeStatus = (items: any) => {
        let checked = 0;
        let indeterminate = 0;
    
        items.forEach((item) => {
          if (item.status && item.status === status?.checked) checked++;
          if (item.status && item.status === status?.indeterminate) indeterminate++;
        });
    
        if (checked === items.length) {
          return status?.checked;
        } else if (checked > 0 || indeterminate > 0) {
          return status?.indeterminate;
        }
      };
    
      const traverse = (root, needle, status) => {
        let id;
        let items;
    
        if (Array.isArray(root)) {
          items = root;
        } else {
          id = root.id;
          items = root.items;
        }
    
        // return if needle is found
        // we don't have to compute the status of the items if root.id === needle
        if (id === needle) {
          return setStatus(root, status);
        }
    
        if (!items) {
          return root;
        } else {
          items.forEach((item) => traverse(item, needle, status));
          root.status = computeStatus(items);
        }
      };

    const [items, setItems] = useState<any>(newListMenus);

    const compute = (checkboxId, status) => {
        traverse(items, checkboxId, status);
        setItems(items.slice());
    };    

    const handleSave = async () => {
        const filteredSubmenu = items.map((element) => {
            return {...element, items: element?.items?.filter((subElement) => subElement?.status === 1 || subElement?.status === -1)}
        })

        const filteredMenu = filteredSubmenu?.filter((obj) => [1, -1].includes(obj.status));

        const access = filteredMenu?.map((list) => {
            return {
                mainMenu: capitalizeFLetter(list.name),
                subMenu: !isEmpty(list.items) ? list.items.map((obj) => capitalizeFLetter(obj.name)) : [],
                action: ["Add", "Edit", "Delete"],
            }
        });

        const payload = {
            positionId: options.positionId,
            access,
        }

        setIsLoading(true);
        try {
            const res = await postDataAccess(payload);
            if (res) setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getPositionAll();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-3">
          <div className="w-full space-y-4">
            <div className="w-full">
                <div className="border-l-4 border-green-800 bg-gray-50 w-full rounded-lg shadow-lg mb-6">
                  <div className="pl-3 pt-3">
                      <Typography variant="small" className="font-bold">Choose Menu</Typography>
                  </div>
                  <div className="p-4">
                      <List items={items} compute={compute} />
                  </div>
                </div>
            </div>

            
                
          </div>
          <div className="flex flex-col">
              <form>
                  <Select
                      className="text-sm border-l-4 border-green-800 text-gray-800 rounded-lg shadow-md mb-4"
                      theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                          ...theme.colors,
                          primary: "white",
                      },
                      })}
                      styles={{
                      control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'white' : 'white',
                      }),
                      }}
                      isClearable={true}
                      placeholder="Position Name"
                      components={animatedComponents}
                      options={generatePositionOptions(dataPosition)}
                      onChange={handlePositionChange}
                  />
              </form>

              <Button
                  variant="filled"
                  color={"green"}
                  disabled={isLoading || !options.positionName}
                  className={"flex w-28 flex-row justify-center p-2"}
                  onClick={handleSave}
                  defaultValue={undefined}
                  >
                  {isLoading ? (
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
        </div>
    );
}

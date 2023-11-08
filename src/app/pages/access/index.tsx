import { useState, useMemo, useEffect } from "react";
import { HeaderBack, Modal, NoData } from "@/app/components";
import { 
    Button, 
    Card, 
    Spinner, 
    Typography,
    Checkbox,
    CardBody,
} from "@material-tailwind/react";
import { 
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon,
    PencilIcon,
    PlusIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import CardAccess from "@/app/pages/access/CardAccess";
import AddAccess from "@/app/pages/access/AddAccess";
import ViewAccess from "@/app/pages/access/ViewAccess";
import { postDataAccess } from "@/app/services/access";

const mockDataAccess = [
    {
        id: 1,
        departmentName: 'IT',
        positionName: 'Dev',
        totalMenu: 3,
        totalSubMenu: 2,
        totalActions: 3,
    },
    {
        id: 2,
        departmentName: 'Finance',
        positionName: 'HR',
        totalMenu: 4,
        totalSubMenu: 5,
        totalActions: 2,
    },
];

export interface IAccessProps {
}

export default function Access (props: IAccessProps) {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(true);

  const handleAdd = () => {
    setIsAdd(true);
    setIsEdit(false);
    setIsView(false);
  }

  const handleEdit = (object) => {
    setIsEdit(true);
    setIsAdd(false);
    setIsView(false);
  }

  const handleBack = () => {
    if (isAdd) {
        setIsAdd(false);
        setIsView(true);
        setIsEdit(false);
    } else if (isView) {
        window.history.back();
    } else {
        window.history.back();
    }
  }

  const renderTitle = useMemo(() => {
    let title = "";
    if (isAdd) title = "Add";
    if (isEdit) title = "Edit";
    if (isView) title = "";

    return title;
  }, [isAdd, isEdit])

  const renderComponent = () => {
    if (isAdd) return <AddAccess />
    if (isEdit) return <p>Render Page Edit</p>;
    if (isView) return <ViewAccess handleAdd={handleAdd} />;
  }

  return (
    <>
        <div className="mt-6 flex flex-col gap-4 p-5 shadow-lg rounded-lg">
            <Card variant="gradient" color="green" className={`mb-0 p-6 flex flex-row gap-4`} defaultValue={undefined}>
                <div
                    className="w-5 flex items-center cursor-pointer"
                    onClick={handleBack}
                >
                    <ArrowLeftIcon />
                </div>
                <Typography variant="h6" color="white">
                    {`${renderTitle} Access Manager`}
                </Typography>
            </Card>

            {renderComponent()}

        </div>
    </>
  );
}

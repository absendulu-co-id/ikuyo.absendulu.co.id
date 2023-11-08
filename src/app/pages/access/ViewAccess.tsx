import { useEffect, useState } from "react";
import { 
    Button,
    Typography,
} from "@material-tailwind/react";
import { 
    PlusIcon,
} from "@heroicons/react/24/solid";
import CardAccess from "@/app/pages/access/CardAccess";
import { getDataAccessPagination, deleteDataAccess } from "@/app/services/access";
import ViewAccessShimmer from "@/app/pages/access/ViewAccessShimmer";
import { isEmpty } from "@/utils/locDash";
import { NoData } from "@/app/components";
import { Modal } from "@/app/components/molecules";
import { snackBar } from "@/utils/snackbar";

export interface IViewAccessProps {
}

interface AccessProps {
    action: Array<'Add' | 'Edit' | 'Delete'>,
    mainMenu: string;
    subMenu: Array<string>;
}

interface DataProps {
    access: AccessProps[];
    createdAt: string;
    id: string;
    positionId: string;
    updatedAt: string;
}

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

export default function ViewAccess ({ handleAdd }) {
    const [data, setData] = useState<DataProps[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const [detailData, setDetailData] = useState<DataProps | null>(null);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

    const getDataAll = async () => {
        setIsLoading(true);
        try {
            const response = await getDataAccessPagination();
            if (response?.message === "Success") {
                setData(response?.data);
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (obj) => {
        setDetailData(obj);
        setIsOpenDelete(true);
    }

    const handleOkDelete = async () => {
        setIsLoadingDelete(true);
        try {
            const response = await deleteDataAccess(detailData?.id as string);
            if (response?.message === "Success") {
                snackBar("success", "Delete access success")
                setIsLoadingDelete(false);
            }
        } catch (err) {
            setIsLoadingDelete(false);
            snackBar("error", "Delete access failed")
        } finally {
            setIsLoadingDelete(false);
        }
    }

    useEffect(() => {
        getDataAll();
    }, []);
    
    return (
        <>
            <div className="flex flex-col gap-4">       
                <Button
                    data-tut="reactour__access_add"
                    variant="filled"
                    color={'green'}
                    className={`flex p-2 w-36 justify-center mt-5`} 
                    onClick={handleAdd}
                >
                    <PlusIcon strokeWidth={4} className="h-5 w-5 mr-1" />
                    <Typography
                        variant="small"
                        className="font-bold uppercase text-white "
                    >
                    {'Add Access'}
                    </Typography>
                </Button>
                {isLoading ? (
                    <ViewAccessShimmer />
                ) : (data && !isEmpty(data) ? (
                    <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1">
                        {data?.map((list: any, index: number) => {
                            return (
                                <CardAccess
                                    key={`card-access-${index}`}
                                    data={list}
                                    handleEdit={() => {}}
                                    handleDelete={handleDelete}
                                    // handleEdit={handleEdit}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <NoData title={"Access Data"} />
                ))}

            </div>
            
            <Modal
                open={isOpenDelete}
                header={""}
                handleClose={() => setIsOpenDelete(false)}
                body={
                <div className="text-center text-xl">
                    {/* Are you sure want to delete <strong>{detailData?.id}</strong> ? */}
                    Are you sure want to delete this access ?
                </div>
                }
                footer={
                <div className="flex flex-row-reverse">
                    <Button
                        variant="filled"
                        color={"green"}
                        className={"ml-4 mb-4 w-28 content-center p-2"}
                        onClick={handleOkDelete}
                        disabled={isLoadingDelete}
                    >
                    <Typography
                        variant="small"
                        className="text-center font-bold uppercase text-white"
                    >
                        {"Yes"}
                    </Typography>
                    </Button>
                    <Button
                        variant="filled"
                        color={"red"}
                        className={"ml-4 mb-4 w-28 content-center p-2	"}
                        onClick={() => setIsOpenDelete(false)}
                    >
                    <Typography
                        variant="small"
                        className="text-center font-bold uppercase text-white"
                    >
                        {"No"}
                    </Typography>
                    </Button>
                </div>
                }
            />
        </>
    );
}

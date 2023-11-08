import { useEffect, useState } from 'react';
import { 
    Card, 
    Typography,
    CardBody,
    Tooltip,
} from "@material-tailwind/react";

import { 
    ChevronDownIcon,
    ChevronUpIcon,
    ComputerDesktopIcon,
    PencilIcon,
    TrashIcon,
    UsersIcon
} from "@heroicons/react/24/solid";
import { combineArrays } from '@/utils/general';
import { getAccessDetail } from '@/app/services/access';


export default function CardAccess ({ data, handleEdit, handleDelete }) {
    const totalMenu = data?.access?.length || "-";
    const allMenu = data?.access?.map((list) => list.mainMenu);

    const allSubMenuRaw = data?.access?.map((list) => list.subMenu);
    const allSubMenu = combineArrays(allSubMenuRaw);
    const totalSubMenu = allSubMenu?.length || "-";
    const [showAll, setShowAll] = useState<boolean>(false);

    const [dataDetail, setDataDetail] = useState([]);

    const getDataDetail = async () => {
        try {
            const response = await getAccessDetail(data?.id)
        } catch (err) {
            console.log('err detail', err);
        } finally {
        }
    }

    useEffect(() => {
        if (data) {
            getDataDetail();
        }
    }, [data])

    return (
        <Card className={'max-h-50'}>
            <CardBody className="px-3 md:px-5" >
            <div className={'flex justify-between space-x-2'}>
                <div className="flex">
                <div className={'bg-blue-gray-100 w-20 h-20 hidden md:flex items-center justify-center rounded-full p-2'}>
                    <img
                        src={'img/icon/role.png'}
                        alt="card-image"
                        className={'w-full'}
                    />
                </div>
                <div className={'flex flex-col md:ml-4 justify-between space-y-3'}>
                    <div className={'flex justify-between gap-2 xl:gap-4'}>
                    <div className={`bg-green-500 p-1 rounded-3xl w-32`}>
                        <Typography className={'text-xs xl:text-sm text-center'} variant="small" color="white">
                        {data.departmentName || "Department"}
                        </Typography>
                    </div>
                    <div>
                        <div className={'bg-blue-500 p-1 rounded-3xl w-32'}>
                        <Typography className={'text-xs xl:text-sm text-center'} variant="small" color="white">
                            {data.positionName || "Position"}
                        </Typography>
                        </div>
                    </div>
                    </div>
                    <div className="flex space-x-3">
                    <Typography className={'text-xs font-semibold line-clamp-1'} variant="small"> Menu: {totalMenu} </Typography>
                    <Typography className={'text-xs font-semibold line-clamp-1'} variant="small"> Submenu: {totalSubMenu} </Typography>
                    {/* <Typography className={'text-xs font-semibold line-clamp-1'} variant="small"> Actions: {data.totalAction} </Typography> */}
                    </div>
                </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-row gap-3">
                        {/* <PencilIcon 
                            onClick={() => handleEdit(data)}
                            color="#66BB6A" 
                            className={'w-4 h-4 cursor-pointer'}
                        /> */}
                        <TrashIcon
                            onClick={() => handleDelete(data)}
                            color="red" 
                            className={'w-4 h-4 cursor-pointer'}
                        />                
                    </div>
                {showAll ? (
                    <ChevronUpIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-6 h-6 mt-4 cursor-pointer'}
                    />
                ):(
                    <ChevronDownIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-6 mt-4 h-6 cursor-pointer'}
                    />
                )}
                </div>
            </div>
            {showAll && (
                <div className={'border-t mt-4 border-gray-400'}>
                    <div className={'grid gap-2 grid-cols-2'}>
                        <Tooltip placement="top-start" content={
                            <ol className="list-decimal p-4">
                            {allMenu.map((menu: any, index: number) => {                                
                                return (
                                <li key={`list-menu-${index}`}>
                                    {menu || "-"}
                                </li>
                                )
                            })}
                            </ol>
                        }>
                            <div className={'flex flex-row mt-4 justify-items-center cursor-pointer'}>
                                <UsersIcon
                                    color={'#66BB6A'}
                                    className={'w-5 h-5 cursor-pointer mr-2'}
                                />
                                <Typography className={'font-semibold mr-1'} variant={'small'} >
                                    Main Menu
                                </Typography>
                            </div>
                        </Tooltip>
                        <Tooltip placement="top-start" content={
                            <ol className="list-decimal p-4">
                            {allSubMenu.map((subMenu: any, index: number) => {                                
                                return (
                                <li key={`list-subMenu-${index}`}>
                                    {subMenu || "-"}
                                </li>
                                )
                            })}
                            </ol>
                        }>
                            <div className={'flex flex-row mt-4 justify-items-center cursor-pointer'}>
                                <ComputerDesktopIcon
                                    color={'#66BB6A'}
                                    className={'w-5 h-5 cursor-pointer mr-2'}
                                />
                                <Typography className={'font-semibold mr-1'} variant={'small'}>
                                    Submenu
                                </Typography>
                            </div>
                        </Tooltip>
                        {/* <div className={'flex flex-row mt-4 justify-items-center'}>
                            <DevicePhoneMobileIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                Actions
                            </Typography>
                        </div> */}
                    </div>
                </div>
            )}
            </CardBody>
        </Card>
    );
}

import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import {
    PencilIcon,
    TrashIcon,
    ArrowRightIcon, 
    ArrowLeftIcon,
    PlusIcon,
    ArrowUpTrayIcon
  } from "@heroicons/react/24/solid";

const Table = () => {

    return (
        <>
            <div className={'flex flex-row gap-1'}>
                <Button
                    variant="filled"
                    color={'green'}
                    className={'p-2 w-20 ml-4 flex mb-4 justify-center' }
                    onClick={()=> {}}
                >
                <PlusIcon strokeWidth={4} className="h-4 w-4 mr-1 mt-[1px]" />
                <Typography
                    variant="small"
                    className="font-bold uppercase text-white "
                    >
                    {'Add'}
                    </Typography>
                </Button>
            </div>
        </>
        
    )
}

export default Table;
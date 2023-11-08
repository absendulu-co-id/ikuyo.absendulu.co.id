import { useState } from "react";
import { 
    ChevronDownIcon, 
    ClockIcon, 
    ComputerDesktopIcon, 
    DevicePhoneMobileIcon, 
    PencilIcon, 
    UsersIcon,
    ChevronUpIcon,
    ArrowPathIcon,
    SignalSlashIcon,
    PowerIcon,
    LockOpenIcon,
    BellSlashIcon,
    ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { Card, CardBody, Tooltip, Typography } from "@material-tailwind/react";
import moment from "moment";

interface Props {
    list: ListDataDevice;
    onClickEdit: () => void;
    onClickDelete: () => void;
    onClickSyncSingle: () => void;
    onClickReboot: () => void;
    onClickDoorUnlock: () => void;
    onClickDisableAlarm: () => void;
    onClickDownloadBio: () => void;
    loadingSyncSingle: boolean;
    loadingDownloadBio: boolean;
    loadingReboot: boolean;
    loadingDoorUnlock: boolean;
    loadingDisableAlarm: boolean;
}

const CardDevice = ({
    list,
    onClickDelete,
    onClickEdit,
    onClickSyncSingle,
    loadingSyncSingle,
    loadingDownloadBio,
    loadingReboot,
    loadingDoorUnlock,
    loadingDisableAlarm,
    onClickReboot,
    onClickDoorUnlock,
    onClickDisableAlarm,
    onClickDownloadBio,
}: Props) => {

    const [showAll, setShowAll] = useState<boolean>(false);

    return (
        <Card className={ `${showAll ? 'max-h-96 xl:max-h-60': 'max-h-40'}`}>
          <CardBody >
            <div className={'flex flex-row justify-between'}>
              <div className="flex flex-row">
                <div className={'bg-blue-gray-100 w-20 h-20 flex items-center justify-center rounded-full p-2'}>
                    <img
                        src={'img/icon/fingerprint.png'}
                        alt="card-image"
                        className={'w-6 h-6 lg:h-10 lg:w-10'}
                    />
                </div>
                <div className={'flex flex-col ml-4'}>
                  <div className={'flex flex-col lg:flex-row  justify-between gap-2 mb-3'}>
                    <div className={`${list.isRegister ? 'bg-green-500' : 'bg-red-500'} p-1 rounded-3xl w-24`}>
                        <Typography className={'text-center text-xs sm:text-sm'} variant="small" color="white">
                        {list.isRegister ? 'Connected' : 'Disconnected'}
                        </Typography>
                    </div>
                    <div>
                        <div className={'bg-blue-500 p-1 rounded-3xl w-32'}>
                            <Typography className={'text-center text-xs sm:text-sm'} variant="small" color="white">
                                {list.deviceSn}
                            </Typography>
                        </div>
                    </div>
                  </div>

                  <Typography className={'line-clamp-1 text-sm sm:text-lg'} variant="lead">
                    {list.deviceAlias}
                  </Typography>
                  <Typography className={'line-clamp-1 text-xs sm:text-sm'} variant="small">
                    {list.areaName}
                  </Typography>
                </div>
              </div>
              <div className={"flex flex-col gap-2"}>
                <div className={'flex flex-row gap-2'}>
                    <Tooltip 
                        content={
                            
                            `Download Biometric From ${list.deviceAlias}`
                        }>
                        <ArrowDownTrayIcon
                            strokeWidth={10}
                            onClick={onClickDownloadBio}
                            color="#60a5fa" 
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer ${loadingDownloadBio && 'animate-spin'} `}
                        />
                    </Tooltip>
                    <Tooltip 
                        content={
                            
                            `Edit Device ${list.deviceAlias}`
                        }>
                        <PencilIcon 
                            onClick={onClickEdit}
                            color="#66BB6A" 
                            className={'w-3 h-3 sm:w-4 sm:h-4 cursor-pointer'}
                        />
                        
                    </Tooltip>
                    <Tooltip 
                        content={
                            
                            `Disconnect Device ${list.deviceAlias}`
                        }>
                        <SignalSlashIcon 
                            onClick={onClickDelete} 
                            color="#ef5350" 
                            className={'w-3 h-3 sm:w-4 sm:h-4 cursor-pointer'}
                        />
                    </Tooltip>
                  
                </div>
                <div className={'flex flex-row gap-2'}>
                    <Tooltip 
                        content={
                            
                            `Reboot Device ${list.deviceAlias}`
                        }>
                        <PowerIcon
                            strokeWidth={10}
                            onClick={onClickReboot}
                            color="#60a5fa" 
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer ${loadingReboot && 'animate-spin'} `}
                        />
                    </Tooltip>
                    <Tooltip 
                        content={
                            
                            `Unlock Door ${list.deviceAlias}`
                        }>
                        <LockOpenIcon
                            onClick={onClickDoorUnlock}
                            color="#66BB6A" 
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer ${loadingDoorUnlock && 'animate-spin'} `}
                        />
                        
                    </Tooltip>
                    <Tooltip 
                        content={
                            
                            `Deactivate Alarm Device ${list.deviceAlias}`
                        }>
                        <BellSlashIcon
                            onClick={onClickDisableAlarm} 
                            color="#ef5350" 
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer ${loadingDisableAlarm && 'animate-spin'}`}
                        />
                    </Tooltip>
                  
                </div>
                <div className={'flex flex-row justify-center'}>
                    <div />
                    <Tooltip 
                        content={
                            
                            `Reboot Device ${list.deviceAlias}`
                        }>
                        <ArrowPathIcon
                            strokeWidth={10}
                            onClick={onClickSyncSingle}
                            color="#66BB6A" 
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer ${loadingSyncSingle && 'animate-spin'} `}
                        />
                    </Tooltip>
                    <div />
                </div>
                {showAll ? (
                    <ChevronUpIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-5 h-5 sm:w-6 sm:h-6 ml-4 mt-4 cursor-pointer'}
                    />
                ):(
                    <ChevronDownIcon
                        onClick={()=> setShowAll(!showAll)}
                        color={'#616161'}
                        className={'w-5 h-5 sm:w-6 sm:h-6 ml-4 mt-4 cursor-pointer'}
                    />
                )}
                
              </div>
              </div>
            {showAll && (
                <div className={'border-t mt-4 border-gray-400'}>
                    <div className={'grid gap-2 md:grid-cols-2 xl:grid-cols-2'}>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <UsersIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.totalEnrolledUser}
                            </Typography>
                            <Typography variant={'small'}>
                                {'Users'}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <ComputerDesktopIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.deviceIp}
                            </Typography>
                            <Typography variant={'small'}>
                                {'Local IP'}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <DevicePhoneMobileIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {list.deviceName}
                            </Typography>
                        </div>
                        <div className={'flex flex-row mt-4 justify-items-center'}>
                            <ClockIcon
                                color={'#66BB6A'}
                                className={'w-5 h-5 cursor-pointer mr-2'}
                            />
                            <Typography className={'font-semibold mr-1'} variant={'small'}>
                                {moment(list.lastHeartbeat).format('hh:mm:ss A')}
                            </Typography>
                            
                            <Typography variant={'small'}>
                                {'Last synchronized'}
                            </Typography>
                        </div>
                    </div>
                </div>
            )}
            
          </CardBody>
        </Card>
    )
}

export default CardDevice;
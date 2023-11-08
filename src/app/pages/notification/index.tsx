import { useEffect, useState } from 'react';
import moment from "moment";
import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  ClockIcon,
} from "@heroicons/react/24/solid";
import Pagination from '@/app/components/molecules/pagination';
import { getDataNotificationPagination, updateDataNotification } from '@/app/services/notification';
import { GetDataNotificationResponse } from '@/interface/notification';
import Shimmer from '@/app/pages/notification/Shimmer';
import { isEmpty } from '@/utils/locDash';
import NotificationEmpty from '@/app/components/organisms/DashboardNavbar/NotificationEmpty';

const mockNotifData = [
  {
    id: '1',
    header: 'Attendance',
    title: 'Clock In',
    message: 'Berhasil clock in',
    user_id: '123',
    company_id: '456',
    created_at: '29 Sept 2021 - 08.00',
    created_by: 'Jisoo',
    is_read: false,
  },
  {
    id: '2',
    header: 'Attendance',
    title: 'Clock Out',
    message: 'Berhasil clock out',
    user_id: '123',
    company_id: '456',
    created_at: '29 Sept 2021 - 18.00',
    created_by: 'Jisoo',
    is_read: false,
  },
  {
    id: '3',
    header: 'Approval',
    title: 'Pengajuan Cuti',
    message: 'Pending',
    user_id: '123',
    company_id: '456',
    created_at: '29 Sept 2021  - 19.00',
    created_by: 'Jisoo',
    is_read: true,
  }
];

function NotificationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataNotif, setDataNotif] = useState<GetDataNotificationResponse[] | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);

  const getDataNotif = async (params) => {
    setIsLoading(true);
    try {
      const response = await getDataNotificationPagination(params);

      if (response.data.length > 0) {
        setTotalPage(response.totalPages);
        setDataNotif(response.data);
      } else {
        setDataNotif(null);
      }

    } catch (err: any) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);

    const params = {
      pageNumber: page,
    }

    getDataNotif(params);
  }

  const handleUpdateNotification = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await updateDataNotification(id);
      if (data?.message === "Success") getDataNotif({ pageNumber: onPage });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = {
      pageSize: 10,
      pageNumber: onPage,
    }
    getDataNotif(params);
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-8">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            {"Notification"}
          </Typography>
        </CardHeader>
      </Card>
      <div className='w-full flex flex-col gap-2'>
        {isLoading ? (<Shimmer />) : 
          dataNotif && !isEmpty(dataNotif) ? (
            <>
            {dataNotif?.map((list: any, index: number) => (
              <div
                onClick={() => handleUpdateNotification(list.id)}
                key={`notifCard-${index}`}
                className={`border-2 border-gray-200 border-solid rounded-md p-4 cursor-pointer shadow-md hover:bg-gray-300 ${!list.is_read && 'bg-gray-200'}`}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-bold"
                >
                  {list.title}
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-normal"
                >
                  {list.message}
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                  <ClockIcon className="h-3.5 w-3.5" /> {moment(list.created_at).format("MMMM Do YYYY - hh:mm")}
                </Typography>
              </div>
    
            ))}
          </>
          ) : ( <NotificationEmpty />)
        }
      </div>

      <Pagination
        onChange={handleChangePage}
        total={totalPage}
        current={currentPage}
      />
    </div>
  );
}

export default NotificationPage;

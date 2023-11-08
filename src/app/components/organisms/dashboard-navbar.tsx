import React, { useEffect, useState, useMemo } from "react";
import moment, { months } from "moment";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Button,
  Breadcrumbs,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  Navbar,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  ClockIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/app/context";
import { useRecoilState } from "recoil";
import { searchAllAtom } from "@/app/recoils/search";
import { routes } from "@/app/routes";
import { Modal } from "@/app/components/molecules";
import { GetDatasSubscribe } from "@/interface/company";
import { getDataSubscribe } from "@/app/services/company/employee";
import Badge from "@/app/components/molecules/Badge";
import {
  getDataNotification,
  updateDataNotification,
} from "@/app/services/notification";
import { isEmpty } from "@/utils/locDash";
import { changePassword, logout } from "@/app/services/auth";
import { snackBar } from "@/utils/snackbar";
import NotificationShimmer from "@/app/components/organisms/DashboardNavbar/NotificationShimmer";
import NotificationEmpty from "@/app/components/organisms/DashboardNavbar/NotificationEmpty";
import useExpirationCountdown from "./DashboardNavbar/useExpirationCountdown";
import { changeProfilePhoto, getWebDashboard } from "@/app/services/dashboard";
import { getInitialLetter } from "@/utils/general";
import { postUploadData } from "@/app/services/file";

export default function DashboardNavbar({ tourConfig }) {
  const navigate = useNavigate();
  // const socket = socketIO.connect("http://103.127.96.184:3030");
  const inputFile = React.useRef(null);
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [searchAll, setSearchAll] = useRecoilState(searchAllAtom);

  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState<any>(null);
  const onChange = ({ target }) => setSearch(target.value);

  const pathUrl = window.location.pathname.split("/");
  const decodedToken = localStorage.getItem("decoded");
  const decoded = JSON.parse(decodedToken || "");
  const userName = decoded?.username || "User";
  const bgColor = decoded?.bgColor || "rgb(76 175 80)";
  const [dataEmploye, setDataEmploye] = useState<any>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenSignOut, setIsOpenSignOut] = useState<boolean>(false);
  const { expireDate, remainingTime, isWarn } = useExpirationCountdown();

  const [showModalReset, setShowModalReset] = React.useState<boolean>(false);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [reNewPassword, setReNewPassword] = React.useState<string>("");

  const [showModalUploadPhoto, setShowModalUploadPhoto] =
    React.useState<boolean>(false);
  const [imageChange, setImageChange] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [errorConfirmNewPassword, setErrorConfirmNewPassword] =
    React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<Array<string>>([]);
  const [notifData, setNotifData] = React.useState<any>([]);
  const [isLoadingNotif, setIsLoadingNotif] = React.useState<boolean>(false);

  const [openMenuNotif, setOpenMenuNotif] = useState<boolean>(false);

  const handleOpenSignout = () => {
    setIsOpenSignOut(true);
  };

  const handleOpenReset = () => {
    setShowModalReset(true);
  };

  const handleFileUpload = async(e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      // const fileType = parts[parts.length - 1];
      setImageChange(URL.createObjectURL(files[0]));
      const resFile = await postUploadData(files[0]);
      if(resFile?.data.url){
        
        setImageUrl(resFile?.data.url);
      }
      
    }
  };

  const handleChangeProfile = async () => {
    setIsLoadingUpload(true);
    try {
      const response = await changeProfilePhoto(imageUrl);
      if (response?.message === "Success") {
        setIsLoadingUpload(false);
        snackBar('success', 'Upload avatar success');
      }
    } catch (err) {
      setIsLoadingUpload(false);
      snackBar('success', 'Upload avatar failed');
    } finally {
      setIsLoadingUpload(false);
    }
    
  }

  const onChangePhoto = () => {
    inputFile?.current?.click();
  };

  const handleOkSignout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("decoded");
    localStorage.removeItem("access");
    setIsOpenSignOut(false);
    navigate("/signin");
  };

  const handleGetNotification = async () => {
    setIsLoadingNotif(true);
    try {
      const data = await getDataNotification();
      setNotifData(data);
      setIsLoadingNotif(false);
    } catch (error) {
      setIsLoadingNotif(false);
    } finally {
      setIsLoadingNotif(false);
    }
  };

  const handleUpdateNotification = async (id: string) => {
    setIsLoadingNotif(true);
    try {
      const data = await updateDataNotification(id);
      if (data?.message === "Success") handleGetNotification();
    } catch (error) {
      setIsLoadingNotif(false);
    } finally {
      setIsLoadingNotif(false);
    }
  };

  const handleGetWebDashboard = async () => {
    const response = await getWebDashboard();
    setDataEmploye(response.data);
  }

  const handleChangePassword = async () => {
    if (newPassword !== reNewPassword) {
      snackBar("error", "Please make sure Password same");
    } else {
      const response = await changePassword(reNewPassword);
      setShowModalReset(false);
      snackBar("success", response);
    }
  };

  useEffect(() => {
    if (pathUrl[1] === "dashboard") {
      const delaySearch = setTimeout(() => {
        if (searchAll.length > 1) {
          const dataFilter = routes.filter((data) =>
            data.layout.toUpperCase().includes(searchAll.toUpperCase())
          );
          setDataSearch(dataFilter);
        } else setDataSearch(null);
      }, 1000);

      return () => clearTimeout(delaySearch);
    } else {
      setDataSearch(null);
    }
  }, [searchAll, pathUrl]);

  useEffect(() => {
    if (!dataSearch) setSearch("");
  }, [dataSearch]);

  useEffect(() => {
    setSearchAll(search);
  }, [search]);

  // useEffect(() => {
  //   getSubscribe();
  // }, []);

  // let expireDate = null;
  // if (dataSubscribe) {
  //   const inputDate = dataSubscribe.slice(0, 10);
  //   const parts = inputDate.split("-");
  //   expireDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  // }

  // React.useEffect(() => {
  //   socket.on("message", (data) => {
  //     setMessages([...messages, data]);
  //     if (messages) handleGetNotification();
  //   });
  // }, [socket, messages]);

  React.useEffect(() => {
    handleGetWebDashboard()
    handleGetNotification();
  }, []);

  useEffect(() => {
    if (decoded?.exp) {
      // Calculate the time remaining until the JWT expires
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeUntilExpiration = decoded?.exp - currentTime;

      // Set a timeout to execute a function when the JWT expires
      const timeoutId = setTimeout(() => {
        // Handle the JWT expiration, for example, by logging the user out
        console.log('JWT has expired');
        snackBar('error', 'Your token expired');
        handleOkSignout();
        // You can also add code to clear the user's session or perform any other action here
      }, timeUntilExpiration * 1000); // Convert timeUntilExpiration to milliseconds

      // Remember to clear the timeout when the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [decoded?.exp]);

  const avatar = useMemo(() => {
    return dataEmploye?.avatar;
  }, [dataEmploye?.avatar]);

  const departmentName = useMemo(() => {
    return dataEmploye?.departmentName || decoded?.department_code || "-";
  }, [dataEmploye?.departmentName, decoded?.department_code]);

  const employeeName = useMemo(() => {
    return dataEmploye?.employeeName || decoded?.company_name || "-";
  }, [dataEmploye?.employeeName, decoded?.company_name]);

  const companyName = useMemo(() => {
    return dataEmploye?.companyName || decoded?.company_name || "-";
  }, [dataEmploye?.companyName, decoded?.company_name])

  return (
    <>
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${
          fixedNavbar
            ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
            : "px-0 py-1"
        }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <Breadcrumbs
              className={`bg-transparent p-0 transition-all ${
                fixedNavbar ? "mt-1" : ""
              }`}
            >
              <Link to={`/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" color="blue-gray">
              {page}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <div className="mr-auto md:mr-4 md:w-56">
              <div className="relative flex w-full max-w-[26rem]">
                <Input
                  data-tut="reactour__search"
                  type="text"
                  label="Search"
                  color="green"
                  value={search}
                  onChange={onChange}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  crossOrigin={undefined}
                />
                <MagnifyingGlassIcon
                  color={!search ? "gray" : "green"}
                  className="!absolute right-3 top-2.5 h-5 w-5 rounded"
                />
                {dataSearch && (
                  <Card
                    className={
                      "!absolute right-0  top-11 z-50 w-56 gap-4 rounded"
                    }
                  >
                    {dataSearch.map((data, index) => (
                      <div key={index} className="gap-4">
                        {data.pages.map((value, index) => (
                          <Link
                            to={`/${data.layout}${value.path}`}
                            className={
                              "flex cursor-pointer flex-row p-2 hover:bg-green-100"
                            }
                          >
                            <Typography
                              key={index}
                              variant="small"
                              className="text-[13px] font-bold uppercase text-black"
                            >
                              {data.layout}
                            </Typography>
                            <Typography
                              key={index}
                              variant="small"
                              className="cursor-pointer text-[13px] text-black"
                            >
                              {value.path}
                            </Typography>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </Card>
                )}
              </div>
            </div>
            {expireDate && (
              <div
                className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-3 shadow-sm"
                data-tut="reactour__expired"
              >
                <Typography
                  className="text-xs font-semibold uppercase"
                  color={
                    isWarn || remainingTime === "expired" ? "red" : "green"
                  }
                >
                  {remainingTime}
                </Typography>
              </div>
            )}
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon
                strokeWidth={3}
                className="h-6 w-6 text-blue-gray-500"
              />
            </IconButton>

            <Menu open={openMenuNotif} handler={setOpenMenuNotif}>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray" data-tut="reactour__notif">
                  {isEmpty(notifData?.unreadNotifCount) ||
                  notifData?.unreadNotifCount === 0 ? (
                    <BellIcon className="h-5 w-5 text-blue-gray-500" />
                  ) : (
                    <Badge
                      content={notifData?.unreadNotifCount}
                      width="w-4"
                      height="h-4"
                      fontSize="text-[8px]"
                      top="-top-2"
                      right="-right-1"
                    >
                      <BellIcon className="h-5 w-5 text-blue-gray-500" />
                    </Badge>
                  )}
                </IconButton>
              </MenuHandler>
              <MenuList className="flex w-max min-w-[320px] flex-col gap-2 border-0">
                {isLoadingNotif ? (
                  <NotificationShimmer />
                ) : notifData?.data && !isEmpty(notifData?.data) ? (
                  <>
                    {notifData?.data?.map((list, index: number) => (
                      <MenuItem
                        data-testid="menu-item"
                        key={`menuItem-${index}`}
                        className={`flex items-center gap-4 ${
                          list.isRead ? "bg-white" : "bg-gray-100"
                        }`}
                        onClick={() => handleUpdateNotification(list.id)}
                      >
                        <div>
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
                            <ClockIcon className="h-3.5 w-3.5" />{" "}
                            {moment(list.created_at).format(
                              "MMMM Do YYYY - hh:mm"
                            )}
                          </Typography>
                        </div>
                      </MenuItem>
                    ))}
                    <div
                      className="mt-2"
                      onClick={() => {
                        navigate("/notification");
                        setOpenMenuNotif(false);
                      }}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 cursor-pointer text-center font-bold"
                      >
                        View All Notification
                      </Typography>
                    </div>
                  </>
                ) : (
                  <NotificationEmpty />
                )}
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <div
                  data-tut="reactour__profile"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border"
                  style={{ backgroundColor: avatar ? '#FFFFFF' : bgColor }}
                >

                  {avatar ? (
                    <img
                      className="mx-auto h-10 w-10 rounded-full"
                      src={avatar}
                      alt="John Doe"
                    />
                  ):(
                    <Typography className="text-gray-200 uppercase" variant="h6">
                      {getInitialLetter(employeeName)}
                    </Typography> 
                  )}
                </div>
              </MenuHandler>

              <MenuList className={"w-72 border-0"}>
                <div className="flex items-center justify-center bg-white">
                  <div className="bg-white">
                    <div
                      data-tut="reactour__profile"
                      className="flex ml-4 h-32 w-32 cursor-pointer items-center justify-center rounded-full border"
                      style={{ backgroundColor: avatar ? '#FFFFFF' : bgColor  }}
                      onClick={() => setShowModalUploadPhoto(true)}
                    >
                      {avatar ? (
                        <img
                          className="mx-auto h-32 w-32 rounded-full"
                          src={avatar}
                          alt="John Doe"
                        />
                      ):(
                        <Typography className="text-gray-200 uppercase" variant="h1">
                          {getInitialLetter(employeeName)}
                        </Typography>
                      )}
                    
                    </div>
                    <div className="p-2">
                      <h3 className="text-center text-xl font-medium leading-8 text-gray-900">
                        {employeeName}
                      </h3>
                      <div className="text-center text-xs font-semibold text-gray-700">
                        <p>{dataEmploye?.positionName}</p>
                      </div>
                      <table className="my-3 text-xs">
                        <tbody>
                          <tr>
                            <td className="px-2 py-2 font-semibold text-gray-600">
                              Department
                            </td>
                            <td className="px-2 py-2 text-gray-800">
                              {departmentName}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 font-semibold text-gray-600">
                              Company
                            </td>
                            <td className="px-2 py-2 text-gray-800">
                              {companyName}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <MenuItem className="flex flex-row gap-3">
                  <div>
                    <LockClosedIcon color={"gray"} className="h-4 w-4" />
                  </div>
                  <div onClick={handleOpenReset}>
                    <Typography
                      variant="small"
                      color={"gray"}
                      className="mb-1 font-bold"
                    >
                      {"Change Password"}
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem className="flex flex-row gap-3">
                  <div>
                    <ArrowLeftOnRectangleIcon
                      color={"gray"}
                      className="h-4 w-4"
                    />
                  </div>
                  <div onClick={handleOpenSignout}>
                    <Typography
                      variant="small"
                      color={"gray"}
                      className="mb-1 font-bold"
                    >
                      Sign Out
                    </Typography>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>

      <Modal
        open={isOpenSignOut}
        header={""}
        handleClose={() => setIsOpenSignOut(false)}
        body={
          <div className="text-center text-xl">
            Are you sure want to sign out <strong>{userName}</strong> ?
          </div>
        }
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              onClick={handleOkSignout}
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
              onClick={() => setIsOpenSignOut(false)}
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

      <Modal
        open={showModalReset}
        header={"Change Password"}
        handleClose={() => setShowModalReset(false)}
        body={
          <>
            <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-2">
              <Input
                value={newPassword}
                size="lg"
                label="New Password"
                color="green"
                onChange={(e) => setNewPassword(e.target.value)}
                crossOrigin={undefined}
              />
              <Input
                value={reNewPassword}
                size="lg"
                label="Confirm New Password"
                color="green"
                onChange={(e) => setReNewPassword(e.target.value)}
                crossOrigin={undefined}
              />
            </div>
          </>
        }
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              disabled={!newPassword || !reNewPassword}
              onClick={handleChangePassword}
            >
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Save"}
              </Typography>
            </Button>
            <Button
              variant="filled"
              color={"red"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              onClick={() => setShowModalReset(false)}
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

      <Modal
        open={showModalUploadPhoto}
        header={"Upload Avatar"}
        handleClose={() => setShowModalUploadPhoto(false)}
        body={
          <div className={"flex flex-col items-center justify-center"}>
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
            />
            {imageChange && (
              <img
                className="mx-auto h-32 w-32 rounded-full"
                src={imageChange}
                alt="John Doe"
              />
            )}
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 mt-8 w-28 content-center p-2"}
              onClick={onChangePhoto}
            >
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Upload"}
              </Typography>
            </Button>
          </div>
        }
        footer={
          <div className="flex flex-row-reverse">
            <Button
              variant="filled"
              color={"green"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              disabled={!imageChange || isLoadingUpload}
              onClick={handleChangeProfile}
            >
              <div className="flex flex-row gap-2 items-center">
                {isLoadingUpload ? (
                      <>
                          <Typography
                              variant="small"
                              className="font-bold uppercase text-white text-center"
                          >
                              {'Loading'}
                          </Typography>
                          <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                      </>
                  ) : (
                      <>
                          <Typography
                              variant="small"
                              className="font-bold uppercase text-white "
                          >
                              {'Save Avatar'}
                          </Typography>
                      </>
                  )}

              </div>
            </Button>
            <Button
              variant="filled"
              color={"red"}
              className={"ml-4 mb-4 w-28 content-center p-2"}
              onClick={() => setShowModalUploadPhoto(false)}
            >
              <Typography
                variant="small"
                className="text-center font-bold uppercase text-white"
              >
                {"Cancel"}
              </Typography>
            </Button>
          </div>
        }
      />
    </>
  );
}

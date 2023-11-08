import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/app/context";
import React from "react";
import { useState, useRef } from "react";
import { BLACKLISTIMAGE, WHITELISTIMAGE } from "@/utils/general";
import { postUploadIcon } from "@/app/services/file";
import { snackBar } from "@/utils/snackbar";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Modal } from "../molecules";
import { logout } from "@/app/services/auth";
interface keyable {
  [key: string]: any;
}
export function Sidenav({ routes, tourConfig }) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isModalLogout, setIsModalLogout] = useState<boolean>(false);
  const [errorUpload, setErrorUpload] = useState<string>("");
  const [isSaveUpload, setIsSaveUpload] = useState<boolean>(false);
  const fileReader = new FileReader();
  const hiddleFileInput = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<keyable>({ preview: "", raw: "" });
  const decodedToken = localStorage.getItem("decoded");
  const decoded = JSON.parse(decodedToken || "");
  const defaultImgPreview = decoded?.icon_url;
  const brandName = decoded?.company_name;
  const role = decoded?.role.toLowerCase()
  const [isClickUpload, setIsCLickUpload] = useState<boolean>(false);

  const { sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const handleClickUpload = () => {
    hiddleFileInput.current?.click();
    setIsCLickUpload(true);
  };

  const handleChangeImage = (event) => {
    const files = event.target.files[0];

    if (files) {
      const imageSize = Number((files.size / 1024 / 1024).toFixed(2));
      const maxSize = 2; // in Mega Byte

      if (imageSize < maxSize) {
        if (errorUpload?.length > 1) {
          setErrorUpload("");
        }

        fileReader.onloadend = function (e: any) {
          const arr = new Uint8Array(
            e.target.result as ArrayBufferLike
          ).subarray(0, 4);

          let header = "";

          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }

          if (!BLACKLISTIMAGE.includes(header)) {
            if (WHITELISTIMAGE.includes(header)) {
              setImage({
                preview: URL.createObjectURL(files),
                raw: files,
              });
              setIsSaveUpload(true);
            }
          } else {
            setErrorUpload("Image file type allowed: .JPG, .JPEG, dan .PNG");
          }
        };
        fileReader.readAsArrayBuffer(files);
      } else {
        setErrorUpload("Make sure image file size up to 2 MB");
      }
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image?.raw);
    setIsLoadingUpload(true);
    try {
      const response = await postUploadIcon(formData, true);

      if (response && response?.message === "Success") {
        setIsModalLogout(true);
        setIsLoadingUpload(false);
        setIsSaveUpload(false);
      }
      setIsLoadingUpload(false);
      setIsSaveUpload(false);
    } catch (err) {
      setIsLoadingUpload(false);
      snackBar("error", "Upload company logo failed");
      setIsSaveUpload(false);
    }
    setIsCLickUpload(false);
  };

  const handleOkSignout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("decoded");
    setIsModalLogout(false);
    navigate("/signin");
  };

  const currentUrl = window.location.href;

  return (
    <>
      <aside
        data-tut="reactour__sidenav"
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
      >
        <div
          className={`block border-b ${
            sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
        >
          <div className="flex w-full items-center justify-between py-6 pl-6 pr-2">
            {isClickUpload ? (
              <div className="flex flex-col">
                <div className="flex w-full items-center space-x-3">
                  <div className="flex w-1/3 items-center">
                    <img
                      src={image.preview || defaultImgPreview}
                      className="h-10 w-full cursor-pointer"
                    />
                  </div>
                  <Typography
                    variant="h6"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="whitespace-nowrap"
                  >
                    {brandName}
                  </Typography>
                </div>
                {isLoadingUpload && (
                  <div
                    style={{ fontSize: "9px" }}
                    className="absolute top-0 w-full cursor-pointer rounded-full border-none bg-opacity-30 text-white"
                  >
                    <div className="flex h-20 items-center">
                      <Spinner color="green" className="ml-5 mt-1 h-4 w-4" />
                    </div>
                  </div>
                )}
                {isSaveUpload && (
                  <div
                    onClick={handleUploadImage}
                    className="mt-3 w-full cursor-pointer rounded-md bg-green-500 py-1 text-center text-xs text-white hover:bg-green-700"
                  >
                    Save
                  </div>
                )}
                <div className="text-center">
                  <Typography variant="small" color="red">
                    {errorUpload}
                  </Typography>
                </div>
              </div>
            ) : (
              <Link to="/" className="cursor-pointer">
                <div className="flex w-full items-center space-x-3">
                  <div className="flex w-1/3 items-center">
                    <img
                      src={image.preview || defaultImgPreview}
                      className="h-10 w-full cursor-pointer"
                    />
                  </div>
                  <Typography
                    variant="h6"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="whitespace-nowrap"
                  >
                    {brandName}
                  </Typography>
                </div>
              </Link>
            )}
            {role === "admin" && (
              <div className="mx-1 cursor-pointer rounded-xl p-2 hover:bg-white/20">
                <PencilIcon
                  color="gray"
                  className="h-4 w-4"
                  onClick={handleClickUpload}
                />
              </div>
            )}
            <input
              accept="image/x-png, image/jpg, image/jpeg, image/png"
              type="file"
              onChange={handleChangeImage}
              ref={hiddleFileInput}
              className="hidden"
            />
          </div>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <div className="m-4 h-[calc(100vh-180px)] overflow-scroll scrollbar-hide">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path, showSidebar }) => (
                <React.Fragment key={name}>
                  {showSidebar && (
                    <li>
                      <NavLink to={`/${layout}${path}`}>
                        <Button
                          variant={
                            currentUrl.includes(layout) ? "gradient" : "text"
                          }
                          color={
                            currentUrl.includes(layout)
                              ? // ? "yellow"
                                "green"
                              : sidenavType === "dark"
                              ? "white"
                              : "green"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          ))}
        </div>
      </aside>

      <Modal
        open={isModalLogout}
        header={"Success Change Icon!"}
        handleClose={() => setIsModalLogout(false)}
        body={
          <div className="text-xl">Please re-login to persist the image.</div>
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
              onClick={() => setIsModalLogout(false)}
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

Sidenav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/components/organisms/sidenav.tsx";

export default Sidenav;

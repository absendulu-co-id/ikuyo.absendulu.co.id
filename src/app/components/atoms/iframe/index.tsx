import React from "react";
import { Dialog, Typography } from "@material-tailwind/react";

export interface IFrameProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  url: string;
  address: string;
  clockin: string;
  size?: "md" | "sm" | "lg";
}

const IFrame: React.FC<IFrameProps> = ({
  open,
  handleClose,
  name,
  url,
  address,
  clockin,
  size,
}) => {
  return (
    <Dialog open={open} size={size} handler={handleClose} className="bg-transparent shadow-none mx-auto">
      <figure className="relative w-full md:w-2/3 mx-auto">
        <img
          className="h-full w-full rounded-xl"
          src={url}
          alt={name}
        />
        <figcaption className="absolute bottom-5 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-3 md:py-4 px-4 md:px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
            <Typography color="gray" className="mt-2 font-normal text-xs md:text-sm">
              {address}
            </Typography>
          </div>
          <Typography variant="h5" color={"blue-gray"}>
            {clockin}
          </Typography>
        </figcaption>
      </figure>
    </Dialog>
  );
};

export default IFrame;

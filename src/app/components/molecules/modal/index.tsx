import {
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";

export interface IModalProps {
  open: boolean;
  header: string | JSX.Element | JSX.Element[];
  handleClose(): void;
  body: string | JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[];
  size?: "md" | "sm" | "lg";
  className?: string;
  stickyHeader?: boolean;
}

export default function Modal({
  open,
  handleClose,
  header,
  body,
  footer,
  size,
  className,
  stickyHeader = false,
}: IModalProps) {

  return (
    <Dialog
      open={open}
      size={size}
      handler={() => {}}
      className={className}
    >
      <DialogBody className="w-full">
        <div className={stickyHeader ? "sticky top-0 z-40 bg-white mb-2 w-full" : "z-40 bg-white mb-2 w-full"}>
          <div className="flex justify-between items-center">
            <div className="shrink-0 px-0 py-4 lg:p-0 text-blue-gray-900 antialiased font-sans text-sm md:text-lg lg:text-xl font-semibold leading-snug">{header}</div>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
          </IconButton>
          </div>
        </div>
        {body}
      </DialogBody>
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
}

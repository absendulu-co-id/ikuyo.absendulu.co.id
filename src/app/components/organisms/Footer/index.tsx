import * as React from "react";
import { Typography } from "@material-tailwind/react";

export interface IRoutesProps {
  name: string;
  path: string;
}

const Footer = () => {
  const brandName = "absendulu.id";
  const brandLink = "https://absendulu.id";
  const routes = [
    { name: "absendulu.id", path: "https://absendulu.id/" },
    { name: "FAQ", path: "https://absendulu.id/faq" },
    { name: "Knowledge Base", path: "https://kb.absendulu.com/" },
    {
      name: "Whatsapp Us!",
      path: "https://api.whatsapp.com/send/?phone=6287779939366&text&type=phone_number&app_absent=0",
    },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="w-inherit flex h-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; Copyright {year} by{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>
        </Typography>
        <ul className="flex items-center gap-2 md:gap-4 ">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                className="py-0.5 px-1 text-xs font-normal text-inherit transition-colors hover:text-green-500 sm:text-sm"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

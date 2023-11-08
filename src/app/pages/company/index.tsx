import { useState } from "react";
import Tour from 'reactour';
import { routes } from "@/app/routes";
import { CardMenu } from "@/app/components";

interface TourConfigInterface {
  selector: string;
  content: string;
  isRead: boolean;
}

export function Company() {

  const initialTourConfig = [
    {
      selector: '[data-tut="reactour__company_list"]',
      content: 'Here submenu of company data',
      isRead: false,
    },
  ];

  const pathUrl = document.location.href.split('/');

  const [isTourOpen, setIsTourOpen] = useState<string | null | boolean>(localStorage.getItem(`play-tour-${pathUrl.at(3)}`));
  const [tourConfig, setTourConfig] = useState<TourConfigInterface[]>(initialTourConfig);

  const handleCloseTour = () => {
    localStorage.setItem(`play-tour-${pathUrl.at(3)}`, 'false');
  }

  return (
    <>
      <div className="mt-12">
        <div
          className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4"
          data-tut="reactour__company_list"
        >
          {routes.map(
            ({ layout, pages }) =>
              layout === "company" &&
              pages.map(({ name, path, image }, index) => (
                <>
                  {index > 0 && (
                    <CardMenu
                      key={index}
                      navigate={`/${layout}${path}`}
                      title={name}
                      image={image || ""}
                    />
                  )}
                </>
              ))
          )}
        </div>
      </div>
      

      <Tour 
        lastStepNextButton={<p onClick={handleCloseTour}>Done! Let's start exploring another menu !</p>}
        accentColor={"#57af5b"}
        rounded={5}
        isOpen={isTourOpen === 'true'}
        steps={tourConfig}
        onRequestClose={() => {
          setIsTourOpen(false);
        }}
      />
    </>
  );
}

export default Company;

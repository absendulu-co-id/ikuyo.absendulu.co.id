import { useState } from "react";
import Tour from 'reactour';
import { Routes, Route, useParams } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/app/components";
import Sidenav from "../components/organisms/sidenav";
import {routes} from "@/app/routes";
import {
  setOpenConfigurator,
} from "@/app/context";

interface TourCofigProps {
  selector: string;
  content: string;
}

interface ITemplateProps {
  tourConfig: TourCofigProps
}

const initialTourConfig = [
  {
    selector: '[data-tut="reactour__sidenav"]',
    content: 'Here you can access the menu',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__search"]',
    content: 'Here you can access the search',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__expired"]',
    content: 'Here your expiry date info',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__notif"]',
    content: 'Here your notification',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__profile"]',
    content: 'Here your profile',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__dashboard_card"]',
    content: 'Here your employees data',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__dashboard_statistics"]',
    content: 'Here your statistics of attendance',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__dashboard_top_absence"]',
    content: 'Most absence',
    isRead: false,
  },
  {
    selector: '[data-tut="reactour__dashboard_top_late"]',
    content: 'Most late',
    isRead: false,
  },
  // {
  //   selector: '[data-tut="reactour__access_card"]',
  //   content: 'Organize your access',
  //   isRead: false,
  // },

];

interface TourConfigInterface {
  selector: string;
  content: string;
  isRead: boolean;
}

export function Template() {
  const { layout } = useParams();
  const [isTourOpen, setIsTourOpen] = useState<string | null | boolean>(localStorage.getItem("play-tour-dashboard"));
  const [tourConfig, setTourConfig] = useState<TourConfigInterface[]>(initialTourConfig);

  const handleCloseTour = () => {
    localStorage.setItem('play-tour-dashboard', 'false');
  }


  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-gray-50/50">
    <Sidenav
        routes={routes}
        tourConfig={tourConfig}
    />
        <div className="p-4 xl:ml-80">
        <DashboardNavbar
          tourConfig={tourConfig}
        />
        <Configurator />

        {/* Activate line below f want to enable icon of configurator */}
        {/* <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(true)}
        >
            <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes.map(
            ({ layout: routeLayout , pages }) =>
              layout === routeLayout &&
              pages.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
        <div className="text-blue-gray-600 mb-2 xl:ml-80">
          <Footer />
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
          // getCurrentStep={(curr) => {
          //   console.log(`The current step is ${curr}`);
          //   const newArr = [...initialTourConfig, initialTourConfig[curr].isRead = true]
          //   setTourConfig(newArr);
          // }}
        />
    </div>
  );
}

export default Template;

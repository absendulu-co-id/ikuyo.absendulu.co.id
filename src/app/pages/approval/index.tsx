import { useState } from "react";
import Tour from 'reactour';
import CardMenu from "@/app/components/molecules/cards/CardMenu";
import { routes } from "@/app/routes";
import { TourConfigInterface } from "@/interface/tour";

export function Approval() {

  const initialTourConfig = [
    {
        selector: '[data-tut="reactour__approval_list"]',
        content: 'Here the submenu of approval',
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
        <div className="mt-12" data-tut="reactour__approval_list">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {routes.map(
                ({ layout, pages }) =>
                    layout === "approval" &&
                    pages.map(({ name, path, image }, index) => (
                        <>
                            {index > 0 && (
                                <CardMenu 
                                    key={index}
                                    navigate={`/${layout}${path}`}
                                    title={name}
                                    image={image || ''}
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

export default Approval;


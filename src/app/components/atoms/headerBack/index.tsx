import * as React from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


export interface IHeaderBackProps {
  onBack?: () => void;
}

export default function HeaderBack (props: IHeaderBackProps) {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
        className="w-5 flex items-center cursor-pointer"
        onClick={handleBack}
    >
      <ArrowLeftIcon />
    </div>
  );
}

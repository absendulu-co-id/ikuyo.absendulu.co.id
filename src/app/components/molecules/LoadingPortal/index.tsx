import * as React from 'react';

export interface ILoadingPortalProps {
}

export default function LoadingPortal (props: ILoadingPortalProps) {
  return (
    <div className="absolute h-full w-full backdrop-blur-1 bg-gray-800 bg-opacity-90">
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex justify-center items-center space-x-1 text-sm text-green-700">
                <svg className="w-20 h-20 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor' fill-rule='evenodd' />
                </svg>
            </div>
        </div>
    </div>
  );
}

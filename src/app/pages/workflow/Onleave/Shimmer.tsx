import * as React from 'react';

export interface IShimmerProps {
}

export default function Shimmer (props: IShimmerProps) {
  return (
    <div className="p-4 w-full mx-auto flex flex-col gap-5">
        <div className="flex flex-row gap-1 justify-center mb-10">
            <div className="bg-gray-200 w-40 h-14 rounded-l-lg animate-pulse"></div>
            {Array.from({length: 3}, (_, i) => (
                    <div key={i} className="bg-gray-200 w-40 h-14 animate-pulse"></div>
                ))}
            <div className="bg-gray-200 w-40 h-14 rounded-r-lg animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-4">
            <div className="bg-gray-200 w-full h-10 animate-pulse rounded-md"></div>
            <div className="flex flex-row gap-4 justify-center">
                {Array.from({length: 12}, (_, i) => (
                    <div key={i} className="bg-gray-200 w-16 h-8 animate-pulse rounded-md"></div>
                ))}
            </div>
        </div>

        <div className="flex flex-row justify-between gap-4">
            {Array.from({length: 2}, (_, i) => (
                <div className="flex flex-col gap-4" key={i} style={{ flexBasis: '49%'}}>
                    <div className="bg-gray-200 w-full h-10 animate-pulse rounded-md"></div>
                    <div className="flex flex-row gap-4 justify-center">
                        {Array.from({length: 5}, (_, i) => (
                            <div key={i} className="bg-gray-200 w-16 h-8 animate-pulse rounded-md"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

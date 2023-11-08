import * as React from 'react';

export interface IBadgeProps {
    children: React.ReactNode;
    bgColor?: string;
    onClick?: () => void;
    content: string;
    colorNumber?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    top?: string;
    right?: string;
}

export default function Badge ({
    children,
    bgColor = 'red',
    colorNumber = '500',
    onClick,
    content,
    fontSize = 'text-xs',
    width = 'w-6',
    height = 'h-6',
    top = '-top-3',
    right = '-right-3',
}: IBadgeProps) {
  return (
    <div className="relative">
        <div className="">
            {children}
        </div>
        <div
            onClick={onClick}
            className={`bg-${bgColor}-${colorNumber} rounded-full border-2 border-white ${width} ${height} text-white flex justify-center items-center font-bold ${fontSize} absolute ${top} ${right}`}
        >
            {content}
        </div>
    </div>
  );
}

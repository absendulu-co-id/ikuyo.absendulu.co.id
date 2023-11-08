import * as React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

type ColorProps = 'white' | 'blue-gray' | 'gray' | 'brown' | 'deep-orange' | 'orange' | 'amber' | 'yellow' | 'lime' | 'light-green' | 'green' | 'teal' | 'cyan' | 'light-blue' | 'blue' | 'indigo' | 'deep-purple' | 'purple' | 'pink' | 'red' | 'color' | ''

export interface IStatisticsCardProps {
    color: ColorProps
    title: string | JSX.Element | JSX.Element[]
    value: string | JSX.Element | JSX.Element[]
    footer?: string | JSX.Element | JSX.Element[]
    icon: string | JSX.Element | JSX.Element[]
}

export default function StatisticsCard ({
    color = 'blue', title, value, footer = null, icon
}) {
  return (
    <Card className='flex flex-row justify-between p-0'>
      <div>
        <CardHeader
          variant="gradient"
          color={color}
          className="-mt-4 xl:mx-2 grid h-16 w-16 xl:h-14 xl:w-14 place-items-center"
          >
          {icon}
        </CardHeader>
      </div>
      <div className='pr-3'>
      <CardBody className="py-4 px-3 xl:px-0 text-end">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="capitalize">
          {value}
        </Typography>
      </CardBody>
      </div>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

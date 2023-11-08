import * as React from 'react';
import {
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
import { HeaderBack } from '@/app/components';
import DragList from '@/app/pages/workflow/Onleave/Draglist';

export interface GetOnleaveResponse {
    positionName: string;
    positionId: number;
}

export default function Onleave () {

  return (
    <div className="mt-12 mb-8 flex flex-col gap-1 inset-2">
        <CardHeader variant="gradient" color="green" className="mb-8 p-6 flex flex-row gap-4">
            <HeaderBack />
            <Typography variant="h6" color="white">
                {'Workflow'}
            </Typography>
        </CardHeader>
        <DragList />
    </div>

  );
}

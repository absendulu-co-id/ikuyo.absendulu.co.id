import React, { useMemo } from 'react';
import {
    Button,
    IconButton,
} from '@material-tailwind/react';
import {
    ArrowRightIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { getPaginationItems } from '@/utils/getPaginationItems';
import { isEmpty } from '@/utils/locDash';

export interface IPaginationProps {
    current?: number;
    total?: number;
    onChange: (page: number) => void;
}

export default function Pagination ({
    current = 1,
    total = 1,
    onChange,
}: IPaginationProps) {  

  const generatedTotal = useMemo(() => (isEmpty(total) ? 1 : total), [total])

  const pageNums = getPaginationItems(current, generatedTotal);

  const isPrevDisabled = useMemo(() => current === 1, [current]);
  const isNextDisabled = useMemo(() => current === generatedTotal, [current, generatedTotal])


  const onPageClick = (pageNum: number, idx: number) => {

    if (isNaN(pageNum)) {
      if (idx < 3) {
        onChange(pageNums[idx + 2] - 2)
      }
      if (idx > 5) {
        onChange(pageNums[idx - 2] + 2)
      }
      return
    }

    onChange(pageNum)
    return
  }


  return (
    <div className="flex items-center gap-4 m-4">
        <Button
            variant="text"
            color="green"
            className="flex items-center gap-2"
            disabled={isPrevDisabled}
            onClick={() => !isPrevDisabled && onChange(current - 1)}
        >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
            {pageNums.map((pageNum, index) => {
            
             return (
                <div key={index}>
                    <IconButton
                      variant={current === pageNum ? "filled" : "text"}
                      color={current === pageNum ? "green" : "blue-gray"}
                      onClick={() => onPageClick(pageNum, index)}
                    >
                      {!isNaN(pageNum) ? pageNum : '...'}
                    </IconButton>
                </div>
            )})}
        </div>
        <Button
            variant="text"
            color="green"
            className="flex items-center gap-2"
            disabled={isNextDisabled}
            onClick={() => !isNextDisabled && onChange(current + 1)}
        >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
    </div>
  );
}

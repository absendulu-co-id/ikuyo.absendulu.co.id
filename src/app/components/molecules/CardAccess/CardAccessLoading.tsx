import { Card, CardBody } from "@material-tailwind/react";
import React from "react";

const CardAccessLoading = () => {

    return (
        <>
            {Array.from({length: 6}, (_, i) => (
                <Card key={i}>
                    <CardBody >
                        <div className={'flex flex-row justify-between animate-pulse'}>
                            <div className="flex flex-row">
                                <div className={'bg-gray-200 rounded-md h-20 w-20'}>
                                </div>
                                <div className={'flex flex-col ml-4'}>
                                    <div className={'bg-gray-200 rounded-xl h-6 w-24'}></div>
                                    <div className={'bg-gray-200 rounded-xl h-6 xl:w-56 w-40 mt-1.5'}></div>
                                    <div className={'bg-gray-200 rounded-xl h-5 xl:w-56 w-40 mt-1.5'}></div>
                                </div>
                            </div>
                            <div>
                            <div className={'flex flex-row gap-2'}>
                                <div className={'bg-gray-200 rounded-md h-5 w-5'}></div>
                                <div className={'bg-gray-200 rounded-md h-5 w-5'}></div>
                            </div>
                                
                        </div>
                        </div>
                        
                    </CardBody>
                </Card>
            ))}
            
        </>
        
    )
}

export default CardAccessLoading
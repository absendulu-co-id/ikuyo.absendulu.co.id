import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";


const NotFoundPage = () => {

    const navigate = useNavigate();

    const handleToHome = () => {
        window.location.assign('/dashboard');
        
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center mt-10">
                    <Typography variant={'h1'} color="green">404</Typography>
                  
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <Button onClick={handleToHome} color="green">Back to Homepage</Button>
                </div>   
            </div>
        </section>
    )
}

export default NotFoundPage;
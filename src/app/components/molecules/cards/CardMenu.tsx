import { NavLink } from "react-router-dom";

interface Props {
    navigate: string;
    image: string;
    title: string;
}

const CardMenu = ({
    navigate,
    image,
    title
}: Props) => {

    return(
        <NavLink to={navigate} className={'max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer hover:scale-105 flex flex-col justify-between items-center'}>
            <img
                src={`/img/${image}.png`}
                alt="card-image"
                className="rounded-sm h-40"
            />
            <h5 className="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </NavLink>
    )
}

export default CardMenu;
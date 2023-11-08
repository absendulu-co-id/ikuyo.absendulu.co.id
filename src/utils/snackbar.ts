import { toast } from 'react-toastify';
interface Props {
    type: 'success' | 'warn' | 'error';
    message: string
}

export const snackBar = (type: 'success' | 'warn' | 'error', message: string) => {
    toast[type](message, {
        position: toast.POSITION.TOP_CENTER
    })
}
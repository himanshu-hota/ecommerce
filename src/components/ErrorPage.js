import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Glass from "./Glass";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ErrorPage() {
    const error = useRouteError();
    // show notification 
    toast.error(`${error.data}`);
    

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="product-details w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white flex justify-center items-center font-mono text-2xl">
                <Glass name='error-page' height='h-[40vh]' width='w-[90vw]' className='flex flex-col gap-3 justify-center items-center'>
                    <div>
                        <h1>Looks like you landed on mars</h1>
                    </div>

                    <div>
                        <p>Go to <Link to='..' className='underline italic' >HOME</Link> </p>
                    </div>

                </Glass>
            </div>
        </>
    );
}
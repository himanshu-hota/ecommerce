import React from 'react';
import { useSelector, useDispatch} from 'react-redux/es/exports';
import Loading from './Loading';
import ProductList from './ProductList';
import { sortProducts} from '../store/productsSlice';


const Homepage = () => {
    
    const dispatch = useDispatch();
    // get loading state
    const isLoading = useSelector(state => state.productsReducer.loading);
    // function to sort data
    const sortData = () => {
        dispatch(sortProducts());
    }


    return (
        <div className="homepage font-mono w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white p-5  overflow-y-scroll scroll-smooth">
            <div className="sort w-full h-[10%] text-right">
                <button onClick={sortData} className=' rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3 hover:opacity-80'>Sort By price</button>
            </div>
            {isLoading && <Loading />}
            {!isLoading && <ProductList />}
            

        </div>
    )
}

// loader function to handle data fetching
export const loader = async () => {
    const res = await fetch('https://my-json-server.typicode.com/himanshu-hota/ecom/db');

    if(!res.ok){
        throw new Response("Unable to get data from server", { status: 404 });
    }

    return res;
}


export default Homepage;
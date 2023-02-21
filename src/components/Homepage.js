import React from 'react';
import { useSelector, useDispatch} from 'react-redux/es/exports';
import Loading from './Loading';
import ProductList from './ProductList';
import { sortProducts} from '../store/productsSlice';

const Homepage = () => {
    const isLoading = useSelector(state => state.productsReducer.loading);
    const dispatch = useDispatch();
    const sortData = () => {
        dispatch(sortProducts());
    }

    return (
        <div className="homepage font-mono w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white p-5  overflow-y-scroll">
            <div className="sort w-full h-[10%] text-right">
                <button onClick={sortData} className=' rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3 hover:opacity-80'>Sort By price</button>
            </div>
            {isLoading && <Loading />}
            {!isLoading && <ProductList />}
            

        </div>
    )
}

export default Homepage;
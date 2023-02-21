import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Product from './Product';


const Products = () => {


    let products = useSelector(state => state.productsReducer.products);
    
    return (
        <>
            <div className="products flex flex-col gap-5 ">
                {
                    products.map((item) =>
                        <Product key={item.id} data={item} />

                    )
                }
            </div>
        </>
    )
}

export default Products;
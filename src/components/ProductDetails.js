import React, { useEffect, useState } from 'react';
import Glass from './Glass';
import { addToCart } from '../store/productsSlice';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const ProductDetails = () => {

    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const dispatch = useDispatch();
    // products from store
    const product = useSelector(state => state.productsReducer.singleProduct);
    const cart = useSelector(state => state.productsReducer.cart);
    const { productId } = useParams();


    useEffect(() => {
        //check if product already exist in cart
        if (cart.some(item => item.id === productId)) {
            setAlreadyInCart(true);
        } else {
            setAlreadyInCart(false);
        }

    }, [productId, cart])
 

    // destructure data 
    const { id, title, description, price, rating, image } = product;

    // function to handle submit 
    const handleCart = () => {
        dispatch(addToCart(id));
        toast.dismiss();
        toast.success('🦄 Product added to cart!!')
    }

    return (
        <div className="product-details w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col justify-center items-center font-mono scroll-smooth">

        {!product.id && <p>No data to show , kindly go to home!!</p>}

        (   product.id &&
            {    <Glass name='product' height='h-[80%]' width='w-[80%]' className='p-4 flex flex-col md:flex-row justify-between items-center' >
                <div className="poster h-[40%] md:h-full w-full ">
                    <img src={image} alt="product-0" className='h-full w-full md:object-contain rounded-md drop-shadow-xl' />
                </div>

                <div className="details flex flex-col justify-center items-center h-[60%] md:h-full w-full gap-3 md:gap-5 md:text-2xl mt-6 text-md md:px-5">
                    <div className="title w-full">
                        <h1>Name : {title}</h1>
                    </div>

                    <div className="description w-full">
                        <h1>Description : {description}</h1>
                    </div>

                    <div className="price w-full">
                        <h1>Price : ${price}</h1>
                    </div>

                    <div className="rating w-full">
                        <h1>Rating : ⭐{rating}</h1>
                    </div>
                    <div className="btn w-full">

                        {
                            alreadyInCart && <button className="w-full bg-green-600 text-white p-2 rounded-md hover:opacity-80 active:text-black italic " disabled={true} >Already in cart</button>
                        }

                        {
                            !alreadyInCart && <button className="w-full bg-cyan-600 text-white p-2 rounded-md hover:opacity-80 active:text-black italic " onClick={handleCart} >Add to Cart</button>
                        }


                    </div>
                </div>
            </Glass>})

        </div>
    )
}

export default ProductDetails;
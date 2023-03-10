import React, { useEffect, useState } from 'react';
import Glass from './Glass';
import { addToCart } from '../store/productsSlice';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { toast } from 'react-toastify';
import { useParams , useNavigate } from 'react-router';

const ProductDetails = () => {

    const [alreadyInCart, setAlreadyInCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // products from store
    const product = useSelector(state => state.productsReducer.singleProduct);
    // cart data from store(database)
    const cart = useSelector(state => state.productsReducer.cart);
    // productId from params
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
        // add item to the cart
        dispatch(addToCart(id));
        // dismiss all notification
        toast.dismiss();
        // show notification
        toast.success('🦄 Product added to cart!!')
    }

    const handleBack = () => {
        // go to back
        navigate(-1);
    }

    return (
        <div className="product-details w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col justify-center items-center font-mono scroll-smooth">

        {!product.id && <p>No data to show , kindly go to home!!</p>}

          { product.id &&
            (  <Glass name='product' height='h-[85%]' width='w-[80%]' className='p-4 flex flex-col md:flex-row justify-between items-center' >
                <div className="poster h-[40%] md:h-full w-full ">
                    <img src={image} alt="product-0" className='h-full w-full md:object-contain rounded-md drop-shadow-xl' />
                </div>

                <div className="details flex flex-col justify-center items-center h-[60%] md:h-full w-full gap-3 md:gap-5 md:text-2xl mt-6 text-md md:px-5">
                    <div className="title text-xl md:text-2xl w-full">
                        <h1>Name : {title.split(' ').slice(0, 3).join(' ')}</h1>
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
                        
                           <button className="w-full bg-gray-600 text-white p-2 rounded-md hover:opacity-80 active:text-black italic mt-2" onClick={handleBack} >Go Back</button>
                        

                    </div>
                </div>
            </Glass>)}

        </div>
    )
}

export default ProductDetails;
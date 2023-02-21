import React from 'react';
import Glass from './Glass';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCartDash, BsCartPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { removeFromCart,removeOneItemFromCart,addOneItemToCart } from '../store/productsSlice';

const CartItem = (props) => {

    const { id, title, rating, description, price, image, qty } = props.data;

    const dispatch = useDispatch();
    const handleCartDelete = () => {
        dispatch(removeFromCart(id));
    };

    const handleRemoveOneItem = () => {
        dispatch(removeOneItemFromCart(id));
    };

    const handleAddOneItem = () => {
        dispatch(addOneItemToCart(id));
    };


    return (<>
        <Glass name='product' height={'h-[200px]'} width={'w-full'} className='flex justify-between items-center p-3 drop-shadow-xl hover:border-cyan-400' >
            <div className="poster w-[50%] md:w-[30%] h-full">
                <img src={image} alt="product-0" className='h-full w-full rounded-sm drop-shadow-xl' />
            </div>

            <div className="product-details w-[80%] h-full flex flex-col md:flex-row justify-between items-end p-3">


                <div className="price text-right md:text-left h-full md:flex md:flex-col md:justify-between ">
                    <p className='w-full text-2xl md:text-3xl '>{title}</p>
                    <p className='text-2xl md:text-3xl py-2'>${price}</p>
                    <p>{rating}⭐</p>
                </div>

                <div className="description md:w-[65%] md:h-full md:flex md:flex-col md:justify-between">

                    <div className="description hidden  md:block w-full">
                        <p>{description}</p>
                        <p className='mt-2 text-xl'>Quantity : {qty}  </p>
                    </div>

                    <div className="buttons flex items-center gap-3 text-xl md:text-2xl">
                        <button className='hover:text-cyan-400'> {<AiOutlineDelete onClick={handleCartDelete} data-id={id} />}</button>
                        <button className='hover:text-cyan-400'> {<BsCartDash onClick={handleRemoveOneItem} data-id={id} />}</button>
                        <button className='hover:text-cyan-400'> {<BsCartPlus onClick={handleAddOneItem} data-id={id} />}</button>
                    </div>
                </div>

            </div>

        </Glass>
    </>
    )
}

const Cart = () => {

    const cart = useSelector(state => state.productsReducer.cart);


    return (
        <>
            <div className="cart w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col gap-6 justify-center items-center">
                <h1 className="cart-title text-4xl">Cart</h1>
                <Glass name='cartItems' height='h-[80%]' width='w-[90%]' className='flex flex-col gap-6 p-4 overflow-y-auto' >
                    {
                        cart.map(item => <CartItem key={item.id} data={item} />)
                    }
                </Glass>


            </div>
        </>
    )
}

export default Cart;
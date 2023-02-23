import React from 'react';
import Glass from './Glass';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCartDash, BsCartPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { removeFromCart, removeOneItemFromCart, addOneItemToCart } from '../store/productsSlice';
import { toast } from 'react-toastify';

const CartItem = (props) => {
    // destructure
    const { id, title, rating, description, price, image, qty } = props.data;
    const dispatch = useDispatch();
    // function to delete data from the store
    const handleCartDelete = () => {
        // Remove item from the cart
        dispatch(removeFromCart(id));
        // show notification
        toast.success('🦄 1 item deleted from cart!!');
    };
    // function to remove 1 quantity from the product
    const handleRemoveOneItem = () => {
        // decrease one quantity from cart
        dispatch(removeOneItemFromCart(id));
        // dismiss all previous notifications
        toast.dismiss();
        // show notification
        toast.success('🦄 1 quantity reduced from cart!!');
    };
    // function to add 1 quantity to the product
    const handleAddOneItem = () => {
        // increase one quantity from cart
        dispatch(addOneItemToCart(id));
        // dismiss all previous notifications
        toast.dismiss();
        // show notification
        toast.success('🦄 1 quantity added to cart!!');
    };


    return (<>


        <Glass name='cartItem' height={'h-[200px]'} width={'w-full'} className='flex justify-between items-center p-3 drop-shadow-xl hover:border-cyan-400 ' >
            <div className="poster w-[40%] md:w-[30%] h-full">
                <img src={image} alt="product-0" className='h-full w-full rounded-sm drop-shadow-xl' />
            </div>

            <div className="product-details w-[60%] md:w-[70%] h-full flex flex-col md:flex-row justify-between items-end p-3">


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


const CartItems = () => {

    const cart = useSelector(state => state.productsReducer.cart);

  return (
    <>

          {/* <Glass name='cartItems' height='h-[70vh]' width='w-[90vw]' className=' p-4 overflow-y-scroll  scroll-smooth' > */}
          <div className='p-6  flex flex-col gap-5 '>
              {
                  cart.map(item => <CartItem key={item.id} data={item} />)
              }
          </div>
          {/* </Glass> */}

     </>
  )
}

export default CartItems;
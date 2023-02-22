import React from 'react';
import CartItems from './CartItems';


const Cart = () => {

    return (
        <>
            <div className="cart w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 text-white  overflow-y-scroll ">

                <h1 className="cart-title text-6xl text-center p-5 ">Cart</h1>
                <CartItems />
                
            </div>

        </>
    )
}

export default Cart;
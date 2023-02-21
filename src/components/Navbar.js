import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux/es/exports';
const Navbar = () => {

  // get total number of items in the store
  const totalItem = useSelector(state => state.productsReducer.totalItem);


  return (
    <nav className="navbar w-full h-[8vh] bg-gradient-to-b from-gray-900 to-gray-800 text-white flex justify-between items-center p-4 text-xl font-mono">
      <div className="logo ">
        <Link to='..' className='hover:text-gray-400 cursor-pointer'>e-COM</Link>
      </div>
      <div className="links mr-3 flex  gap-4 items-center">

        <Link to='add-new-product' className='hover:text-gray-400 cursor-pointer'>Add Product</Link>
        <div className='flex items-center gap-2 bg-gray-600 p-2 rounded-full'>
          <Link to='cart' className='hover:text-gray-400 cursor-pointer'><AiOutlineShoppingCart /></Link>
          <span>{totalItem}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
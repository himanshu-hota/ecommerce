import React from 'react';
import Glass from './Glass';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productsSlice';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AddNewProduct = () => {

    // Generate unique ids
    const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // functinn to add a product to store(database)
    const handleSubmit = (data) => {
        // Structuring data for adding in the database
        const finalData = {
            id,
            qty:1,
            ...data
        }
        // Add data to the store
        dispatch(addProduct(finalData));
        //show notification
        toast.success('🦄 Product added!!')
        // go to home
        navigate('..');
        
    }

  return (
      <div className="add-new-product w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700 flex justify-center items-center">

        <Glass name='produc' height='h-[65%]' width='w-[80%]' className='p-6' >
            
                  <Form submitFunction={handleSubmit}>
                      <div className="btn w-full ">
                          <input type="submit" className="w-full bg-cyan-800 text-white p-2 rounded-md hover:opacity-80 active:text-black italic" value={'Submit'} />
                      </div>
                  </Form>
            
        </Glass>
    </div>
  )
}

export default AddNewProduct;
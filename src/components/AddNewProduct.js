import React from 'react';
import Glass from './Glass';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productsSlice';
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {

    const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        
        const finalData = {

            id,
            qty:0,
            ...data
        }
        dispatch(addProduct(finalData));
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
import React from 'react';
import { useForm } from "react-hook-form";
const Form = ({ submitFunction, data, children }) => {

    // get function from hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Form validation using React-Hook-Form
    // Read more : https://react-hook-form.com/get-started/

    return (<>

        {/* Form */}
        <form className='w-full h-full' onSubmit={handleSubmit(submitFunction)}>
            <div className='w-full text-xl grid grid-cols-1 md:grid-cols-2'>
                <label htmlFor="title" className='text-white' >Name : </label>
                <input type="text" className={`outline-none p-1 my-1 rounded-md ${errors.title && 'border-solid border-[2px] border-red-600  '}`} id='title' placeholder='Product name' defaultValue={data?.title || ''} {...register("title", { required: true,maxLength:30 })} />
            </div>
            <div className='w-full py-2 text-xl grid grid-cols-1 md:grid-cols-2'>

                <label htmlFor="price" className='text-white'>Price : </label>
                <input type="number" className={`outline-none p-1 my-1 rounded-md ${errors.price && 'border-solid border-[2px] border-red-600 '}`} id='email' placeholder='Product price' defaultValue={data?.price || ''}  {...register("price", { required: true })} />


            </div>
            <div className='w-full py-2 text-xl grid grid-cols-1 md:grid-cols-2'>
                <label htmlFor="description" className='text-white'>Description : </label>
                <input type="text" className={`outline-none p-1 my-1 rounded-md ${errors.description && 'border-solid border-[2px] border-red-600 '}`} id='phone' placeholder='Product Description' defaultValue={data?.description || ''} {...register("description", { required: true, maxLength: 200 })} />

            </div>
            <div className='w-full py-2 text-xl grid grid-cols-1 md:grid-cols-2'>
                <label htmlFor="rating" className='text-white'>Rating : </label>
                <input type="number" step='0.01' className={`outline-none p-1 my-1 rounded-md ${errors.rating && 'border-solid border-[2px] border-red-600 '}`} max='5' id='website' placeholder='Product Rating' defaultValue={data?.rating}  {...register("rating", { required: true })} />

            </div>
            <div className='w-full py-2 text-xl grid grid-cols-1 md:grid-cols-2'>
                <label htmlFor="image" className='text-white'>Image : </label>
                <input type="text" className={`outline-none p-1 my-1 rounded-md ${errors.image && 'border-solid border-[2px] border-red-600 '}`} id='image' placeholder='Image address (url)' defaultValue={data?.image || ''}  {...register("image", { required: true,maxLength:200 })} />

            </div>

            {children}

        </form>

    </>)
}

export default Form;
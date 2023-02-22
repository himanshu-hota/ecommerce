import Form from './Form';
import Glass from './Glass';
import { useSelector } from 'react-redux/es/exports';
import { updateProducts } from '../store/productsSlice';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteProduct } from '../store/productsSlice';


const EditProducts = () => {

    const dispatch = useDispatch();
    // get product id 
    const { productId } = useParams();
    const navigate = useNavigate();
    // product data
    const product = useSelector(state => state.productsReducer.singleProduct);
    // function to update data 
    const updateData = (updatedProductData) => {
        const finalData = {
            id: productId,
            ...updatedProductData
        }
        dispatch(updateProducts(finalData));
        navigate('..');
        toast.success('🦄 Product Updated!!');
    }
    // functions to delete data from store
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(product.id));
        navigate('..');
        toast.success('🦄 Product Deleted!!');
    }


    return (
        <>
            <div className="editForm w-full h-[92vh] bg-gradient-to-b from-gray-900 to-gray-700  flex justify-center items-center">

                <Glass name='form' height='h-[60%]' width='w-[80%] md:w-[70%]' className='p-5' >
                    <Form submitFunction={updateData} data={product} >
                        <div className="btn w-full grid grid-cols-2 gap-3">
                            <input type="submit" className="w-full bg-cyan-800 text-white p-2 rounded-md hover:opacity-80 active:text-black italic" value={'Update'} />
                            <button className="w-full bg-red-600 text-white p-2 rounded-md hover:opacity-80 active:text-black italic" onClick={handleDelete}>Delete</button>
                        </div>
                    </Form>
                </Glass>
            </div>
        </>

    )
}


export default EditProducts;
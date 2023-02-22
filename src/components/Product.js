import { Link ,useNavigate } from 'react-router-dom';
import Glass from './Glass';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { deleteProduct, addToCart } from '../store/productsSlice';
import { useDispatch } from 'react-redux/es/exports';
import { getSingleProduct } from '../store/productsSlice';
import { toast } from 'react-toastify';

const Product = (props) => {

    // destructure data
    const { id, title, rating, description, price, image } = props.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // function to delete product
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        toast.dismiss();
        toast.success('🦄 Product Deleted!!');
    }

    // function to product add cart
    const handleCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(id));
        toast.dismiss();
        toast.success('🦄 Added to Cart!!');
        
    }

    // function to set single product
    const setSingleProduct = () => {
        dispatch(getSingleProduct(id));
    }

    // function to get single product data
    const getDetails = () => {
        dispatch(getSingleProduct(id));
        navigate(`product-details/${id}`);
    }

    return (
        <>
            <Glass name='product' height={'h-[200px]'} width={'w-full'} className='flex justify-between items-center p-3 drop-shadow-xl hover:border-cyan-400 scroll-smooth' >
                <div className="poster w-[50%] md:w-[30%] h-full">
                    <img src={image} alt="product-0" className='h-full w-full rounded-sm drop-shadow-xl cursor-pointer' onClick={getDetails} />
                </div>

                <div className="product-details w-[80%] h-full flex flex-col md:flex-row justify-between items-end p-3">


                    <div className="price text-right md:text-left h-full md:flex md:flex-col md:justify-between ">
                        <p className='w-full text-xl md:text-3xl '>{title.split(' ').slice(0, 3).join(' ') }</p>
                        <p className='text-xl md:text-3xl py-2'>${price}</p>
                        <p>{rating}⭐</p>
                    </div>

                    <div className="description md:w-[65%] md:h-full md:flex md:flex-col md:justify-between">

                        <div className="description hidden  md:block w-full">
                            <p>{description}</p>
                        </div>

                        <div className="buttons flex items-center gap-3 text-xl md:text-2xl">
                            <Link to={`edit-product/${id}`} className='hover:text-cyan-400' >{<FiEdit2 onClick={setSingleProduct} />}</Link>
                            <button className='hover:text-cyan-400' onClick={handleCart}>{<BsCartPlus    />}</button>
                            <button className='hover:text-cyan-400' onClick={handleDelete}> {<AiOutlineDelete  />}</button>

                        </div>
                    </div>

                </div>

            </Glass>
        </>
    )
}

export default Product;
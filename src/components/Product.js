import { Link ,useNavigate } from 'react-router-dom';
import Glass from './Glass';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { deleteProduct, addToCart } from '../store/productsSlice';
import { useDispatch } from 'react-redux/es/exports';
import { getSingleProduct } from '../store/productsSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Product = (props) => {

    const { id, title, rating, description, price, image } = props.data;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.productsReducer.loading);


    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
    }

    const handleCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(id));
    }

    const setSingleProduct = () => {
        dispatch(getSingleProduct(id));
    }

    const getDetails = () => {
        dispatch(getSingleProduct(id));
        navigate(`product-details/${id}`);
    }

    return (
        <>
            <Glass name='product' height={'h-[200px]'} width={'w-full'} className='flex justify-between items-center p-3 drop-shadow-xl hover:border-cyan-400' >
                <div className="poster w-[50%] md:w-[30%] h-full">
                    <img src={image} alt="product-0" className='h-full w-full rounded-sm drop-shadow-xl' onClick={getDetails} />
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
                        </div>

                        <div className="buttons flex items-center gap-3 text-xl md:text-2xl">
                            <Link to={`edit-product/${id}`} className='hover:text-cyan-400' >{<FiEdit2 onClick={setSingleProduct} />}</Link>
                            <button className='hover:text-cyan-400' disabled={isLoading} >{<BsCartPlus onClick={handleCart} data-id={id} />}</button>
                            <button className='hover:text-cyan-400'  > {<AiOutlineDelete onClick={handleDelete} data-id={id} />}</button>

                        </div>
                    </div>

                </div>

            </Glass>
        </>
    )
}

export default Product;
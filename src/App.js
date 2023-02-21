import { useEffect } from "react";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import { getProductsFromAPI } from "./store/productsSlice";
import { useDispatch } from "react-redux/es/exports";
import Homepage from "./components/Homepage";
import EditProducts from "./components/EditProducts";
import Cart from "./components/Cart";
import ErrorPage from './components/ErrorPage';
import ProductDetails from "./components/ProductDetails";
import AddNewProduct from "./components/AddNewProduct";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {index:true,element:<Homepage />},
      { path: 'cart', element: <Cart /> },
      { path:'edit-product/:productId', element: <EditProducts /> },
      {path:'product-details/:productId', element:<ProductDetails />},
      { path: 'add-new-product', element: <AddNewProduct /> },
    ]
  },
]);




function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsFromAPI());

  }, [dispatch])


  return (
    <RouterProvider router={router} />
  );
}

export default App;

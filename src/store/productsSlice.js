import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
const initialState = {
    products: [],
    cart: [],
    totalItem: 0,
    singleProduct: {},
    loading: false
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        getProducts: (state, action) => {
            state.products = action.payload;
            
        },
        getSingleProduct: (state, action) => {
            const products = state.products;
            const productId = action.payload;
            const product = products.find(item => item.id === productId);
            state.singleProduct = product;
        },
        updateProducts: (state, action) => {
            console.log('update called!');
            // const productId = Number(action.payload.id); //re
            const productId = action.payload.id;
            const products = state.products;
            let productIndex = products.findIndex((product => product.id === productId));
            console.log(productIndex);
            //Update contact here.
            state.products[productIndex] = action.payload;

        },
        addProduct:(state,action) => {
            const products = state.products;
            const product = action.payload;
            products.push(product);
        },
        setTempData: (state, action) => {
            state.products = action.payload;
        },
        deleteProduct: (state, action) => {
            state.loading = true;
            const productId = action.payload;
            const products = state.products;
            const updatedProducts = products.filter(product => product.id !== productId);
            state.products = updatedProducts;
            state.loading = false;
        },
        addToCart: (state, action) => {
            state.loading = true;
            // const productId = Number(action.payload); //re
            const productId = action.payload;
            const dataToAdd = state.products.find(item => item.id === productId);

            if (state.cart.some(item => item.id === productId)) {
                state.totalItem++;
                const cartItem = state.cart.find(item => item.id === productId);
                cartItem.qty++;

            } else {
                state.totalItem++;
                state.cart.push(dataToAdd);
            }
            state.loading = false;
        },
        removeFromCart:(state,action) => {
            const productId = action.payload;
            const products = state.cart;
            const dataToRemove = state.cart.find(item => item.id === productId);
            const updatedProducts = products.filter(product => product.id !== productId);
            state.totalItem = state.totalItem - dataToRemove.qty;
            state.cart = updatedProducts;
        },
        removeOneItemFromCart:(state,action)  => {
            
            // const productId = Number(action.payload); //re
            const productId = action.payload;
            const dataToAdd = state.cart.find(item => item.id === productId);
            if(dataToAdd.qty <= 1){
                const productId = action.payload;
                const products = state.cart;
                const updatedProducts = products.filter(product => product.id !== productId);
                state.cart = updatedProducts;
            }
            dataToAdd.qty--;
            state.totalItem--;
        },
        addOneItemToCart: (state, action) => {
            // const productId = Number(action.payload); //re
            const productId = action.payload;
            const dataToAdd = state.cart.find(item => item.id === productId);
            dataToAdd.qty++;
            state.totalItem++;
        },
        sortProducts: (state, action) => {
            const products = state.products;
            products.sort((x, y) => x.price - y.price);
            state.products = products;
            // state.sortedData = sortedProducts;
        }
    },
})

// Action creators are generated for each case reducer function
// export const { } = productsSlice.actions


export const { deleteProduct, addToCart, sortProducts, getSingleProduct, updateProducts,removeFromCart,removeOneItemFromCart,addOneItemToCart,addProduct } = productsSlice.actions;

export const getProductsFromAPI = () => {

    return async (dispatch) => {

        dispatch(productsSlice.actions.setLoading(true));
        // Get data from API
        const getData = async () => {
            const res = await fetch('https://my-json-server.typicode.com/himanshu-hota/ecom/db');
            const data = await res.json();

            return data;
        }

        const products = await getData();
        dispatch(productsSlice.actions.getProducts(products.products));
        dispatch(productsSlice.actions.setLoading(false));

    }
}


export const setProductsLocal = () => {

    return (dispatch) => {
        dispatch(productsSlice.actions.setLoading(true));
        const products = [
            {
                id: '4f43',
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                qty: 1,
                rating: 4.69,
                image: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            },
            {
                id: '55hh5',
                title: "iPhone X",
                description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                price: 899,
                qty: 1,
                rating: 4.44,
                image: "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
            },
            {
                id: '4h5632',
                title: "Samsung Universe 9",
                description: "Samsung's new variant which goes beyond Galaxy to the Universe",
                price: 1249,
                qty: 1,
                rating: 4.09,
                image: "https://i.dummyjson.com/data/products/3/thumbnail.jpg"
            },
            {
                id: '8i6767i',
                title: "OPPOF19",
                description: "OPPO F19 is officially announced on April 2021.",
                price: 280,
                qty: 1,
                rating: 4.3,
                image: "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
            },
            {
                id: '76k6',
                title: "Huawei P30",
                description: "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
                price: 499,
                qty: 1,
                rating: 4.09,
                image: "https://i.dummyjson.com/data/products/5/thumbnail.jpg"
            },
            {
                id: '877j6',
                title: "MacBook Pro",
                description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
                price: 1749,
                qty: 1,
                rating: 4.57,
                image: "https://i.dummyjson.com/data/products/6/thumbnail.png"
            },
            {
                id: '1d1k87',
                title: "Samsung Galaxy Book",
                description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
                price: 1499,
                qty: 1,
                rating: 4.25,
                image: "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
            },
            {
                id: 'vbc90dfg',
                title: "Microsoft Surface Laptop 4",
                description: "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
                price: 999,
                qty: 1,
                rating: 4.43,
                image: "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
            },
            {
                id: 'fd89u9',
                title: "Infinix INBOOK",
                description: "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
                price: 1099,
                qty: 1,
                rating: 4.54,
                image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
            },
            {
                id: '9b04',
                title: "HP Pavilion 15-DK1056WM",
                description: "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
                price: 1099,
                qty: 1,
                rating: 4.43,
                image: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
            }
        ];

        dispatch(productsSlice.actions.setTempData(products));
        dispatch(productsSlice.actions.setLoading(false));

    }
}





const productsReducer = productsSlice.reducer;

export default productsReducer;
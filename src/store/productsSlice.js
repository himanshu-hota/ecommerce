import { createSlice } from '@reduxjs/toolkit'

// Initial state for the store
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
            //loading state
            state.loading = action.payload;
        },
        setProducts: (state, action) => {
            // set products to store
            state.products = action.payload;
        },
        getSingleProduct: (state, action) => {
            // products
            const products = state.products;
            // product id
            const productId = action.payload;
            // find product from store
            const product = products.find(item => item.id === productId);
            // set single product
            state.singleProduct = product;
        },
        updateProducts: (state, action) => {
            // product id
            const productId = action.payload.id;
            // pruducts
            const products = state.products;
            // product index in the store
            let productIndex = products.findIndex((product => product.id === productId));
            // Update contact here.
            state.products[productIndex] = action.payload;

        },
        addProduct: (state, action) => {
            // products            
            const products = state.products;
            // product to add
            const product = action.payload;
            // add data to store
            products.push(product);
        },
        setTempData: (state, action) => {
            state.products = action.payload;
        },
        deleteProduct: (state, action) => {
            state.loading = true;
            // product id
            const productId = action.payload;
            // products
            const products = state.products;
            // updated products data
            const updatedProducts = products.filter(product => product.id !== productId);
            // update data to store
            state.products = updatedProducts;
            state.loading = false;
        },
        addToCart: (state, action) => {
            state.loading = true;
            // product id
            const productId = action.payload;
            // product to add
            const dataToAdd = state.products.find(item => item.id === productId);
            // check if cart has already the same product
            if (state.cart.some(item => item.id === productId)) {
                // increase total items
                state.totalItem++;
                const cartItem = state.cart.find(item => item.id === productId);
                // increset product quantity
                cartItem.qty++;

            } else {
                // if not then add it to cart
                state.cart.push(dataToAdd);
                // increase total items
                state.totalItem++;
            }
            state.loading = false;
        },
        removeFromCart: (state, action) => {
            // product id
            const productId = action.payload;
            // cart data
            const products = state.cart;
            // product to remove
            const dataToRemove = state.cart.find(item => item.id === productId);
            // updated product data
            const updatedProducts = products.filter(product => product.id !== productId);
            // increase total items
            state.totalItem = state.totalItem - dataToRemove.qty;
            // update cart data
            state.cart = updatedProducts;
        },
        removeOneItemFromCart: (state, action) => {
            // product id
            const productId = action.payload;
            // product to remove
            const dataToRemove = state.cart.find(item => item.id === productId);

            // if quantity is less than 0 then remove it from cart
            if (dataToRemove.qty <= 1) {
                const productId = action.payload;
                const products = state.cart;
                const updatedProducts = products.filter(product => product.id !== productId);
                state.cart = updatedProducts;
            }

            // decrease the quantity
            dataToRemove.qty--;
            // decrease total quantity
            state.totalItem--;
        },
        addOneItemToCart: (state, action) => {
            // product id
            const productId = action.payload;
            // product to add to cart
            const dataToAdd = state.cart.find(item => item.id === productId);
            // increase the quantity
            dataToAdd.qty++;
            // increase the quantity
            state.totalItem++;
        },
        sortProducts: (state, action) => {
            // products
            const products = state.products;
            // sort the data
            products.sort((x, y) => x.price - y.price);
            // update the products in store
            state.products = products;
            
        }
    },
})

// Action creators are generated for each case reducer function

// all action functions 
export const { deleteProduct, addToCart, sortProducts, getSingleProduct, updateProducts, removeFromCart, removeOneItemFromCart, addOneItemToCart, addProduct} = productsSlice.actions;

export const getProductsFromAPI = () => {

    return async (dispatch) => {
        // set loading state to true
        dispatch(productsSlice.actions.setLoading(true));
        // get data from store
        const getData = async () => {
            const res = await fetch('https://my-json-server.typicode.com/himanshu-hota/ecom/db');
            if (!res.ok) {
                throw new Response("Unable to get data from server", { status: 404 });
            }
            const data = res.json();

            return data;
        }
        // call the data
        const data = await getData();
        // set data to store
        dispatch(productsSlice.actions.setProducts(data.products));
        // set loading state to false
        dispatch(productsSlice.actions.setLoading(false));
    }
}


// for testing only
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
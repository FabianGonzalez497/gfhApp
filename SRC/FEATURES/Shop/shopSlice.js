import { createSlice } from '@reduxjs/toolkit';
import categories from '../../DATA/categories.json';
import products from '../../DATA/products.json';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categories: categories,
            products: products,
            categorySelected: "",
            productsFilteredByCategory: [],
            productIdSelected: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.productsFilteredByCategory = state.value.products.filter(product => product.category.toLowerCase() === action.payload.toLowerCase());
            state.value.categorySelected = action.payload
        }
    }
});

export const { setCategory } = shopSlice.actions;

export default shopSlice.reducer;

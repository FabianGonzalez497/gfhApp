import { createSlice } from '@reduxjs/toolkit';
import { calculate_total_price } from '../../UTILS/functions';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: null,
            cartLength: 0,
            updateAt: new Date().toLocaleString(),
        },
    },
    reducers: {
        addItem: (state, action) => {
            const productInCart = state.value.cartItems.find(item => item.id === action.payload.id);
            if (!productInCart) {
                state.value.cartItems.push({ ...action.payload, quantity: 1 });
                state.value.cartLength += 1;
            } else {
                state.value.cartItems = state.value.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            state.value.total = calculate_total_price(state.value.cartItems);
            state.value.updateAt = new Date().toLocaleString();
        },
        removeItem: (state, action) => {
            state.value.cartItems = state.value.cartItems.filter(item => item.id !== action.payload);
            state.value.total = calculate_total_price(state.value.cartItems);
            state.value.updateAt = new Date().toLocaleString();
        },
        clearCart: (state) => {
            state.value.cartItems = [];
            state.value.total = null;
            state.value.cartLength = 0;
        },
        confirmPurchase: (state) => {
            state.value.cartItems.forEach(cartItem => {
                const product = products.find(product => product.id === cartItem.id);
                if (product) {
                    product.stock -= cartItem.quantity;
                }
            });
            state.value.cartItems = [];
            state.value.total = 0;
            state.value.updateAt = new Date().toLocaleString();
        },
    },
});

export const { addItem, removeItem, clearCart, confirmPurchase } = cartSlice.actions;

export default cartSlice.reducer;

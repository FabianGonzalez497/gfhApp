import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../FIREBASE/database';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories.json'
        }),
        getProducts: builder.query({
            query: () => 'products.json'
        }),
        getProductsByCategory: builder.query({
            query: (category) => {
                category = category.toLowerCase();
                return `products.json?orderBy="category"&equalTo="${category}"`;
            },
            transformResponse: (response) => {
                console.log("Response from Firebase:", response); // Verificar la respuesta
                return response ? Object.values(response) : [];
            },
            transformErrorResponse: (response) => {
                console.error("Error from Firebase:", response); // Manejar errores
                return response ? Object.values(response) : [];
            }
        })
    })
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery } = shopApi;

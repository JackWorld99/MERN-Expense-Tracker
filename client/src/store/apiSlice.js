import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:' + process.env.REACT_APP_PORT;

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURI}),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => "/categories",
            providesTags: ['categories']

        }),
        getLabels: builder.query({
            query: () => '/labels',
            providesTags: ['transactions']
        }),
        addTransaction: builder.mutation({
           query: (initialTransaction) => ({
            url: '/transactions',
            method: 'POST',
            body: initialTransaction
           }),
           invalidatesTags: ['transactions']
        }),
        deleteTransaction : builder.mutation({
            query : recordId => ({
                url : '/transactions',
                method : "DELETE",
                body : recordId
            }),
            invalidatesTags: ['transactions']
        })
    })
})

export default apiSlice;
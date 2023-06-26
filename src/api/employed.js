import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const employAPI = createApi({
  reducerPath: 'employApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    registerEmploy: builder.mutation({
      query: (data) => {
        let token = localStorage.getItem('token')
        delete data['passwordConfirmation']

        return {
          url: '/employee/',
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
  }),
})

export const { useRegisterEmployMutation } = employAPI

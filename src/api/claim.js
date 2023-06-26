import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const claimAPI = createApi({
  reducerPath: 'claimApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getClaims: builder.query({
      query: ({ page }) => {
        let token = localStorage.getItem('token')
        return {
          url: `/claim/?current_page=${page}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
    getClaim: builder.query({
      query: ({ id }) => {
        let token = localStorage.getItem('token')
        return {
          url: `/claim/${id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
    registerClaim: builder.mutation({
      query: (data) => {
        let token = localStorage.getItem('token')

        return {
          url: `/claim/`,
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        }
      },
    }),
  }),
})

export const { useGetClaimsQuery, useGetClaimQuery, useRegisterClaimMutation } =
  claimAPI

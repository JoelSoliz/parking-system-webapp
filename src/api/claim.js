import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const claimAPI = createApi({
  reducerPath: 'claimApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parking-system-api-production.up.railway.app',
  }),
  endpoints: (builder) => ({
    getClaims: builder.query({
      query: ({page}) => {
        let token = localStorage.getItem('token')
        return {
          url: `/claim/?current_page=${page}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
  }),
})

export const { useGetClaimsQuery} = claimAPI
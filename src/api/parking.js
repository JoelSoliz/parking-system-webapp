import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parkingAPI = createApi({
  reducerPath: 'parkingAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getSpots: builder.query({
      query: () => {
        return {
          url: `/parking/`,
          method: 'GET',
        }
      },
    }),
    getSpot: builder.query({
      query: ({ id }) => {
        let token = localStorage.getItem('token')
        return {
          url: `/parking/${id}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
  }),
})

export const { useGetSpotQuery, useGetSpotsQuery } = parkingAPI

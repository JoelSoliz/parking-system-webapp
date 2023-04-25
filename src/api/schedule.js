import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const scheduleAPI = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parking-system-api-production-f442.up.railway.app',
  }),
  endpoints: (builder) => ({
    registerSchedule: builder.mutation({
      query: ({ data }) => {
        let token = localStorage.getItem('token')
        return {
          url: `/parking/register-hour`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      },
    }),
  }),
})

export const { useRegisterScheduleMutation } = scheduleAPI
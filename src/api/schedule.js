import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const scheduleAPI = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    registerSchedule: builder.mutation({
      query: ({ id, cl, op }) => {
        let token = localStorage.getItem('token')
        return {
          url: `/parking/${id}?openning_time=${op}&clousing_time=${cl}`,
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
    getWeekday: builder.query({
      query: () => {
        let token = localStorage.getItem('token')

        return {
          url: `/parking/hours/`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
  }),
})

export const { useRegisterScheduleMutation, useGetWeekdayQuery } = scheduleAPI

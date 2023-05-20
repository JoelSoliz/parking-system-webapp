import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const HOST = 'http://localhost:8000'

export const getReservationAsync = async (id, token) => {
  const apiURL = `${HOST}/reservation/${id}`
  return fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}

export const getReservationsAsync = async (page, token) => {
  const apiURL = `${HOST}/reservation/?current_page=${page}`
  return fetch(apiURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e)
      throw e
    })
}

export const reservationAPI = createApi({
  reducerPath: 'reservationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: (builder) => ({
    getDaysBySpot: builder.query({
      query: ({ id, startDate, endDate }) => {
        let token = localStorage.getItem('token')

        return {
          url: `/reservation/spot/${id}?start_date=${startDate}&end_date=${endDate}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      },
    }),
  }),
})

export const { useGetDaysBySpotQuery } = reservationAPI

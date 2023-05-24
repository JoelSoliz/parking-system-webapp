import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const HOST = 'https://parking-system-api-production.up.railway.app'

export const getUserByIdInfoAsync = async (id, token) => {
  const apiURL = `${HOST}/customer/${id}`
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

export const getUsersInfoAsync = async (page, token) => {
  const apiURL = `${HOST}/customer/?current_page=${page}`
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

export const customerAPI = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parking-system-api-production.up.railway.app',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        delete data['passwordConfirmation']

        return {
          url: '/customer/',
          method: 'POST',
          body: data,
        }
      },
    }),
  }),
})

export const { useRegisterUserMutation } = customerAPI

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vehicleAPI = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://parking-system-api-production.up.railway.app/',
  }),
  endpoints: (builder) => ({
    registerVehicle: builder.mutation({
      query: ({ data }) => {
        let token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('photo', data.photo[0])
        return {
          url: `/vehicle/?license_plate=${data.plate}&vehicle_type=${data.type}&color=${data.color}`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      },
    }),
  }),
})

export const { useRegisterVehicleMutation } = vehicleAPI

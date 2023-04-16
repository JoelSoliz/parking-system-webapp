import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getReservationsAsync } from '../../api/reservations'

export const getReservations = createAsyncThunk(
  'getReservations/getReservationsAsync',
  async (page) => {
    let token = localStorage.getItem('token')
    if (!token) {
      console.error('Vuelve a iniciar sesión')
      throw new Error('invalid credential')
    }

    const result = await getReservationsAsync(page, token)
    const { detail } = result
    if (detail) {
      console.error(detail)
      throw Error(detail)
    }
    return result
  },
)

const initialState = {
  loading: 'idle',
  reservations: [],
  total_pages: 1,
}

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReservations.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getReservations.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.reservations = [...payload.results]
      state.total_pages = payload.total_pages
    })
    builder.addCase(getReservations.rejected, (state) => {
      state.loading = 'failed'
    })
  },
})

export const reservationsSelector = createSelector(
  (state) => ({
    ...state.reservations,
  }),
  (state) => state,
)

export const { a = {} } = reservationsSlice.actions

export default reservationsSlice.reducer

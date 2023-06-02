import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import {
  getReservationAsync,
  getReservationsAsync,
} from '../../api/reservations'

export const getReservation = createAsyncThunk(
  'getReservation/getReservationAsync',
  async (id) => {
    let token = localStorage.getItem('token')
    if (!token) {
      console.error('Vuelve a iniciar sesión')
      throw new Error('invalid credential')
    }

    const result = await getReservationAsync(id, token)
    const { detail } = result
    if (detail) {
      console.error(detail)
      throw Error(detail)
    }
    return result
  },
)

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
  selectedReservation: undefined,
  total_pages: 1,
  total: 0,
}

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      state.selectedReservation.status = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReservation.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getReservation.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.selectedReservation = payload
    })
    builder.addCase(getReservation.rejected, (state) => {
      state.loading = 'failed'
    })

    builder.addCase(getReservations.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getReservations.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.reservations = [...payload.results]
      state.total_pages = payload.total_pages
      state.total = payload.total_elements
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

export const { updateStatus } = reservationsSlice.actions

export default reservationsSlice.reducer

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getUserByIdInfoAsync, getUsersInfoAsync } from '../../api/customer'

export const getCustomer = createAsyncThunk(
  'getCustomer/getCustomerAsync',
  async (id) => {
    let token = localStorage.getItem('token')
    if (!token) {
      console.error('Vuelve a iniciar sesión')
      throw new Error('invalid credential')
    }

    const result = await getUserByIdInfoAsync(id, token)
    const { detail } = result
    if (detail) {
      console.error(detail)
      throw Error(detail)
    }
    return result
  },
)

export const getCustomers = createAsyncThunk(
  'getCustomers/getCustomersAsync',
  async (page) => {
    let token = localStorage.getItem('token')
    if (!token) {
      console.error('Vuelve a iniciar sesión')
      throw new Error('invalid credential')
    }

    const result = await getUsersInfoAsync(page, token)
    const { detail } = result
    if (detail) {
      console.error(detail)
      throw Error(detail)
    }
    return result
  },
)

const initialState = {
  customers: [],
  loading: 'idle',
  selectedCustomer: undefined,
  total_pages: 1,
  total: 0,
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.pending, (state, _) => {
      state.loading = 'pending'
    })
    builder.addCase(getCustomer.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.selectedCustomer = payload
    })
    builder.addCase(getCustomer.rejected, (state, _) => {
      state.loading = 'failed'
    })

    builder.addCase(getCustomers.pending, (state, _) => {
      state.loading = 'pending'
    })
    builder.addCase(getCustomers.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.customers = [...payload.results]
      state.total_pages = payload.total_pages
      state.total = payload.total_elements
    })
    builder.addCase(getCustomers.rejected, (state, _) => {
      state.loading = 'failed'
    })
  },
})

export const customersSelector = createSelector(
  (state) => ({
    ...state.customers,
  }),
  (state) => state,
)

export const {} = customersSlice.actions

export default customersSlice.reducer

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getUserInfoAsync, loginAsync } from '../../api/user'
import { registerVehicleAsync } from '../../api/vehicle'
import { registerUserAsync } from '../../api/customer'

export const login = createAsyncThunk('login/loginAsync', async (userLogin) => {
  const result = await loginAsync(userLogin)
  const { access_token, detail } = result
  if (!access_token) {
    console.error(detail)
    throw Error(detail)
  }

  localStorage.setItem('token', access_token)
  const user = await getUserInfoAsync(access_token)

  return user
})

export const registerUser = createAsyncThunk(
  'registerUser/registerUserAsync',
  async (user) => {
    const result = await registerUserAsync(user)
    const { email, detail } = result

    if (!email) {
      console.error(detail)
      throw Error(detail)
    }
    return email
  },
)

export const registerVehicle = createAsyncThunk(
  'registerVehicle/registerVehicleAsync',
  async (vehicle) => {
    const result = await registerVehicleAsync(vehicle)
    const { id_vehicle, detail } = result

    if (!id_vehicle) {
      console.error(detail)
      throw Error(detail)
    }
    return id_vehicle
  },
)

const initialState = {
  isAuthenticate: false,
  loading: 'idle',
  user: undefined,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticate = false
      state.user = undefined
    },
    resetLoading: (state, _) => {
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, _) => {
      state.loading = 'pending'
    })
    builder.addCase(registerUser.fulfilled, (state, _) => {
      state.loading = 'succeeded'
    })
    builder.addCase(registerUser.rejected, (state, _) => {
      state.isAuthenticate = false
      state.loading = 'failed'
    })

    builder.addCase(registerVehicle.pending, (state, _) => {
      state.loading = 'pending'
    })
    builder.addCase(registerVehicle.fulfilled, (state, _) => {
      state.loading = 'succeeded'
    })
    builder.addCase(registerVehicle.rejected, (state, _) => {
      state.loading = 'failed'
    })

    builder.addCase(login.pending, (state, _) => {
      state.loading = 'pending'
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.user = payload
      state.isAuthenticate = true
    })
    builder.addCase(login.rejected, (state, _) => {
      state.isAuthenticate = false
      state.loading = 'failed'
    })
  },
})

export const sessionSelector = createSelector(
  (state) => ({
    ...state.session,
  }),
  (state) => state,
)

export const { logout, resetLoading } = sessionSlice.actions

export default sessionSlice.reducer

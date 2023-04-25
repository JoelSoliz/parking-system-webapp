import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getUserInfoAsync, loginAsync } from '../../api/user'
import { registerUserAsync } from '../../api/customer'
import { toast } from 'sonner'

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
      toast.error(detail)
      console.error(detail)
      throw Error(detail)
    }

    return email
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
    resetLoading: (state) => {
      state.loading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = 'succeeded'
      toast.success('Su cuenta se registró exitosamente.')
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.isAuthenticate = false
      state.loading = 'failed'
    })

    builder.addCase(login.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = 'succeeded'
      state.user = payload
      state.isAuthenticate = true
    })
    builder.addCase(login.rejected, (state) => {
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

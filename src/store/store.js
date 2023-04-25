import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import rootReducer from '.'
import { vehicleAPI } from '../api/vehicle'
import { customerAPI } from '../api/customer'
import { reservationAPI } from '../api/reservations'
import { scheduleAPI } from '../api/schedule'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    })
      .concat(vehicleAPI.middleware)
      .concat(customerAPI.middleware)
      .concat(reservationAPI.middleware)
      .concat(scheduleAPI.middleware),
})

export const persistor = persistStore(store)

export default store

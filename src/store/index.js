import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import customersReducer from './slices/customers'
import reservationsReducer from './slices/reservations'
import sessionReducer from './slices/session'
import { vehicleAPI } from '../api/vehicle'
import { customerAPI } from '../api/customer'
import { reservationAPI } from '../api/reservations'
import { scheduleAPI } from '../api/schedule'
import { claimAPI } from '../api/claim'
import { parkingAPI } from '../api/parking'

const sessionPersistConfig = {
  key: 'session',
  storage,
}

const rootReducer = combineReducers({
  customers: customersReducer,
  reservations: reservationsReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  [vehicleAPI.reducerPath]: vehicleAPI.reducer,
  [customerAPI.reducerPath]: customerAPI.reducer,
  [reservationAPI.reducerPath]: reservationAPI.reducer,
  [scheduleAPI.reducerPath]: scheduleAPI.reducer,
  [claimAPI.reducerPath]: claimAPI.reducer,
  [parkingAPI.reducerPath]: parkingAPI.reducer,
})

export default rootReducer

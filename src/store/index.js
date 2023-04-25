import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import customersReducer from './slices/customers'
import reservationsReducer from './slices/reservations'
import sessionReducer from './slices/session'
import { vehicleAPI } from '../api/vehicle'

const sessionPersistConfig = {
  key: 'session',
  storage,
}

const rootReducer = combineReducers({
  customers: customersReducer,
  reservations: reservationsReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  [vehicleAPI.reducerPath]: vehicleAPI.reducer,
})

export default rootReducer

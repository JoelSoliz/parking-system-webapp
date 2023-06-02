import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import AdminLayout from '../Layout/AdminLayout'
import MainLayout from '../Layout/MainLayout'
import Home from '../../routes/common/Home'
import Login from '../../routes/common/Login'
import NotFound from '../../routes/common/NotFound'
import RegisterUser from '../../routes/common/RegisterUser'
import Unauthorized from '../../routes/common/Unauthorized'
import RegisterVehicle from '../../routes/client/RegisterVehicle'
import RequestList from '../../routes/admin/RequestList'
import UserList from '../../routes/admin/UserList'
import ReservationRequest from '../../routes/client/ReservationRequest'
import CheckSite from '../../routes/client/CheckSite'
import ErrorBoundary from './ErrorBoundary'
import RegisterClaim from '../../routes/client/RegisterClaim'
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register-user" element={<RegisterUser />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          path="register-vehicle"
          element={
            <PrivateRoute needed_permission={['CUST']}>
              <RegisterVehicle />
            </PrivateRoute>
          }
        />
        <Route
          path="register-claim"
          element={
            <PrivateRoute needed_permission={['CUST']}>
              <RegisterClaim />
            </PrivateRoute>
          }
        />
        <Route
          path="check"
          element={
            <PrivateRoute needed_permission={['EMPL', 'ADMN']}>
              <ErrorBoundary>
                <CheckSite />
              </ErrorBoundary>
            </PrivateRoute>
          }
        />
        <Route
          path="request/:spotId"
          element={
            <PrivateRoute needed_permission={['CUST']}>
              <ReservationRequest />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <PrivateRoute needed_permission={['EMPL', 'ADMN']}>
              <UserList />
            </PrivateRoute>
          }
        />
        <Route
          path="requests"
          element={
            <PrivateRoute needed_permission={['EMPL', 'ADMN']}>
              <ErrorBoundary>
                <RequestList />
              </ErrorBoundary>
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default Router

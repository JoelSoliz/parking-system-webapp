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
import Price from '../../routes/common/Price'
import RegisterSchedule from '../../routes/admin/RegisterSchedule'
import Schedule from '../../routes/common/Schedule'
import ClaimList from '../../routes/admin/ClaimList'
import RegisterEmployed from '../../routes/admin/RegisterEmployed'
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="price" element={<Price />} />
        <Route path="schedule" element={<Schedule />} />
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
            <PrivateRoute needed_permission={['ADMN']}>
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
        <Route
          path="registerSchedule"
          element={
            <PrivateRoute needed_permission={['EMPL', 'ADMN']}>
              <RegisterSchedule />
            </PrivateRoute>
          }
        />
        <Route
          path="claim"
          element={
            <PrivateRoute needed_permission={['EMPL', 'ADMN']}>
              <ClaimList />
            </PrivateRoute>
          }
        />
        <Route
          path="employed"
          element={
            <PrivateRoute needed_permission={['ADMN']}>
              <RegisterEmployed />
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

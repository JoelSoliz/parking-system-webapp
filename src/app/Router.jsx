import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import Login from "../screens/login/Login"
import Layout from "../components/Layout"
import RegisterUser from "../screens/registerUser/RegisterUser"

const Router = () => {
    return <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={"Hola"} />
            <Route path="login" element={<Login />} />
            <Route path="registerUser" element={<RegisterUser />} />
            <Route path="hola" element={<Outlet/>}>
                <Route index element="index" />
                <Route path="mundo" element={"hola mundo"} />
            </Route>
        </Route>
        {/* <Route path="/admin">
            <Route index />
            <Route path="/dashboard" />
            <Route path="/reports" />
        </Route> */}
    </Routes>
}
// /admin/dashboard
// /admin/reports
// /admin
export default Router

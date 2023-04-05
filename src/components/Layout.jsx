import React from "react"
import {Box } from '@mui/material'
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = () => {
    return <>
        <NavBar />
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            marginTop="100px"
        > 
            <Outlet />
        </Box>
    </>
}

export default Layout
import React from "react";
import { AppBar, Box, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import {Link} from 'react-router-dom'
import {Menu as  MenuIcon} from "@mui/icons-material"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () =>{
    const [anchorEl, setAnchorEl]= React.useState(null);
    const open = Boolean (anchorEl);
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isNonMobileDevice =useMediaQuery("(min-width: 1000px)")

    return(
        <AppBar sx={{p:"0 5%"}}>
            <Toolbar sx ={{justifyContent: "space-between"}}>
                <h3>Parqueo San Simon</h3>
                <Box sx={{display:"flex", alignItems: "center", gap: 3}}>
                    {isNonMobileDevice?
                    <>
                    <Link style={{color: "#fff", textDecoration: "none"}} to={""}>Home</Link>
                    <Link style={{color: "#fff", textDecoration: "none"}} to={"/login"}>Login</Link>
                    <Link style={{color: "#fff", textDecoration: "none"}} to={"/registerUser"}>Sign up</Link>
                    </>
                    :<>
                    <IconButton sx={{color: "#fff"}} id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true': undefined} onClick={handleClick}>
                        <MenuIcon/>
                    </IconButton>

                    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic.button'}}>
                        <MenuItem onClick={handleClose}><Link style={{color: "#333", textDecoration: "none"}} to = {""}>Home</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link style={{color: "#333", textDecoration: "none"}} to = {"/login"}>Login</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link style={{color: "#333", textDecoration: "none"}} to = {"/registerUser"}>Sign up</Link></MenuItem>
                    </Menu>
                </>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar

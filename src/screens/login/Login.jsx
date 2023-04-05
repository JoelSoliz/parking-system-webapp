import React, { useState} from "react";
import { Button, Card, CardContent, TextField, Typography,Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [showPassword, setShowPassword]= useState(false);
    const handleClickShowPassword =() => setShowPassword((show) => !show);
    
return(
    <Box alignItems="center" justifyContent="center">
        <Card sx={{p:4, py:5, maxWidth: "50px auto", display:"flex", flexDirection:"column", gap:4, borderRadius:"15px"}}>
       <CardContent sx={{m:0}}>
           <Typography gutterBottom variant="h4" component="div" sx= {{m:0}}>
                Bienvenido
           </Typography>
       </CardContent>
       <TextField id="outlined-basic" label="email" variant ="outlined" type={"email"} />
       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color="black"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
       <Button variant = 'contained'>Login</Button>
    </Card>

    </Box>
 )   
}

export default Login
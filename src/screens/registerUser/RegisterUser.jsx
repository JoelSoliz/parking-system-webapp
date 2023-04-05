import React from "react"
import { Button, Card, CardContent, TextField, Typography, Stack } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const RegisterUser = () => {
    return (
            <Card sx={{ p: 10, py: 5, maxWidth: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }}>
                <CardContent sx={{ m: 0 }}>
                    <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
                        Sign up
                    </Typography>
                </CardContent>
                <TextField id="outlined-basic" label="nombre y apellido" variant="outlined" type={"text"} />
                <TextField id="outlined-basic" label="CI" variant="outlined" type={"text"} />
                <TextField id="outlined-basic" label="email" variant="outlined" type={"email"} />
                <TextField id="outlined-basic" label="contraseña" variant="outlined" type={"password"} />
                <TextField id="outlined-basic" label="confirmar contraseña" variant="outlined" type={"password"} />
                <Typography gutterBottom variant="h8" component="div" sx={{ m: 0 }}>
                        Recibir notificaciones por: 
                </Typography>
                <FormGroup>
                   <FormControlLabel control={<Checkbox defaultChecked />} label="email" />
                   <FormControlLabel control={<Checkbox defaultChecked />} label="Whatsapp" />
                </FormGroup>
                <Stack direction="row" spacing={2}>
                    <Button variant='contained'>Cancelar</Button>
                <Button variant='contained'>Registrarse</Button>
                </Stack>
                
            </Card>
            
        
    )
}

export default RegisterUser
import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#fffffe",
        },
        secondary: {
            main: "#094067",
        },
    },
    typography: {
fontFamily: ["sans-serif"].join(","),
        fontSize: 12,
    },
});
export default theme
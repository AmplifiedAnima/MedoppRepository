import { createTheme } from "@mui/material/styles";

const themeForBreakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,     
      sm: 600,  
      md: 900,    
      lg: 1200,   
      xl: 1536,  
    },
  },
});

export default themeForBreakpoints;
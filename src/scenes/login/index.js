import { LockOutlined } from "@mui/icons-material";
import { 
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import { useState } from "react";
    

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://pf-henry-15a-ecommerce-frontend.vercel.app/">
        Henrucci
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LogIn() {
    const theme = useTheme()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e)=>{
        e.preventDefault();
        setLogin({...login, [e.target.name]:e.target.value}, setErrors(validate(login)));
    };

    const validate = (data) =>{
        let errors = {}
        const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!regexEmail.test(data.email)) errors.email = "invalid email";
        else delete errors.email;
        if (data.password.length < 8) errors.password = "must contain at least 8 characters";
        else delete errors.password;
        return errors;
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

    }
  return (
    <Container 
    component="main"
    maxWidth="xs"
    sx={{display:'flex', flexDirection:'column', height: '100vh', justifyContent:'center'}}
    >
      <CssBaseline />
      <Paper elevation={12} sx={{p:5, bgcolor: theme.palette.background.default}} >
        <Box sx={{display:'flex', flexDirection:'column', flexGrow: 1, alignItems: 'center' }}>    
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Henrucci
        </Typography>
        </Box>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={login.email}
            onChange={handleChange}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={login.password}
            onChange={handleChange}
            helperText={errors.password}
          />
          <FormControlLabel control={<Checkbox defaultChecked color="secondary"/>} label="Remember me" sx={{color:theme.palette.secondary[400], p:1}}/> 
          <Button
            fullWidth
            variant="contained"
            disabled={Object.keys(errors).length > 0 ? true : false}
            sx={{bgcolor: theme.palette.secondary[300], color: theme.palette.primary.main}}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot" variant="body2" sx={{color: theme.palette.secondary[400]}}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper >
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import image from "assets/profileImage.png";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const FormNewUser = () => {
    const [newUser, setNewUser] = useState({
        name:"",
        lastname: '',
        email:"",
        role:"",
        password:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            console.log(reader.result);
            setNewUser({...newUser, image: reader.result});
        };

        reader.readAsDataURL(file);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return <form
            autoComplete="off"
            noValidate
            onSubmit={()=>{}}
            >
            <Card sx={{background: theme.palette.primary.main}}>
                <CardContent sx={{ p: 5, display: 'flex', justifyContent:'center', flexDirection:{xs:'column',sm:'column', md:'row'}}}>
                    <Grid
                    container
                    xs={7}
                    md={4}
                    >
                        <Grid
                            item
                            sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'65%'}}
                        >
                            <img                            
                                src={newUser.image ? newUser.image : image}
                                alt="product image"
                                width='150vw'
                                height='150vw'
                                style={{borderRadius: 3}}
                            />
                            <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon sx={{ color: theme.palette.primary[600] }}/>}
                            sx={{bgcolor: theme.palette.secondary[300], mt: '1rem'}}
                            >
                                <Typography m="0.1rem" sx={{ color: theme.palette.primary[600] }}>
                                    Upload file
                                </Typography>
                                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileUpload}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                    container
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    rowSpacing={1}
                    xs={7}
                    md={9}
                    >
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            helperText="Please specify the user name"
                            label="Name"
                            name="name"
                            onChange={() =>{}}
                            required
                            value={newUser.name}
                            variant="standard"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Lastname"
                            name="lastname"
                            onChange={() =>{}}
                            required
                            value={newUser.lastname}
                            variant="standard"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="email"
                            name="email"
                            onChange={()=>{}}
                            required
                            value={newUser.email}
                            variant="standard"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                        <FormControl sx={{ width: '100%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            select
                            onChange={()=>{}}
                            required
                            value={newUser.role}
                            variant="standard"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{bgcolor: theme.palette.secondary[300]}}>
                    <Typography sx={{ color: theme.palette.primary[600] }}>
                        Create user
                    </Typography>
                </Button>
                </CardActions>
            </Card>
        </form>;
};

export default FormNewUser;
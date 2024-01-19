import React, { useState, useEffect } from "react";
import { 
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Select,
    Slide,
    Snackbar,
    MenuItem,
    Typography
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import image from "assets/profileImage.png";
import { useUploadPhotoMutation, usePostNewUserMutation } from "state/api";

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
        lastname: "",
        email:"",
        role:"",
        password:"",
        image: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errors, setErrors] = useState({
        name:"",
        lastname: "",
        email:"",
        role:"",
        password:"",
    });
    const [uploadPhoto] = useUploadPhotoMutation();
    const [postNewUser] = usePostNewUserMutation();
    const theme = useTheme();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNGM2NTVlMTRiMzE0ODRhMWNhOGUiLCJpYXQiOjE3MDUwMDUzNjd9.gR7JcF7BYRl4bpqC4j3ATV0lP1-xrTb_7LZKqatxv5g";

    const handleFileUpload = async(event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            console.log(reader.result);
            setNewUser({...newUser, image: reader.result});
        };
        //reader.readAsDataURL(file);
        const formDataPhoto = new FormData();
        file && formDataPhoto.append("photoData", file);
        formDataPhoto.append("name", file.name);

        const photoResponse = await uploadPhoto({formDataPhoto});
        //console.log("photo uploaded, id: ", photoResponse.data);
        //console.log("image:", `https://pf-15a.up.railway.app/api/photos/${photoResponse.data.id}`);
        setNewUser({...newUser, image: `https://pf-15a.up.railway.app/api/photos/${photoResponse.data.id}`});
    };

    const handleInputChange = (event) => {
        setNewUser({...newUser, [event.target.name]:event.target.value});
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async() =>{
        try {
            if(Object.keys(errors).length > 0){
                setErrors({...errors, submit: "Please complete all required inputs"});
                return setErrorAlert(true);
            }
            const response = await postNewUser({newUser, token:token});
            console.log('response',response);
            if(response.error) throw new Error(response.data);
            setSuccessAlert(true);
            setNewUser({
                name:"",
                lastname: "",
                email:"",
                role:"",
                password:"",
                image: ""
            });
        } catch (error) {
            console.log("Crear user error:", error);
            setErrors({...errors, submit: "Error while creating new product"});
        }
    };

    const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setSuccessAlert(false);
    setErrorAlert(false);
    };

    const validate = (data) =>{
        let errors = {}
        const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!data.name) errors.name = "Please specify the user name";
        else delete errors.name;
        if(!data.lastname) errors.lastname = "Please specify the user lastname";
        else delete errors.lastname;
        if(!data.email) errors.email = "Please specify the user email";
        else if(!regexEmail.test(data.email)) errors.email = "invalid email";
        else delete errors.email;
        if(!data.password) errors.password = "Please specify the user.password";
        else if (data.password.length < 8) errors.password = "Password must contain at least 8 characters";
        else delete errors.password;
        if(!data.role) errors.role = "Please specify the user role";
        else delete errors.role;
        return errors;
    };

    useEffect(() =>{
        console.log(newUser);
        setErrors(validate(newUser));
    }, [newUser]);

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
                                alt="user"
                                width='150vw'
                                height='150vw'
                                style={{borderRadius: 3}}
                            />
                            <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon sx={{ color: theme.palette.primary[600] }}/>}
                            sx={{
                                bgcolor: theme.palette.secondary[300], mt: '1rem',
                                "&:hover": {
                                    backgroundColor: theme.palette.secondary[700],
                                }
                            }}
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
                            helperText={errors.name}
                            label="Name"
                            name="name"
                            onChange={handleInputChange}
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
                            helperText={errors.lastname}
                            label="Lastname"
                            name="lastname"
                            onChange={handleInputChange}
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
                            helperText={errors.email}
                            label="email"
                            name="email"
                            onChange={handleInputChange}
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
                                name="password"
                                value={newUser.password}
                                onChange={handleInputChange}
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
                            <Typography variant="caption" sx={{color:"#ffffffb3"}}>{errors.password}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <FormControl variant="standard" sx={{ width: '100%'  }}>
                                <InputLabel id="demo-simple-select-standard-label">Role*</InputLabel>
                                <Select
                                labelId="simple-select-standard"
                                id="simple-select-standard"
                                name="role"
                                value={newUser.role}
                                onChange={handleInputChange}
                                >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography variant="caption" sx={{color:"#ffffffb3"}}>{errors.role}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button 
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    bgcolor: theme.palette.secondary[300],
                    "&:hover": {
                        backgroundColor: theme.palette.secondary[700],
                    }
                }}
                >
                    <Typography sx={{ color: theme.palette.primary[600] }}>
                        Create user
                    </Typography>
                </Button>
                </CardActions>
            </Card>
            <Snackbar
                open={successAlert}
                autoHideDuration={2000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
            >
                <Alert
                onClose={handleAlertClose}
                severity="success"
                sx={{ width: "100%" }}
                >
                New user has been created!
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorAlert}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
            >
                <Alert
                onClose={handleAlertClose}
                severity="error"
                sx={{ width: "100%" }}
                >
                {errors.submit}
                </Alert>
            </Snackbar>
        </form>;
};

export default FormNewUser;
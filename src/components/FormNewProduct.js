import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useGetCategoriesQuery, useCreateProductMutation, useUploadPhotoMutation } from "state/api";
import image from "assets/default-image.jpg";

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

const FormNewProduct = () => {
    const [newProduct, setNewProduct] = useState({
        title:"",
        price: "",
        description:"",
        category:"",
        image :"",
        stock: ""
    });
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errors, setErrors] = useState({
        title:"",
        price: "",
        category:"",
        stock: ""
    });
    const {data:categories} = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const [uploadPhoto] = useUploadPhotoMutation();
    const theme = useTheme();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNGM2NTVlMTRiMzE0ODRhMWNhOGUiLCJpYXQiOjE3MDUwMDUzNjd9.gR7JcF7BYRl4bpqC4j3ATV0lP1-xrTb_7LZKqatxv5g";


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            //console.log(reader.result);
            setNewProduct({...newProduct, image: reader.result});
        };
        //reader.readAsDataURL(file);
        //console.log("file",file);

        const formDataPhoto = new FormData();
        file && formDataPhoto.append("photoData", file);
        formDataPhoto.append("name", file.name);

        const photoResponse = await uploadPhoto({formDataPhoto});
        //console.log("photo uploaded, id: ", photoResponse.data);
        //console.log("image:", `https://pf-15a.up.railway.app/api/photos/${photoResponse.data.id}`);
        setNewProduct({...newProduct, image: `https://pf-15a.up.railway.app/api/photos/${photoResponse.data.id}`});
      };

    const handleInputChange = (event) => {
        setNewProduct({...newProduct, [event.target.name]:event.target.value});
    };

    const validate = (data) =>{
        let errors = {}
        if(!data.title) errors.title = "Please specify the product name";
        else delete errors.title;
        if(!data.price) errors.price = "Please specify the product price";
        else delete errors.price;
        if(!data.category) errors.category = "Please specify the product category";
        else delete errors.category;
        if(!data.stock) errors.stock = "Please specify the product stock";
        else delete errors.stock;
        if(!data.image) errors.submit = "The product cannot be saved without an image, please upload one.";
        else delete errors.submit;
        return errors;
    };

    const handleSubmit = async(event) => {
        try {
            if(errors.submit) return setErrorAlert(true);
            if(Object.keys(errors).length > 0){
                setErrors({...errors, submit: "Please complete all required inputs"});
                return setErrorAlert(true);
            }
            const response = await createProduct({newProduct: newProduct, token:token});
            //console.log('response',response);
            if(response.error) throw new Error(response.data);
            setSuccessAlert(true);
            setNewProduct({
                title:"",
                price: '',
                description:"",
                category:"",
                image :"",
                stock: ''
            });
        } catch (error) {
            console.log("New product error",error);
            setErrors({...errors, submit: "Error while adding product"});
            setErrorAlert(true);
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccessAlert(false);
        setErrorAlert(false);
      };

    useEffect(()=>{
        console.log(newProduct);
        //console.log(errors);
        setErrors(validate(newProduct));
    }, [newProduct]);

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
                            sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'65%'}}
                        >
                            <img                            
                                src={newProduct.image ? newProduct.image : image}
                                alt="product"
                                width='100%'
                                height='65%'
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
                    rowSpacing={2}
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
                            helperText={errors.title}
                            label="Product name"
                            name="title"
                            onChange={handleInputChange}
                            required
                            value={newProduct.title}
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
                            label="Price"
                            name="price"
                            type="number"
                            helperText={errors.price}
                            onChange={handleInputChange}
                            required
                            value={newProduct.price}
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
                            label="Stock"
                            name="stock"
                            helperText={errors.stock}
                            onChange={handleInputChange}
                            required
                            type="number"
                            value={newProduct.stock}
                            variant="standard"
                            />
                        </Grid>
                        <Grid
                        item
                        xs={12}
                        md={6}
                        >
                        <FormControl variant="standard" sx={{ width: '100%'  }}>
                            <InputLabel id="demo-simple-select-standard-label">Category*</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            >
                            {categories?.map((category)=><MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Typography variant="caption" sx={{color:"#ffffffb3"}}>{errors.category}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
                        >
                            <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            value={newProduct.description}
                            variant="standard"
                            />
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
                        Save product
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
                The product has been added!
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

export default FormNewProduct;

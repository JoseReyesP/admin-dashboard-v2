import React, { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
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
        price: '',
        description:"",
        category:"",
        image :"",
        stock: ''
    });
    const theme = useTheme();
    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            console.log(reader.result);
            setNewProduct({...newProduct, image: reader.result});
        };
    
        reader.readAsDataURL(file);
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
                            sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'65%'}}
                        >
                            <img                            
                                src={newProduct.image ? newProduct.image : image}
                                alt="product image"
                                width='100%'
                                height='65%'
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
                            helperText="Please specify the product name"
                            label="Product name"
                            name="productName"
                            onChange={() =>{}}
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
                            onChange={() =>{}}
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
                            onChange={()=>{}}
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
                            <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            select
                            onChange={()=>{}}
                            required
                            value={newProduct.category}
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
                            label="Description"
                            name="description"
                            onChange={()=>{}}
                            required
                            multiline
                            rows={4}
                            value={newProduct.description}
                            variant="standard"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" sx={{bgcolor: theme.palette.secondary[300]}}>
                    <Typography sx={{ color: theme.palette.primary[600] }}>
                        Save product
                    </Typography>
                </Button>
                </CardActions>
            </Card>
        </form>;
};

export default FormNewProduct;

import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useGetCategoriesQuery, useCreateProductMutation } from "state/api";
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
    const {data:categories} = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const theme = useTheme();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxNGM2NTVlMTRiMzE0ODRhMWNhOGUiLCJpYXQiOjE3MDUwMDUzNjd9.gR7JcF7BYRl4bpqC4j3ATV0lP1-xrTb_7LZKqatxv5g";


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            console.log(reader.result);
            setNewProduct({...newProduct, image: reader.result});
        };
    
        reader.readAsDataURL(file);
      };

    const handleInputChange = (event) => {
        setNewProduct({...newProduct, [event.target.name]:event.target.value}, console.log(newProduct))
    };

    const handleSubmit = async(event) => {
        try {
            const response = await createProduct({newProduct: newProduct, token:token});
            console.log('response',response);
        } catch (error) {
            console.log(error);
        }
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
                                alt="product"
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
                            label="Age"
                            >
                            {categories?.map((category)=><MenuItem value={category._id}>{category.name}</MenuItem>)}
                            </Select>
                        </FormControl>
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
                            required
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
                <Button variant="contained" onClick={handleSubmit} sx={{bgcolor: theme.palette.secondary[300]}}>
                    <Typography sx={{ color: theme.palette.primary[600] }}>
                        Save product
                    </Typography>
                </Button>
                </CardActions>
            </Card>
        </form>;
};

export default FormNewProduct;

import { Box, Container, Grid, Stack } from "@mui/material";
import FormNewProduct from "components/FormNewProduct";
import Header from "components/Header";
import React from "react";


const CreateNewProduct = () => {
  return <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <div>
            <Header title="New Product"/>
          </div>
          <div>
            <Grid
              container
            >
              <Grid
                xs={10}
                md={12}
              >
              <FormNewProduct/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>;
};

export default CreateNewProduct;

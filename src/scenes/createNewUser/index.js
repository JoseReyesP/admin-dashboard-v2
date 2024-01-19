import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import FormNewUser from "components/FormNewUser";
import Header from "components/Header";

const CreateNewUser = ()=>{
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
            <Header title="New User"/>
          </div>
          <div>
            <Grid
              container
            >
              <Grid
                xs={10}
                md={10}
                lg={12}
              >
              <FormNewUser/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>;
};

export default CreateNewUser;
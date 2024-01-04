import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "state/api";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "components/Header";
import { useTheme } from "@mui/material";
import { Translate } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import ProductField from "components/ProductField";

const EditProducts = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      {data || !isLoading ? (
        <Box>
          <Header title={data.title} subtitle={data.category.name} />
          <Typography variant="h6" color={theme.palette.primary[400]}>
            {`ID: ${data.id}`}
          </Typography>
          <Box m="1.5rem 0rem 1.5rem 0rem" component="img" src={data.image} />
          <ProductField field="Title:" value={data.title} />
          <ProductField field="Price:" value={`$${data.price}`} />
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.secondary[600] }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Box>
  );
};

export default EditProducts;

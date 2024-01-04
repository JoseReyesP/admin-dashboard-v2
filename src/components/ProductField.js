import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const ProductField = (props) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[200]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {props.field}
      </Typography>
      <Typography
        variant="h4"
        color={theme.palette.secondary[100]}
        sx={{ mb: "5px", ml: "1rem" }}
      >
        {props.value}
      </Typography>
    </Box>
  );
};

export default ProductField;

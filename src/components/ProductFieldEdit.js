import React from "react";
import { Box, Typography, useTheme, Input } from "@mui/material";

const ProductFieldEdit = (props) => {
  const theme = useTheme();
  let keyValue = props.field.toLowerCase();
  keyValue = keyValue.slice(0, -1);
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[200]}
        fontWeight="bold"
        sx={{ mb: "5px", width: "140px" }}
      >
        {props.field}
      </Typography>
      <Input
        defaultValue={props.value}
        multiline="true"
        color="secondary"
        sx={{
          "& .MuiInput-colorSecondary": {
            borderBottom: `1px solid ${theme.palette.secondary[600]}`,
          },
          ml: "1.5rem",
          pl: "1rem",
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[200],
          fontWeight: "bold",
          width: "100%",
        }}
        onChange={props.handleUpdatedData(keyValue)}
      />
    </Box>
  );
};

export default ProductFieldEdit;

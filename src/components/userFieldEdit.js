import React from "react";
import { Box, Typography, useTheme, Input } from "@mui/material";

const UserFieldEdit = (props) => {
  const theme = useTheme();
  let keyValue = props.field.toLowerCase();
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[200]}
        fontWeight="bold"
        sx={{ mb: "5px", width: "160px", mr: "2rem" }}
      >
        {props.field}
      </Typography>
      <Input
        defaultValue={props.value}
        multiline={true}
        color="secondary"
        sx={{
          "& .MuiInput-colorSecondary": {
            borderBottom: `1px solid ${theme.palette.secondary[600]}`,
          },
          pl: "0.5rem",
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[200],
          fontWeight: "bold",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default UserFieldEdit;

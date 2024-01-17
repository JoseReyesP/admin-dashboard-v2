import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";

const CategoryEdit = (props) => {
  const theme = useTheme();
  const [category, setCategory] = useState(1);
  const handleUpdate = (event) => {
    props.handleUpdatedData("category")(event);
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="h4"
        color={theme.palette.secondary[200]}
        fontWeight="bold"
        sx={{ mb: "5px", width: "140px" }}
      >
        Category:
      </Typography>
      <FormControl variant="standard" sx={{ ml: "5px", minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleUpdate}
        >
          <MenuItem value={1}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"657122b7fe7c6097f5167de9"}>
            <Typography
              sx={{
                ml: "1rem",
                color: theme.palette.secondary[200],
                fontWeight: "bold",
              }}
            >
              Ropa Hombre
            </Typography>
          </MenuItem>
          <MenuItem value={"657122bcfe7c6097f5167ded"}>
            <Typography
              sx={{
                ml: "1rem",
                color: theme.palette.secondary[200],
                fontWeight: "bold",
              }}
            >
              Ropa Mujer
            </Typography>
          </MenuItem>
          <MenuItem value={"657122c5fe7c6097f5167df1"}>
            <Typography
              sx={{
                ml: "1rem",
                color: theme.palette.secondary[200],
                fontWeight: "bold",
              }}
            >
              Joyeria
            </Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryEdit;

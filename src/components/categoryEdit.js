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

const CategoryEdit = () => {
  const theme = useTheme();
  const [category, setCategory] = useState(1);
  const handleChange = ({ target }) => {
    setCategory(target.value);
    console.log("🚀 ~ handleChange ~ target:", target.value);
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
          onChange={handleChange}
        >
          <MenuItem value={1}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>
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
          <MenuItem value={20}>
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
          <MenuItem value={30}>
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

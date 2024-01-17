import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Switch,
  Divider,
  Chip,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material";
import Header from "components/Header";

const UserInfoDisplay = (props) => {
  const theme = useTheme();
  return (
    <Box>
      <Header title={props.name} subtitle={props.lastname} />

      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`ID: ${props._id}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Role: ${props.role}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Email: ${props.email}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Address: ${props.address}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Created: ${props.created}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Updated: ${props.updated}`}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary[100]}>
        {`Enabled: ${props.enabled}`}
      </Typography>
    </Box>
  );
};

export default UserInfoDisplay;

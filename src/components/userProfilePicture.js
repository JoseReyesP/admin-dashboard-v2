import React from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import VisuallyHiddenInput from "components/visuallyHiddenInput";

const UserProfilePicture = (props) => {
  const theme = useTheme();
  console.log("current image in UserProfilePicture", props.currentProfileImage);
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mr="1.5rem">
      <Box
        m="1.5rem"
        sx={{ width: "100px", height: "100px" }}
        component="img"
        src={props.currentProfileImage}
      />
      {props.isEditing ? (
        <Button
          sx={{
            backgroundColor: theme.palette.secondary[300],
            "&:hover": {
              backgroundColor: theme.palette.secondary[700],
            },
          }}
          component="label"
          variant="contained"
        >
          <VisuallyHiddenInput type="file" onChange={props.handleFileChange} />
          <Typography m="0.2rem" sx={{ color: theme.palette.primary[600] }}>
            Upload photo
          </Typography>
        </Button>
      ) : null}
    </Box>
  );
};

export default UserProfilePicture;

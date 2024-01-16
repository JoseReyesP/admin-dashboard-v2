import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import profileImage from "assets/profileImage.png";
import { useGetUserQuery } from "state/api";
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
import {
  EditNoteOutlined,
  SaveOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

const EditUsers = () => {
  // General declarations //////////////////////
  const theme = useTheme();
  const { id } = useParams();

  // Local states  ///////////////////////////////////////////////////////
  const [isEditing, setEditing] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState("");

  // RTK queries  ///////////////////////////////////////////////////////
  const { data: userData, isLoading: isUserDataLoading } = useGetUserQuery(id);

  // useEffects  ///////////////////////////////////////////////////////
  useEffect(() => {
    userData && console.log("🚀 ~ useEffect ~ userData:", userData);
  }, [userData]);
  // Handle functions  //////////////////////////////////////////////////////
  const handleSaveChanges = () => {};
  const handleEdit = () => {};

  return (
    <Box m="1.5rem 2.5rem">
      {userData || !isUserDataLoading ? (
        <Box>
          <Header title={userData.name} subtitle={userData.lastname} />
          <FlexBetween>
            <Box>
              <Typography variant="h6" color={theme.palette.secondary[100]}>
                {`ID: ${userData._id}`}
              </Typography>
              <Typography variant="h6" color={theme.palette.secondary[100]}>
                {`Role: ${userData.role}`}
              </Typography>
              <Typography variant="h6" color={theme.palette.secondary[100]}>
                {`Email: ${userData.email}`}
              </Typography>
              <Typography variant="h6" color={theme.palette.secondary[100]}>
                {`Address: ${userData.address}`}
              </Typography>
            </Box>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary[300],
                "&:hover": { backgroundColor: theme.palette.secondary[700] },
              }}
              onClick={isEditing ? handleSaveChanges : handleEdit}
              disabled={isUpdating}
            >
              <Typography m="0.2rem" sx={{ color: theme.palette.primary[600] }}>
                {isEditing ? "Save Changes" : "Edit"}
              </Typography>
              {isEditing ? (
                isUpdating ? (
                  <CircularProgress />
                ) : (
                  <SaveOutlined
                    sx={{
                      color: theme.palette.primary[600],
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[700],
                      },
                    }}
                  />
                )
              ) : (
                <EditNoteOutlined
                  sx={{
                    color: theme.palette.primary[600],
                    "&:hover": {
                      backgroundColor: theme.palette.secondary[700],
                    },
                  }}
                />
              )}
            </Button>
          </FlexBetween>
        </Box>
      ) : null}
    </Box>
  );
};

export default EditUsers;

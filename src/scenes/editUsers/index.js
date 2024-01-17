import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
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
import UserProfilePicture from "components/userProfilePicture";
import UserFieldEdit from "components/userFieldEdit";
import UserInfoDisplay from "components/userInfoDisplay";

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
  const handleSaveChanges = () => {
    setEditing(false);
  };
  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {userData || !isUserDataLoading ? (
        <Box>
          <FlexBetween>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              {/* Profile Image */}
              <UserProfilePicture isEditing={isEditing} />
              {/* User General Info */}
              {!isEditing ? (
                <UserInfoDisplay
                  name={userData.name}
                  lastname={userData.lastname}
                  _id={userData._id}
                  role={userData.role}
                  email={userData.email}
                  address={userData.address}
                />
              ) : (
                <Box>
                  <UserFieldEdit field={"Name:"} value={userData.name} />
                  <UserFieldEdit
                    field={"Lastname:"}
                    value={userData.lastname}
                  />
                  <UserFieldEdit field={"Role:"} value={userData.role} />
                  <UserFieldEdit field={"Email:"} value={userData.email} />
                  <UserFieldEdit field={"Address:"} value={userData.address} />
                </Box>
              )}
            </Box>
            {/* Edit / Save changes button  */}
            <Box>
              <Button
                sx={{
                  backgroundColor: theme.palette.secondary[300],
                  "&:hover": { backgroundColor: theme.palette.secondary[700] },
                }}
                onClick={isEditing ? handleSaveChanges : handleEdit}
                disabled={isUpdating}
              >
                <Typography
                  m="0.2rem"
                  sx={{ color: theme.palette.primary[600] }}
                >
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
            </Box>
          </FlexBetween>
          <Divider
            orientation="horizontal"
            flexItem
            textAlign="center"
            sx={{ mt: "2rem", borderColor: theme.palette.background.alt }}
          >
            <Chip
              label={
                <Typography
                  variant="h4"
                  color={theme.palette.secondary[200]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Purchase History
                </Typography>
              }
              variant="outline"
              sx={{ backgroundColor: theme.palette.background.alt }}
            />
          </Divider>
          <Divider
            orientation="horizontal"
            flexItem
            textAlign="center"
            sx={{ mt: "2rem", borderColor: theme.palette.background.alt }}
          >
            <Chip
              label={
                <Typography
                  variant="h4"
                  color={theme.palette.secondary[200]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Shopping Cart
                </Typography>
              }
              variant="outline"
              sx={{ backgroundColor: theme.palette.background.alt }}
            />
          </Divider>
        </Box>
      ) : null}
    </Box>
  );
};

export default EditUsers;

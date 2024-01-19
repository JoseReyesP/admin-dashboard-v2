import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import {
  useGetUserQuery,
  usePostNewPhotoMutation,
  useUpdateUserMutation,
} from "state/api";
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
  SecurityUpdate,
} from "@mui/icons-material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import UserProfilePicture from "components/userProfilePicture";
import UserFieldEdit from "components/userFieldEdit";
import UserInfoDisplay from "components/userInfoDisplay";
import defaultprofile from "assets/profileImage.png";

const formDataUser = new FormData();
const formDataPhoto = new FormData();

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
  const [postNewPhoto] = usePostNewPhotoMutation();
  const [updateUser] = useUpdateUserMutation();

  // useEffects  ///////////////////////////////////////////////////////
  useEffect(() => {
    if (userData) {
      console.log("🚀 ~ useEffect ~ userData:", userData);
      Object.entries(userData).map(([key, value]) => {
        formDataUser.has(key)
          ? formDataUser.set(key, value)
          : formDataUser.append(key, value);
      });
      //console.log('user image',userData.image);
      if (userData.image == "no profile picture")
        setCurrentProfileImage(defaultprofile);
      else setCurrentProfileImage(userData.image);
    }
    console.log("🚀 ~ formDataUser:", formDataUser);
  }, [userData, isUserDataLoading]);

  useEffect(() => {
    if (selectedFile) {
      setCurrentProfileImage(URL.createObjectURL(selectedFile));
      formDataPhoto.has("name")
        ? formDataPhoto.set("name", selectedFile.name)
        : formDataPhoto.append("name", selectedFile.name);
      formDataPhoto.has("photoData")
        ? formDataPhoto.set("photoData", selectedFile)
        : formDataPhoto.append("photoData", selectedFile);
    }
    console.log("🚀 ~ useEffect ~ formDataPhoto:", formDataPhoto);
  }, [selectedFile]);

  // Handle functions  //////////////////////////////////////////////////////

  const handleSaveChanges = async () => {
    setUpdating(true);
    if (selectedFile) {
      const photoResponse = await postNewPhoto(formDataPhoto);
      const photoURL = `https://pf-15a.up.railway.app/api/photos/${photoResponse.data.id}`;
      formDataUser.set("image", photoURL);
      console.log("🚀 ~ handleSaveChanges ~ photoURL:", photoURL);
      console.log("🚀 ~ handleSaveChanges ~ formDataUser:", formDataUser);
    }
    try {
      await updateUser(formDataUser);
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
    setEditing(false);
  };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleUpdatedData =
    (key) =>
    ({ target }) => {
      const value = target.value;
      console.log("🚀 ~ handleUpdatedData ~ value:", value);
      console.log("🚀 ~ handleUpdatedData ~ key:", key);
      if (formDataUser.has(key)) {
        formDataUser.set(key, value);
      } else {
        formDataUser.append(key, value);
      }
      console.log("🚀 ~ EditProducts ~ formDataProduct:", formDataUser);
    };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {userData || !isUserDataLoading ? (
        <Box>
          <FlexBetween>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              {/* Profile Image */}
              <UserProfilePicture
                isEditing={isEditing}
                handleFileChange={handleFileChange}
                currentProfileImage={currentProfileImage}
              />
              {/* User General Info */}
              {!isEditing ? (
                <UserInfoDisplay
                  name={userData.name}
                  lastname={userData.lastname}
                  _id={userData._id}
                  role={userData.role}
                  email={userData.email}
                  address={userData.address}
                  created={userData.created}
                  updated={userData.updated}
                  enabled={userData.isDeleted}
                />
              ) : (
                <Box>
                  <UserFieldEdit
                    field={"Name"}
                    value={userData.name}
                    handleUpdatedData={handleUpdatedData}
                  />
                  <UserFieldEdit
                    field={"Lastname"}
                    value={userData.lastname}
                    handleUpdatedData={handleUpdatedData}
                  />
                  <UserFieldEdit
                    field={"Role"}
                    value={userData.role}
                    handleUpdatedData={handleUpdatedData}
                  />
                  <UserFieldEdit
                    field={"Email"}
                    value={userData.email}
                    handleUpdatedData={handleUpdatedData}
                  />
                  <UserFieldEdit
                    field={"Address"}
                    value={userData.address}
                    handleUpdatedData={handleUpdatedData}
                  />
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

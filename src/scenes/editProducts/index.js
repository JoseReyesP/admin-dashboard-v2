import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUpdateReviewMutation,
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
import Header from "components/Header";
import { useTheme } from "@mui/material";
import {
  EditNoteOutlined,
  SaveOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import ProductField from "components/ProductField";
import ProductFieldEdit from "components/ProductFieldEdit";
import CategoryEdit from "components/categoryEdit";
import VisuallyHiddenInput from "components/visuallyHiddenInput";

const EditProducts = () => {
  //general declarations
  const theme = useTheme();
  const { id } = useParams();
  //Local states
  const [isEditing, setEditing] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentProductImage, setCurrentProductImage] = useState("");
  // RTK queries
  const { data: productData, isLoading: isProductLoading } =
    useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [updateReview] = useUpdateReviewMutation();

  // useEffects
  useEffect(() => {
    if (productData) {
      setUpdatedData(productData);
      setCurrentProductImage(productData.image);
    }
  }, [productData, isProductLoading]);

  useEffect(() => {
    selectedFile && setCurrentProductImage(URL.createObjectURL(selectedFile));
  }, [selectedFile]);

  //Handle functions
  const handleUpdatedData =
    (key) =>
    ({ target }) => {
      // this function will be used by different components to add the new data
      const value = target.value;
      setUpdatedData((prevState) => {
        const updatedState = { ...prevState };
        updatedState[key] = value;
        return updatedState;
      });
    };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSaveChanges = async () => {
    setUpdating(true);
    try {
      const config = { id: id, updatedData: updatedData };
      await updateProduct(config);
      setSuccessAlert(true);
    } catch (error) {
      setErrorAlert(true);
      console.log(error);
    }
    setUpdating(false);
    setEditing(false);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  const handleSwitchChange = (switchId) => () => {
    const deltedStatus = updatedData.reviews.filter((r) => r._id === switchId);
    console.log("🚀 ~ handleSwitchChange ~ deltedStatus:", deltedStatus);

    // updateReview()
  };

  const handleFileChange = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  return (
    <Box m="1.5rem 2.5rem">
      {productData || !isProductLoading ? (
        <Box>
          <Header
            title={productData.title}
            subtitle={productData.category.name}
          />
          <FlexBetween>
            <Typography variant="h6" color={theme.palette.secondary[100]}>
              {`ID: ${productData.id}`}
            </Typography>

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
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box
              m="1.5rem 0rem 1.5rem 0rem"
              sx={{ width: "200px", heigth: "200px" }}
              component="img"
              src={currentProductImage}
            />
            {isEditing ? (
              <Button
                sx={{
                  backgroundColor: theme.palette.secondary[300],
                  "&:hover": { backgroundColor: theme.palette.secondary[700] },
                  height: "auto",
                  width: "auto",
                  m: "1.5rem 0rem 1.5rem 1rem",
                }}
                disabled={isUpdating}
                component="label"
                variant="contained"
              >
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                <Typography
                  m="0.2rem"
                  sx={{ color: theme.palette.primary[600] }}
                >
                  Upload new photo
                </Typography>
                {isUpdating ? (
                  <CircularProgress />
                ) : (
                  <FileUploadOutlined
                    sx={{ color: theme.palette.primary[600] }}
                  />
                )}
              </Button>
            ) : null}
          </Box>

          {!isEditing ? (
            <>
              <ProductField field="Title:" value={productData.title} />
              <ProductField field="Price:" value={`$${productData.price}`} />
              <ProductField
                field="Category:"
                value={productData.category.name}
              />
              <ProductField
                field="Stock:"
                value={`${productData.stock} units`}
              />
              <ProductField
                field="Description:"
                value={productData.description}
              />
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
                      Reviews
                    </Typography>
                  }
                  variant="outline"
                  sx={{ backgroundColor: theme.palette.background.alt }}
                />
              </Divider>
            </>
          ) : (
            <>
              <ProductFieldEdit
                field="Title:"
                value={productData.title}
                handleUpdatedData={handleUpdatedData}
              />
              <ProductFieldEdit
                field="Price:"
                value={`$${productData.price}`}
                handleUpdatedData={handleUpdatedData}
              />
              <CategoryEdit handleUpdatedData={handleUpdatedData} />
              <ProductFieldEdit
                field="Stock:"
                value={`${productData.stock} units`}
                handleUpdatedData={handleUpdatedData}
              />
              <ProductFieldEdit
                field="Description:"
                value={productData.description}
                handleUpdatedData={handleUpdatedData}
              />
              <Divider
                orientation="horizontal"
                flexItem
                textAlign="center"
                sx={{ mt: "2rem" }}
              >
                <Chip
                  label={
                    <Typography
                      variant="h4"
                      color={theme.palette.secondary[200]}
                      fontWeight="bold"
                      sx={{ mb: "5px" }}
                    >
                      Reviews
                    </Typography>
                  }
                  variant="outline"
                  sx={{ backgroundColor: theme.palette.background.alt }}
                />
              </Divider>
            </>
          )}
          <List dense={true}>
            {productData.reviews.map((r) => (
              <ListItem key={r._id}>
                <ListItemIcon>
                  <Rating
                    value={r.rating}
                    sx={{
                      margin: "0.5rem 1rem 0rem",
                      color: theme.palette.secondary[400],
                    }}
                    readOnly
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ margin: "0.5rem 1rem 0rem" }}
                  primary={
                    <Typography
                      variant="h4"
                      color={theme.palette.secondary[200]}
                      fontWeight="bold"
                    >
                      {r.user.name} {r.user.lastname}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="p"
                      color={theme.palette.secondary[100]}
                    >
                      {r.comment}
                    </Typography>
                  }
                />
                {isEditing ? (
                  <Switch
                    checked={r.isDeleted}
                    onChange={handleSwitchChange(r._id)}
                  />
                ) : null}
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.secondary[600] }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          The product has been updated!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error while updating product!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProducts;

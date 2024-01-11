import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetReviewQuery,
  useUpdateProductMutation,
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
import Review from "components/Review";
import CategoryEdit from "components/categoryEdit";

const EditProducts = () => {
  const theme = useTheme();
  const [isEditing, setEditing] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const { id } = useParams();
  const { data: productData, isLoading: isProductLoading } =
    useGetProductQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setUpdatedData(productData);
    }
    console.log("🚀 ~ useEffect ~ productData:", productData);
  }, [productData, isProductLoading]);

  useEffect(() => {
    console.log("🚀 ~ EditProducts ~ updatedData:", updatedData);
  }, [updatedData]);

  console.log("🚀 ~ EditProducts ~ updateProduct:", updateProduct);
  const handleUpdatedData =
    (key) =>
    ({ target }) => {
      // this function will be used by components to add the new data
      const value = target.value;
      setUpdatedData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSaveChanges = async ({ id: productId, updatedData }) => {
    setUpdating(true);
    try {
      const result = await updateProduct(productId, updatedData);
      console.log("🚀 ~ handleSaveChanges ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ handleSaveChanges ~ error:", error);
    }
    setUpdating(false);
    setEditing(false);
  };
  const handleAlertClose = (event, reason) => {};

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
              sx={{ backgroundColor: theme.palette.secondary[300] }}
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
                  <SaveOutlined sx={{ color: theme.palette.primary[600] }} />
                )
              ) : (
                <EditNoteOutlined sx={{ color: theme.palette.primary[600] }} />
              )}
            </Button>
          </FlexBetween>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box
              m="1.5rem 0rem 1.5rem 0rem"
              sx={{ width: "200px", heigth: "200px" }}
              component="img"
              src={productData.image}
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
                onClick={""}
                disabled={isUpdating}
              >
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
                textAlign="left"
                sx={{ mt: "2rem", borderColor: theme.palette.background.alt }}
              >
                <Chip
                  label={
                    <ProductField field="Reviews:" variant="middle" value="" />
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
                textAlign="left"
                sx={{ mt: "2rem" }}
              >
                <Chip
                  label={
                    <ProductField field="Reviews:" variant="middle" value="" />
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
                    sx={{ margin: "0.5rem 1rem 0rem" }}
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
                {isEditing ? <Switch checked={r.isDeleted} /> : null}
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.secondary[600] }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Snackbar open={false} autoHideDuration={5000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          The product has been updated!
        </Alert>
      </Snackbar>
      <Snackbar open={false} autoHideDuration={5000} onClose={handleAlertClose}>
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

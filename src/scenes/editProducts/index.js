import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetReviewQuery } from "state/api";
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

const EditProducts = () => {
  const { id } = useParams();
  // const reviewId = "";
  const { data: productData, isLoading: isProductLoading } =
    useGetProductQuery(id);
  // const {
  //   data: dataReview,
  //   isLoading: isReviewLoading,
  //   refetch: refetchReview,
  // } = useGetReviewQuery(reviewId, {
  //   skip: true,
  // });
  const theme = useTheme();
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSaveChanges = () => {
    setEditing(false);
  };
  // const getProductReviews = (id) => {
  //   refetchReview(id);
  // };
  // useEffect(() => {
  //   if (!isProductLoading && productData) {
  //     console.log(productData.reviews);
  //   }
  // }, [isProductLoading, productData]);
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
              sx={{ backgroundColor: theme.palette.secondary[500] }}
              onClick={isEditing ? handleSaveChanges : handleEdit}
            >
              <Typography m="0.2rem" sx={{ color: theme.palette.primary[500] }}>
                {isEditing ? "Save Changes" : "Edit"}
              </Typography>
              {isEditing ? (
                <SaveOutlined sx={{ color: theme.palette.primary[500] }} />
              ) : (
                <EditNoteOutlined sx={{ color: theme.palette.primary[500] }} />
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
                  backgroundColor: theme.palette.secondary[500],
                  "&:hover": { backgroundColor: theme.palette.secondary[700] },
                  height: "auto",
                  width: "auto",
                  m: "1.5rem 0rem 1.5rem 1rem",
                }}
                onClick={""}
              >
                <Typography
                  m="0.2rem"
                  sx={{ color: theme.palette.primary[500] }}
                >
                  Upload new photo
                </Typography>
                <FileUploadOutlined
                  sx={{ color: theme.palette.primary[500] }}
                />
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
              <ProductField field="Reviews:" value="" />{" "}
            </>
          ) : (
            <>
              <ProductFieldEdit field="Title:" value={productData.title} />
              <ProductFieldEdit
                field="Price:"
                value={`$${productData.price}`}
              />
              <ProductFieldEdit
                field="Category:"
                value={productData.category.name}
              />
              <ProductFieldEdit
                field="Stock:"
                value={`${productData.stock} units`}
              />
              <ProductFieldEdit
                field="Description:"
                value={productData.description}
              />
              <ProductField field="Reviews:" value="" />{" "}
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
                {isEditing ? <Switch /> : null}
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box sx={{ color: theme.palette.secondary[600] }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Box>
  );
};

export default EditProducts;

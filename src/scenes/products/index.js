import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import ProductsTable from "components/ProductsTable";

const Product = ({
  _id,
  title,
  description,
  price,
  category,
  stock,
  averageRating,
  image,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category.name}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={averageRating} readOnly />
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See more
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <CardContent>
            <Typography>id: {_id}</Typography>
            <Typography>stock: {stock}</Typography>
            <Typography>image URL: {image}</Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <ProductsTable />
      <Header title="PRODUCTS" subtitle="See here your products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              title,
              description,
              price,
              category,
              stock,
              averageRating,
              image,
            }) => (
              <Product
                key={_id}
                _id={_id}
                title={title}
                description={description}
                price={price}
                category={category}
                stock={stock}
                averageRating={averageRating}
                image={image}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;

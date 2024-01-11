import React from "react";
import { Box, Button, useTheme, Rating, Switch } from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  const navigate = useNavigate();
  console.log("🚀 ~ file: index.js:10 ~ Users ~ data:", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
      renderCell: (params) => params.value.name,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.5,
    },
    {
      field: "averageRating",
      headerName: "Rating",
      flex: 1,
      renderCell: (params) => <Rating value={params.value} readOnly />,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.7,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditOutlined />}
          onClick={() => {
            navigate(`/editProducts/${params.id}`);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteForeverOutlined />}
          onClick={() => console.log("estos son los params:", params)}
          label="Delete"
        />,
        <Switch
          checked={params.row.isDeleted}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: theme.palette.background.alt,
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: theme.palette.background.alt,
            },
          }}
        />,
      ],
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="List of Products" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            boderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default ProductsList;

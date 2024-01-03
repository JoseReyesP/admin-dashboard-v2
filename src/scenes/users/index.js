import React from "react";
import { Box, Button, useTheme, Switch } from "@mui/material";
import { useGetUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  const navigate = useNavigate();
  console.log("🚀 ~ file: index.js:10 ~ Users ~ data:", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "created",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.7,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditOutlined />}
          onClick={() => navigate("/editUsers")}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={<DeleteForeverOutlined />}
          onClick={() => console.log(params.id)}
          label="Delete"
        />,
        <Switch
          sx={{
            "& .Mui-checked": {
              color: theme.palette.primary[500],
            },
          }}
        />,
      ],
    },
    // {
    //   field: "phoneNumber",
    //   headerName: "Phone Number",
    //   flex: 0.5,
    //   renderCell: (params) => {
    //     return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    //   },
    // }, this field is to show that formating is possible inside datagrid, providing a layer of personalization
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USERS " subtitle="List of Users" />
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

export default Users;

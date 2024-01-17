import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import ProductsList from "scenes/productsList";
import Users from "scenes/users";
import CreateNewProduct from "scenes/createNewProduct";
import EditProducts from "scenes/editProducts";
import EditUsers from "scenes/editUsers";
import LogIn from "scenes/login";
import CreateNewUser from "scenes/createNewUser";

function App() {
  document.title = "Henrucci Admin";
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/users" element={<Users />} />
              <Route path="/editUsers/:id" element={<EditUsers />} />
              <Route path="/editProducts/:id" element={<EditProducts />} />
              <Route path="/newProduct" element={<CreateNewProduct />} />
              <Route path="/newUser" element={<CreateNewUser />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

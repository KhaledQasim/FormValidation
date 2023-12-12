import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "../dist/output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Form from "./components/Form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/form" element={<Form />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

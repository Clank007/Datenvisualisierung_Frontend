import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Admin from "./layouts/Admin.js";
import Login from './layouts/Login.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      {/* <Route path="/admin/dashboard/*" element={<Admin />} />
      <Route path="/admin/dashboard2/*" element={<Admin />} />
      <Route path="/admin/dashboard3/*" element={<Admin />} /> */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

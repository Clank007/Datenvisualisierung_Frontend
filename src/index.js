import ReactDOM from 'react-dom/client';
import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Admin from "./layouts/Admin.js";
import Login from './layouts/Login.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/admin" element={<Navigate to="/admin/kennzahlen" />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

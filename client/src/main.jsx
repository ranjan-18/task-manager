import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";

registerIntercepts();
setAuthHeaders();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-left" />
  </StrictMode>,
)

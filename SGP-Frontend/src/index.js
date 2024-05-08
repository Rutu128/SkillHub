
import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <App />
    <ToastContainer
      position="bottom-right"
      theme="dark"
      />
      </PrimeReactProvider>
   
  </React.StrictMode>
);
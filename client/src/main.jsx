import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { StrictMode } from "react";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import AddBook from "./pages/AddBook.jsx";
import MembarShip from "./pages/MembarShip.jsx";
import Cart from "./pages/Cart.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
   <Routes>
        <Route element={<App />} >
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/membership" element={<MembarShip />} />
        <Route path="/eBook" element={<div>eBook</div>} />

        <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
  </BrowserRouter>
  </StrictMode>
);

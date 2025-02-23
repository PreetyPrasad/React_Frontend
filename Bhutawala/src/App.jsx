import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";
import Category from "./Admin/Category";
import Material from "./Admin/Material";
import CreditNote from "./Admin/CreditNote";
import SalesReturn from "./Admin/SalesReturn";

import Demo from "./Demo";
import Supplier from "./Admin/Supplier";


// Create Context Inside App.jsx
export const LoadingContext = createContext();

function App() {
  const [loading, setLoading] = useState(false); // Global loading state

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo Component={<Category />} />} />
          <Route path="/Material" element={<Demo Component={<Material />} />} />
          <Route path="/Supplier" element={<Demo Component={<Supplier />} />} />
          <Route path="/CreditNote" element={<CreditNote />} />
          <Route path="/SalesReturn" element={<SalesReturn />} />
          

          
        </Routes>
      </BrowserRouter>
    </LoadingContext.Provider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";
import Category from "./Admin/Category";
import Material from "./Admin/Material";
import CreditNote from "./Admin/CreditNote";
import SalesReturn from "./Admin/SalesReturn";
import Demo from "./Demo";
import Supplier from "./Admin/Supplier";
import TransactionYearMaster from "./Admin/TransactionYearMaster";
import PurchaseMaster from "./Admin/PurchaseMaster";
import StaffMaster from "./Admin/StaffMaster";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import InvoiceMaster from "./Admin/InvoiceMaster";
import InwordStock from "./Admin/InwordStock";
import PurchaseReturn from "./Admin/PurchaseReturn";
import InvoiceDetail from "./Admin/InvoiceDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Category" element={<Demo Component={<Category />} />} />
        <Route path="/Material" element={<Demo Component={<Material />} />} />
        <Route path="/TransactionYearMaster" element={<Demo Component={<TransactionYearMaster />} />} />
        <Route path="/Supplier" element={<Demo Component={<Supplier />} />} />
        <Route path="/PurchaseMaster" element={<Demo Component={<PurchaseMaster />} />} />
        <Route path="/StaffMaster" element={<Demo Component={<StaffMaster />} />} />
        <Route path="/" element={<Demo Component={<InvoiceMaster />} />} />
        <Route path="/InwordStock" element={<Demo Component={<InwordStock />} />} />
        <Route path="/PurchaseReturn" element={<Demo Component={<PurchaseReturn />} />} />
        <Route path="/InvoiceDetail" element={<Demo Component={<InvoiceDetail />} />} />
        <Route path="/SalesReturn" element={<SalesReturn />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

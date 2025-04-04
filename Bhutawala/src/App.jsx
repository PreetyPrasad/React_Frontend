import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { createContext, useState } from "react";
import Category from "./Admin/Category";
import Material from "./Admin/Material";
import Demo from "./Demo";
import Supplier from "./Admin/Supplier";
import TransactionYearMaster from "./Admin/TransactionYearMaster";
import PurchaseMaster from "./Admin/PurchaseMaster";
import StaffMaster from "./Admin/StaffMaster";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import InvoiceMaster from "./Admin/InvoiceMaster";
import PurchaseReturn from "./Admin/PurchaseReturn";
// import InvoiceDetail from "./Admin/InvoiceDetail";
import PurchasePayment from "./Admin/PurchasePayment";
import 'primeicons/primeicons.css';
import PurchaseDetails from "./Admin/Details/PurchaseDetails";
import OutwordMaster from "./Admin/OutwordMaster";
import LogIn from "./Admin/LogIn";
import ResetPassword from "./Admin/ResetPassword";
import InwardStock from "./Admin/InwordStock";
import LogOut from "./Admin/LogOut";
import CreatePassword from "./Admin/CreatePassword";
import ForgetPassword from "./Admin/ForgetPassword";
import Profile from "./Admin/Profile";
import OutwordItem from "./Admin/OutwordItem";
import Dashboard from "./Admin/Dashboard";

import "./Admin/Style.css";

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
        <Route path="/InvoiceMaster" element={<Demo Component={<InvoiceMaster />} />} />
        <Route path="/PurchaseReturn" element={<Demo Component={<PurchaseReturn />} />} />
        {/* <Route path="/InvoiceDetail" element={<Demo Component={<InvoiceDetail />} />} /> */}
        <Route path="/PurchasePayment" element={<Demo Component={<PurchasePayment />} />} />
        <Route path="/Purchase/Details/:id" element={<Demo Component={<PurchaseDetails />} />} />
        <Route path="/InwardStock" element={[<InwardStock />]} />
        <Route path="/OutwordMaster" element={<Demo Component={<OutwordMaster />} />} />
        <Route path="/OutwordItem" element={<Demo Component={<OutwordItem />} />} />
        <Route path="/" element={[<LogIn />]} />
        <Route path="/ResetPassword" element={[<ResetPassword />]} />
        <Route path="/LogOut" element={[<LogOut />]} />
        <Route path="/CreatePassword" element={[<CreatePassword />]} />
        <Route path="/ForgetPassword" element={[<ForgetPassword />]} />
        <Route path="/Profile" element={[<Demo Component={<Profile />} />]} />
        <Route path="/Dashboard" element={[<Demo Component={<Dashboard />} />]} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

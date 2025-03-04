import React from 'react'
import { NavLink } from "react-router-dom";
export default function Purchsesearch() {
  return (
    <div>
      <NavLink
        to={`/PurchasePayment?purchaseId=${PurchaseId}`}
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Payment Details
      </NavLink>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PaymentPopup from "./Popups/PaymentPopup";

export default function PurchasePayment({ purchaseId }) {
  const [show, setShow] = useState(false);
  const [purchasePayments, setPurchasePayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [PaymentId, setPaymentId] = useState(0);
  const [error, setError] = useState(null);
  const [initialValue, setInitialValue] = useState({
    PurchaseId: purchaseId,
    Amount: "",
    PaymentMode: "",
    RefNo: "",
  });
  const fetchPurchasePayments = async () => {
    if (!purchaseId) return;
    setLoading(true);
    setError(null);
    try {
      const paymentResponse = await getData(`PurchasePayment/PurchasePayments/${purchaseId}`);
      if (paymentResponse.status.toUpperCase() === "OK") {
        setPurchasePayments(paymentResponse.result);
      } else {
        setError("No payment records found.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Payment records not found for this Purchase ID.");
      } else {
        setError("Failed to fetch payment details.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasePayments();
  }, [purchaseId]);

  const openPopup = () => {
    setShow(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-"; const date = new Date(dateString); if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="container-fluid">
      <button className="btn btn-primary" onClick={openPopup}> Add Payment</button>
      <div className="col-md-12 mb-2">
        <PaymentPopup fetchPurchasePayments={fetchPurchasePayments} PaymentId={PaymentId} setPaymentId={setPaymentId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : purchasePayments.length === 0 ? (
        <p className="text-muted text-center">No payment records found.</p>
      ) : (
        <DataTable value={purchasePayments}>
          <Column field="paymentId" header="#" />
          <Column field="amount" header="Amount" />
          <Column field="paymentMode" header="Payment Mode" />
          <Column field="refNo" header="Reference No" />
          <Column field="paymentDate" header="Payment Date" body={(rowData) => formatDate(rowData.paymentDate)} />
        </DataTable>
      )}
    </div>
  );
}

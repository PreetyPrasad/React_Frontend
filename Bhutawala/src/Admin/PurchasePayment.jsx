import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PaymentPopup from "./Popups/PaymentPopup";
import PurchaseDetails from "./Details/PurchaseDetails";
export default function PurchasePayment({ purchaseId, fetchPaymentDetails, remainingAmount }) {
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
      setError("Failed to fetch payment details.");
      console.error("Error fetching payments:", error);
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
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };

  const deletePurchasePayment = async (purchaseId) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setLoading(true);
        const response = await getData(`PurchasePayment/Remove/${purchaseId}`);
        if (response.status === "OK") {
          fetchPurchasePayments();
          fetchPaymentDetails();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error deleting payment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteTemplate = (payment) => {
    return <i onClick={() => deletePurchasePayment(payment.purchaseId)} className="fas fa-trash text-danger"></i>;
  };

  return (
    <div className="container-fluid">
      <button onClick={openPopup} className="open-modal-btn">Add Payment</button>
      <div className="col-md-12 mb-2">
        <PaymentPopup
          fetchPurchasePayments={fetchPurchasePayments} PaymentId={PaymentId} setPaymentId={setPaymentId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} fetchPaymentDetails={fetchPaymentDetails} remain={remainingAmount}
        />
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
        <DataTable value={purchasePayments} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
          <Column field="amount" header="Amount" sortable />
          <Column field="paymentMode" header="Payment Mode" />
          <Column field="refNo" header="Reference No" />
          <Column field="paymentDate" header="Payment Date" body={(rowData) => formatDate(rowData.paymentDate)} />
          <Column body={deleteTemplate} header="Actions" />
        </DataTable>
      )}
    </div>
  );
}

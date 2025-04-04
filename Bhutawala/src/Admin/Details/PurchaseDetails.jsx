import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../API";
import PurchasePayment from "../PurchasePayment";
import InwardStock from "../InwordStock";
import { FileText, CreditCard, Package } from "lucide-react";
export default function PurchaseDetails() {
  const { id } = useParams();
  const [purchaseDetail, setPurchaseDetail] = useState(null);
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [inwardStock, setInwardStock] = useState([]);

  const fetchPurchaseDetail = async (id) => {
    try {
      const purchaseResponse = await getData(`PurchaseMaster/Details/${id}`);
      if (purchaseResponse.status.toUpperCase() === "OK") {
        const purchaseDetail = purchaseResponse.result;
        setPurchaseDetail(purchaseDetail);
        fetchPaymentDetails(purchaseDetail.purchaseId);
      } else {
        console.error("Error fetching purchase details");
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchInwardDetails = async (purchaseId) => {
    if (!purchaseId) return;
    try {
      const response = await getData(`InwardStock/Details/${purchaseId}`);
      if (response.status === "OK" && response.result) {
        setInwardStock(response.result);
      } else {
        setInwardStock([]);
      }
    } catch (error) {
      console.error("Error fetching inward stock details:",
        error);
    }
  };

  const fetchPaymentDetails = async (purchaseId) => {
    if (!purchaseId) return;
    try {
      const paymentResponse = await getData(`PurchasePayment/PurchasePayments/${purchaseId}`);
      if (paymentResponse.status === "OK" && paymentResponse.result) {
        const totalPaidAmount = paymentResponse.result.reduce((sum, payment) => sum + payment.amount, 0);
        setTotalPaid(totalPaidAmount);
      } else {
        setTotalPaid(0);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setInterval(() => {
        fetchPurchaseDetail(id);
      }, 2000);
    }
  }, [id]);

  useEffect(() => {
    if (purchaseDetail?.purchaseId) {
      fetchInwardDetails(purchaseDetail.purchaseId);
    }
  }, [purchaseDetail]);



  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!purchaseDetail) return <p className="text-center">Purchase details not found.</p>;
  const remainingAmount = (purchaseDetail.gst + purchaseDetail.grossTotal) - totalPaid;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Purchase Master</h1>
          <p>Remaining: <b>₹ {remainingAmount.toLocaleString('en-IN')}</b></p>
        </div>
        <div className="card">
          <div className="row">
            <div className="card-header p-0 border-bottom-0">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link d-flex align-items-center gap-2 ${activeTab === "details" ? "active fw-bold" : ""}`}
                    onClick={() => setActiveTab("details")}
                    style={{ color: activeTab === "details" ? "#0056b3" : "#007bff" }}
                  >
                    <FileText size={18} /> <span>Purchase Details</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link d-flex align-items-center gap-2 ${activeTab === "payment" ? "active fw-bold" : ""}`}
                    onClick={() => setActiveTab("payment")}
                    style={{ color: activeTab === "payment" ? "#0056b3" : "#007bff" }}
                  >
                    <CreditCard size={18} /> <span>Payment</span>
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link d-flex align-items-center gap-2 ${activeTab === "inward" ? "active fw-bold" : ""}`}
                    onClick={() => setActiveTab("inward")}
                    style={{ color: activeTab === "inward" ? "#0056b3" : "#007bff" }}
                  >
                    <Package size={18} /> <span>Inward Stock</span>
                  </button>
                </li>
              </ul>

            </div>
            <div className="card-body">
              {activeTab === "details" && (
                <div className="row g-3">
                  <h3 className="text-primary  fw-bold my-3">Purchase Details</h3>
                  <div className="col-md-6">
                    {/* <p>SupplierName<strong><h5>{formatDate(purchaseDetail?.businessName)}</h5></strong></p> */}
                    <p>Bill No: <strong><h5>{purchaseDetail?.billNo || "N/A"}</h5></strong></p>
                    <p>GST Type: <strong><h5> {purchaseDetail.gsT_Type}</h5></strong></p>
                    <p>Purchase Date: <strong><h5>{formatDate(purchaseDetail.purchaseDate)}</h5></strong></p>

                  </div>
                  <div className="col-md-6">
                    <p>Gross Total: <strong><h5> ₹{purchaseDetail.grossTotal?.toLocaleString('en-IN')}</h5></strong></p>
                    <p>GST: <strong><h5>₹{purchaseDetail.gst?.toLocaleString('en-IN')}</h5></strong></p>
                    <p>Total: <strong><h5> ₹{(purchaseDetail.gst + purchaseDetail.grossTotal).toLocaleString('en-IN')} </h5></strong></p>
                    <p>Notice Period: <strong><h5>{formatDate(purchaseDetail.noticePeriod)}</h5></strong></p>
                  </div>
                </div>
              )}
              {activeTab === "payment" && (
                <div>
                  <h3 className="text-primary text-center fw-bold my-3"> Payment </h3>
                  <PurchasePayment fetchPaymentDetails={fetchPaymentDetails} purchaseId={purchaseDetail.purchaseId} remainingAmount={remainingAmount} />
                </div>
              )} {activeTab === "inward" && (
                <div>
                  <h3 className="text-primary text-center fw-bold my-3">Inward Stock</h3>
                  {purchaseDetail?.purchaseId ? (<InwardStock purchaseId={purchaseDetail.purchaseId} />
                  ) : (
                    <p>Purchase ID is not available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

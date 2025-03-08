import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../API";
import PurchasePayment from "../PurchasePayment";
import InwardStock from "../InwordStock";
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
        const suppliersResponse = await getData("Supplier/List");
        const transactionYearsResponse = await getData("TransactionYear/List");
        if (suppliersResponse.status === "OK" && transactionYearsResponse.status === "OK") {
          const suppliersMap = new Map(suppliersResponse.result.map(s => [s.supplierId, s.businessName]));
          const transactionYearsMap = new Map(transactionYearsResponse.result.map(t => [t.transactionYearId, t.yearName]));
          setPurchaseDetail({
            ...purchaseDetail, supplierName: suppliersMap.get(purchaseDetail.supplierId),
            transactionYearName: transactionYearsMap.get(purchaseDetail.transactionYearId),
          });
          fetchPaymentDetails(purchaseDetail.purchaseId);
        }
      } else {
        console.error("Error fetching purchase details");
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInwordDetails = async (purchaseId) => {
    if (!purchaseId) {
      return;
    }
    try {
      const response = await getData(`InwardStock/Details/${purchaseId}`);
      if (response.status === "OK" && response.result) {
        setInwardStock(response.result);
      } else {
        console.warn("Inward stock details not found in API!");
        setInwardStock([]);
      }
    } catch (error) {
      console.error("Error fetching inward stock details:", error);
    }
  };

  const fetchPaymentDetails = async (purchaseId) => {
    if (!purchaseId) {
      return;
    }
    try {
      const paymentResponse = await getData(`PurchasePayment/Details/${purchaseId}`);
      if (paymentResponse.status === "OK" && paymentResponse.result) {
        setTotalPaid(paymentResponse.result.paid);
      } else {
        console.warn("Payment details not found in API!");
        setTotalPaid(0);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }

  };
  useEffect(() => {
    if (id) {
      console.log(" Fetching purchase details for ID:", id);
      fetchPurchaseDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (purchaseDetail?.purchaseId) {
      console.log(" Fetching payment for Purchase ID:", purchaseDetail.purchaseId);
      fetchPaymentDetails(purchaseDetail.purchaseId);
    }
  }, [purchaseDetail]);

  useEffect(() => {
    if (purchaseDetail?.purchaseId) {
      console.log(" Fetching inward stock for Purchase ID:", purchaseDetail.purchaseId);
      fetchInwordDetails(purchaseDetail.purchaseId);
    }
  }, [purchaseDetail]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };
  
  if (loading) return <p className="text-center">Loading...</p>;
  if (!purchaseDetail) return <p className="text-center">Purchase details not found.</p>;
  const grossTotal = purchaseDetail.grossTotal;
  const gst = purchaseDetail.gst;
  const totalAmount = grossTotal + gst;
  const remainingAmount = totalAmount - totalPaid;

  return (
    <div className="container-fluid">
      <div className="row">
        <p style={{ textAlign: 'right' }}>Remaining : <b> ₹ {remainingAmount.toLocaleString('en-IN')}</b></p>
        <div className="card">
          <div className="row">
            <div className="card-header p-0 border-bottom-0">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Purchase Details </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "payment" ? "active" : ""}`} onClick={() => setActiveTab("payment")}> Payment
                  </button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "inward" ? "active" : ""}`} onClick={() => setActiveTab("inward")}>
                    Inward Stock
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === "details" && (
                <div className="row g-3">
                  <h3 className="text-primary">Purchase Details</h3>
                  <div className="col-md-6">
                    <p>Supplier:<span /><strong><h5>{purchaseDetail?.supplierName || "N/A"}</h5></strong></p>
                    <p>Bill No:<span /> <strong> <h5>{purchaseDetail?.billNo || "N/A"}</h5></strong></p>
                    <p>Transaction Year:<span /><strong><h5>{purchaseDetail?.transactionYearName || "N/A"}</h5></strong></p>
                  </div>
                  <div className="col-md-6">
                    <p>Gross Total:<span /><strong><h5> ₹{purchaseDetail.grossTotal?.toLocaleString('en-IN')}</h5></strong></p>
                    <p>GST:<span /><strong><h5>₹{purchaseDetail.gst?.toLocaleString('en-IN')}</h5></strong></p>
                    <p>Total:<span /><strong><h5> ₹{totalAmount.toLocaleString('en-IN')} </h5></strong></p>
                  </div>
                  <div className="col-md-6">
                    <p>GST Type:<span /><strong><h5> {purchaseDetail.gsT_Type}</h5></strong></p>
                    <p>Purchase Date:<span /><strong><h5>{formatDate(purchaseDetail.purchaseDate)}</h5></strong></p>
                  </div>
                  <div className="col-md-6"><p>Notice Period:<br /><strong><h5>{formatDate(purchaseDetail.noticePeriod)}</h5></strong></p></div>
                </div>
              )}
              {activeTab === "payment" && (
                <div>
                  <h3 className="text-primary">Payment</h3>
                  <PurchasePayment purchaseId={purchaseDetail.purchaseId} />
                </div>
              )}
              {activeTab === "inward" && (
                <div>
                  <h3 className="text-primary">Inward Stock</h3>
                  {purchaseDetail?.purchaseId ? (
                    <InwardStock purchaseId={purchaseDetail.purchaseId} />
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

import React, { useEffect, useState } from 'react'
import PaymentPopup from './Popups/PaymentPopup';
import { getData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'react-bootstrap';
export default function PurchasePayment() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [PurchasePayments, setPurchasePayments] = useState([]);
  const [PaymentId, setPaymentId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    PurchaseId: "",
    Amount: "",
    PaymentMode: "",
    RefNo: "",
    PaymentDate: ""
  });
  const fetchPurchasePayments = async () => {
    try {
      const response = await getData("PurchasePayment/List");
      if (response.status.toUpperCase() === "OK") {
        const updatedData = response.result.map((item) => ({
          ...item,
          remain: item.total - item.paid,
        }));
        setPurchasePayments(updatedData);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const deletePurchasePayment = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("PurchasePayment/Remove/" + Id);
        if (response.status === "OK") {
          fetchPurchasePayments();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  const fetchPurchasePaymentDetail = async (Id) => {
    try {
      const response = await getData("PurchasePayment/Details/" + Id);
      if (response.status.toUpperCase() === "OK") {
        setInitialValue({
          PurchaseId: response.result.purchaseId,
          Amount: response.result.amount,
          PaymentMode: response.result.paymentMode,
          RefNo: response.result.refNo,
          PaymentDate: response.result.paymentDate,

        });
        setPaymentId(response.result.paymentId);
        setShow(true);
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const openPopupButton = (rowData) => {
    return (
      <Button
        className="Payment"
        onClick={async () => {
          if (rowData.remain <= 0) {
            alert("Full payment is already done! No more payments allowed.");
            return;
          }

          // Fetch details first, then update values & open popup
          await fetchPurchasePaymentDetail(rowData.paymentId);

          setInitialValue({
            PurchaseId: rowData.purchaseId,
            Amount: rowData.remain
          });

          setShow(true); // Open popup only after setting values
        }}
        disabled={rowData.remain <= 0}
      >
        ₹
      </Button>
    );
  };


  useEffect(() => {
    fetchPurchasePayments();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return ""; const date = new Date(dateString); return date.toLocaleDateString("en-GB", {
      day: "2-digit", month: "2-digit",
      year: "numeric",
    });
  };
  const deleteTemplate = (purchasePayment) => {
    return <i onClick={() => deletePurchasePayment(purchasePayment.paymentId)} className='fas fa-trash text-danger'></i>;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Payment</h4> </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <PaymentPopup
                    fetchPurchaseMasters={fetchPurchasePayments} PaymentId={PaymentId} setPaymentId={setPaymentId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} remain={initialValue.total - initialValue.paid} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size="small" loading={dataLoading} value={PurchasePayments} tableStyle={{ minWidth: "50rem" }} >
                    <Column field="paymentId" header="#" />
                    <Column field="billNo" header="Bill No" />
                    <Column field="businessName" header="Supplier" />
                    <Column field="total" header="Total" body={(rowData) => (<><i className="pi pi-money-bill" style={{ marginRight: "5px", color: "green" }} /> ₹{rowData.total.toLocaleString("en-IN")} </>)} />
                    <Column field="paid" header="Paid Amount" />
                    <Column field="remain" header="Remaining Amount" />
                    <Column field="purchaseDate" header="Bill Date" body={(rowData) => formatDate(rowData.purchaseDate)} />
                    <Column field="noticePeriod" header="Notice Period" body={(rowData) => formatDate(rowData.noticePeriod)} />
                    <Column header="" body={openPopupButton} className="text-center" style={{ width: "150px" }} />
                    <Column body={deleteTemplate} className="text-center" style={{ width: "50px" }} />
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

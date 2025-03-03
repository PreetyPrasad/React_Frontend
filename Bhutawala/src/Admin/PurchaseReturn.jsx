import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PurchaseReturnpopup from './Popups/PurchaseReturnpopup';
export default function PurchaseReturn() {
  const [show, setShow] = useState(false);
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [PurchaseReturnId, setPurchaseReturnId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    purchaseReturnId: "",
    purchaseId: "",
    invoiceId: "",
    qty: "",
    unit: "",
    total: "",
    returnDate: "",
  });
  const fetchPurchaseReturns = async () => {
    setLoading(true);
    try {
      const response = await getData("PurchaseReturn/List");
      if (response?.status?.toUpperCase() === "OK" && Array.isArray(response.result)) {
        setPurchaseReturns(response.result);
      } else {
        console.error("Failed to fetch purchase returns.");
      }
    } catch (error) {
      console.error("Error fetching purchase returns:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchPurchaseReturnDetail = async (id) => {
    try {
      const response = await getData(`PurchaseReturn/Details/${id}`);
      if (response.status === "OK") {
        setInitialValue({
          purchaseId: response.result.purchaseId,
          invoiceId: response.result.invoiceId,
          qty: response.result.qty,
          unit: response.result.unit,
          total: response.result.total,
          returnDate: response.result.returnDate,
        });
        setPurchaseReturnId(response.result.purchaseReturnId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching purchase return details:", error);
    }
  };
  const editTemplate = (purchaseReturn) => (
    <i
      onClick={() => fetchPurchaseReturnDetail(purchaseReturn.purchaseReturnId)}
      className="fas fa-edit cursor-pointer"
    ></i>
  );
 
  const deletePurchaseReturn = async (id) => {
    if (window.confirm("Are you sure you want to delete this purchase return?")) {
      setLoading(true);
      try {
        const response = await getData(`PurchaseReturn/Remove/${id}`);
        if (response.status === "OK") {
          fetchPurchaseReturns();
        } else {
          console.error("Error deleting purchase return.");
        }
      } catch (error) {
        console.error("Error deleting purchase return:", error);
      } finally {
        setLoading(false);
      }
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    fetchPurchaseReturns();
  }, []);




  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Purchase Returns</h4>
        </div>
        <div className="col-md-12 mb-2">
        <button type="button" id='openPopup' onClick={() => setShow(true)} className="btn btn-primary">Open modal</button>
          <PurchaseReturnpopup fetchPurchaseReturns={fetchPurchaseReturns} PurchaseReturnId={PurchaseReturnId} setPurchaseReturnId={setPurchaseReturnId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
          </div>
        <div className="card-body">
          <DataTable
            value={purchaseReturns}
            loading={loading}
            showGridlines
            size="small"
            responsiveLayout="scroll"
          >
            <Column field="purchaseReturnId" header="ID" sortable></Column>
            <Column field="purchaseId" header="Purchase ID" sortable></Column>
            <Column field="invoiceId" header="Invoice ID" sortable></Column>
            <Column field="qty" header="Quantity" sortable></Column>
            <Column field="unit" header="Unit"></Column>
            <Column field="total" header="Total" sortable></Column>
            <Column field="returnDate" header="Return Date" body={(rowData) => formatDate(rowData.returnDate)}></Column>
            <Column body={editTemplate} className="text-center" style={{ width: "50px" }}></Column>
            <Column body={(rowData) => (<i onClick={() => deletePurchaseReturn(rowData.purchaseReturnId)}className="fas fa-trash text-danger "
                ></i>
              )}style={{ textAlign: "center", width: "50px" }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}

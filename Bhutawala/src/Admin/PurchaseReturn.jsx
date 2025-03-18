import React, { useState } from "react";
import { getData, postData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function PurchaseReturn() {
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const [inwardStocks, setInwardStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toISOString().split("T")[0];
  };

  const handleFilter = async () => {
    if (!billNo || !billDate) {
      alert("Please enter both Bill No and Bill Date");
      return;
    }
    setLoading(true);
    try {
      const response = await getData(`PurchaseReturn/purchaseDetail/${billNo}/${billDate}`);
      if (response?.status?.toUpperCase() === "OK" && response.result.length > 0) {
        const purchaseData = response.result[0];
        setPurchaseDetails(purchaseData);
        setInwardStocks(purchaseData.stocks);
      } else {
        setPurchaseDetails(null);
        setInwardStocks([]);
        console.error("No data found.");
      }
    } catch (error) {
      console.error("Error fetching purchase returns:", error);
      setPurchaseDetails(null);
      setInwardStocks([]);
    } finally {
      setLoading(false);
    }
  };
  const handleTotalChange = (value, rowIndex) => {
    let numericValue = parseFloat(value);
    const currentQty = inwardStocks[rowIndex]?.qty;
    if (isNaN(numericValue) || numericValue < 0) {
      numericValue = 0;
    } else if (numericValue > currentQty) {
      numericValue = currentQty;
    }
    const updatedData = [...inwardStocks];
    updatedData[rowIndex].editableTotal = numericValue;
    setInwardStocks(updatedData);
  };
  const handleAction = async (rowData) => {
    const { stockId, editableTotal } = rowData;
    const purchaseReturnData = {
      purchaseId: purchaseDetails.purchaseId,
      stockId: stockId,
      qty: editableTotal,
    };
    try {
      const response = await postData("PurchaseReturn/Save", purchaseReturnData);
      if (response?.status?.toUpperCase() === "OK") {
        alert("Return saved successfully!");
        handleFilter();
      } else {
        alert("Failed to save the return.");
      }
    } catch (error) {
      console.error("Error saving purchase return:", error);
      alert("Error saving purchase return.");
    }
  };

  const unitTemplate = (material) => {
    return `${material.qty} ${material.unit}`;
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header"><h4 className="card-title">Purchase Returns</h4></div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-2">
              <b>Bill NO</b><span className="text-danger">*</span>
              <input type="text" className="form-control" value={billNo} onChange={(e) => setBillNo(e.target.value)} />
            </div>
            <div className="col-md-3 mb-2">
              <b>Bill Date</b><span className="text-danger">*</span>
              <input type="date" className="form-control" value={billDate} onChange={(e) => setBillDate(e.target.value)} />
            </div>
            <div className="col-md-3 mb-2 d-flex align-items-end">
              <button className="btn btn-primary" onClick={handleFilter}>Search</button>
            </div>
          </div>
          {purchaseDetails && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5>Purchase Details</h5>
              <div className="row">
                <div className="col-md-4"><b>Bill No:</b>{purchaseDetails.billNo}</div>
                <div className="col-md-4"><b>Bill Date:</b>{formatDate(purchaseDetails.purchaseDate)}</div>
                <div className="col-md-4"><b>Supplier:</b>{purchaseDetails.supplier}</div>
                <div className="col-md-4"><b>Gross Total:</b> ₹{purchaseDetails.grossTotal}</div>
                <div className="col-md-4"><b>GST Type:</b> {purchaseDetails.gsT_Type}</div>
                <div className="col-md-4"><b>Notice Period:</b> {formatDate(purchaseDetails.noticePeriod)}</div>
              </div>
            </div>
          )}
          {inwardStocks.length > 0 && (
            <div className="mt-4">
              <h5>Inward Stock Details</h5>
              <DataTable showGridlines size="small" value={inwardStocks} loading={loading}>
                <Column field="stockId" header="Stock ID" sortable></Column>
                <Column field="materialName" header="Material Name" sortable></Column>
                <Column body={unitTemplate} header="Qty" sortable></Column>
                <Column field="cost" header="Cost" sortable body={(data) => `₹ ${data.cost.toLocaleString('en-IN')}`}></Column>
                <Column header="Total" body={(rowData, options) => (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Qty"
                    value={rowData.editableTotal || ""}
                    onChange={(e) => handleTotalChange(e.target.value, options.rowIndex)}
                  />
                )} />
                <Column field="brand" header="Brand" sortable></Column>
                <Column header="" body={(rowData) => (
                  <button className="btn btn-primary" onClick={() => handleAction(rowData)}>Return</button>
                )} />
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export default function PurchaseReturn() {
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [filteredReturns, setFilteredReturns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState("");
  const fetchPurchaseReturns = async () => {
    setLoading(true);
    try {
      const response = await getData("PurchaseReturn/List");
      if (response?.status?.toUpperCase() === "OK") {
        setPurchaseReturns(response.result);
        setFilteredReturns(response.result);
      } else {
        console.error("Failed to fetch purchase returns.");
      }
    } catch (error) {
      console.error("Error fetching purchase returns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseReturns();
  }, [])
  const formatDate = (dateString) => {
    if (!dateString) return "-"; const date = new Date(dateString); if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleFilter = () => {
    const filtered = purchaseReturns.filter((item) => {
      return (
        (billNo ? item.billNo.toLowerCase().includes(billNo.toLowerCase()) : true) &&
        (billDate ? formatDate(item.purchaseDate) === billDate : true)
      );
    });
    setFilteredReturns(filtered);
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header"><h4 className="card-title">Purchase Returns</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-2">
              <b>Bill NO</b><span className="text-danger">*</span>
              <input type="text" className="form-control" name="BillNo" value={billNo} onChange={(e) => setBillNo(e.target.value)} />
            </div>
            <div className="col-md-3 mb-2">
              <b>Bill Date</b><span className="text-danger">*</span>
              <input type="date" className="form-control" name="BillDate" value={billDate} onChange={(e) => setBillDate(e.target.value)} />
            </div>
            <div className="col-md-3 mb-2 d-flex align-items-end">
              <button className="btn btn-primary" onClick={handleFilter}> Search</button>
            </div>
            <div className="col-md-12 table-responsive">
              <DataTable showGridlines size="small" value={filteredReturns} loading={loading}>
                <Column field="purchaseId" header="#" sortable></Column>
                <Column field="billNo" header="Bill No" sortable></Column>
                <Column field="purchaseDate" header="Bill Date" body={(rowData) => formatDate(rowData.purchaseDate)}></Column>
                <Column field="supplier" header="Supplier" sortable></Column>
                <Column field="grossTotal" header="Gross Total" sortable></Column>
                <Column field="gsT_Type" header="GST" sortable></Column>
                <Column field="noticePeriod" header="Notice Period" sortable body={(rowData) => formatDate(rowData.noticePeriod)} ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

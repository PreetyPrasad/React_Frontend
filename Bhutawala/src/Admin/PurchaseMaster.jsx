import React, { useEffect, useState } from 'react'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PurchaseMasterpoppup from './Popups/PurchaseMasterpoppup';
export default function PurchaseMaster() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [PurchaseMasters, setPurchaseMasters] = useState([]);
  const [PurchaseId, setPurchaseId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    PurchaseId: "",
    SupplierId: "",
    TransactionYearId: "",
    GrossTotal: "",
    GST: "",
    GST_Type: "",
    Total: "",
    PurchaseDate: "",
    BillNo: "",
    NoticePeriod: "",
    Note: ""
  });
  const fetchPurchaseMasters = async () => {
    try {
      const response = await getData("PurchaseMaster/List");
      if (response.status.toUpperCase() === "OK") {

        const suppliersResponse = await getData("Supplier/List");
        const transactionYearsResponse = await getData("TransactionYear/List");

        const suppliersMap = Object.fromEntries(
          suppliersResponse.result.map(s => [s.supplierId, s.businessName])
        );
        const transactionYearsMap = Object.fromEntries(
          transactionYearsResponse.result.map(t => [t.transactionYearId, t.yearName])
        );
        const purchaseData = response.result.map(purchase => ({
          ...purchase,
          supplierName: suppliersMap[purchase.supplierId] || "N/A",
          transactionYearName: transactionYearsMap[purchase.transactionYearId] || "N/A"
        }));
        setPurchaseMasters(purchaseData);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };


  const deletePurchaseMaster = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("PurchaseMaster/Remove/" + Id);
        if (response.status == "OK") {
          fetchPurchaseMasters();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchPurchaseMasterDetail = async (Id) => {
    try {
      const response = await getData("PurchaseMaster/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          SupplierId: response.result.supplierId,
          TransactionYearId: response.result.transactionYearId,
          GrossTotal: response.result.grossTotal,
          GST: response.result.gst,
          GST_Type: response.result.gsT_Type,
          Total: response.result.total,
          PurchaseDate: response.result.purchaseDate,
          BillNo: response.result.billNo,
          NoticePeriod: response.result.noticePeriod,
          Note: response.result.note

        });
        setPurchaseId(response.result.purchaseId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const editTemplate = (purchaseMaster) => {
    return <i onClick={() => fetchPurchaseMasterDetail(purchaseMaster.purchaseId)} className='fas fa-edit text-success'></i>;
  };
  const deleteTemplate = (purchaseMaster) => {
    return <i onClick={() => deletePurchaseMaster(purchaseMaster.purchaseId)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchPurchaseMasters();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">PurchaseMaster</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">Open modal</button>
                  <PurchaseMasterpoppup fetchPurchaseMasters={fetchPurchaseMasters} PurchaseId={PurchaseId} setPurchaseId={setPurchaseId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={PurchaseMasters} tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ width: "100px" }} field="purchaseId" header="#"></Column>
                    <Column field="supplierName" header="Supplier"></Column>
                    <Column field="billNo" header="billNo" sortable></Column>
                    <Column field="transactionYearName" header="Transaction Year"></Column>
                    <Column field="grossTotal" header="grossTotal"></Column>
                    <Column field="gst" header="GST"></ Column>
                    <Column field="gsT_Type" header="GSTType"></Column>
                    <Column field="total" header="Total" body={(rowData) => { const totalAmount = (rowData.grossTotal || 0) + (rowData.gst || 0); return (<><i className="pi pi-money-bill" /> ₹{totalAmount.toLocaleString("en-IN")}</>); }} />
                    <Column field="purchaseDate" header="purchaseDate" body={(rowData) => formatDate(rowData.purchaseDate)}></Column>
                    <Column field="noticePeriod" header="Notice Period" body={(rowData) => formatDate(rowData.noticePeriod)} />
                    <Column body={editTemplate} className='text-center' style={{ width: "50px" }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: "50px" }}></Column>
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

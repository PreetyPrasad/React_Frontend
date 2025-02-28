import React, { useEffect, useState } from 'react';
import { getData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InvoiceDetailPopup from './Popups/invoiceDetailPopup';

export default function InvoiceDetail() {
  const [show, setShow] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [InvoiceDetailId, setInvoiceDetailId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    InvoiceId: "",
    MaterialId: "",
    Rate: "",
    Qty: "",
    Unit: "",
    GSTAmount: "",
    Total: "",
  });

  useEffect(() => {
    fetchInvoiceDetails();
  }, []);

  const fetchInvoiceDetails = async () => {
    try {
      setDataLoading(true);
      const response = await getData("InvoiceDetail/List");
      if (response?.status?.toUpperCase() === "OK" && response?.result) {
        setInvoiceDetails(response.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchInvoiceDetailDetail = async (id) => {
    try {
      const response = await getData(`InvoiceDetail/Details/${id}`);
      if (response.status === "OK") {
        setInitialValue(response.result);
        setInvoiceDetailId(id);
        setShow(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteInvoiceDetail = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        setDataLoading(true);
        const response = await getData(`InvoiceDetail/Remove/${id}`);
        if (response.status === "OK") {
          fetchInvoiceDetails();
        }
      } catch (error) {
        console.error("Error deleting invoice detail:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title mb-0">Invoice Details</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 mb-2">
              <button type="button" id='openPopup' onClick={() => setShow(true)} className="btn btn-primary">Open modal</button>
              <InvoiceDetailPopup fetchInvoiceDetails={fetchInvoiceDetails} InvoiceDetailId={InvoiceDetailId} setInvoiceDetailId={setInvoiceDetailId} loading={dataLoading} setLoading={setDataLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
            </div>
            <DataTable showGridlines size='small' loading={dataLoading} value={invoiceDetails} tableStyle={{ minWidth: '50rem' }}>
              <Column field="invoiceDetailId" header="#"></Column>
              <Column field="invoiceId" header="Invoice ID"></Column>
              <Column field="materialId" header="Material"></Column>
              <Column field="rate" header="Rate"></Column>
              <Column field="qty" header="Quantity"></Column>
              <Column field="gstAmount" header="GST Amount"></Column>
              <Column field="unit" header="Unit"></Column>
              <Column field="total" header="Total"></Column>
              <Column body={(rowData) => <i className='fas fa-edit' onClick={() => fetchInvoiceDetailDetail(rowData.invoiceDetailId)}></i>} />
              <Column body={(rowData) => <i className='fas fa-trash' onClick={() => deleteInvoiceDetail(rowData.invoiceDetailId)}></i>} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

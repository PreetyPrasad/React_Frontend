import React, { useEffect, useState } from 'react';
import { getData } from '../API/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InvoicePopup from './Popups/InvoicePopup';

export default function InvoiceMaster() {
  const [showPopup, setShowPopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [invoiceMasters, setInvoiceMasters] = useState([]);

  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  // Fetch Invoices from API
  const fetchInvoiceMasters = async () => {
    setDataLoading(true);
    try {
      const response = await getData('InvoiceMaster/List/1'); // Ensure correct Financial Year ID

      if (response.status.toUpperCase() === 'OK' && response.result.length > 0) {
        setInvoiceMasters(response.result);
      } else {
        console.error('No invoices found');
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    fetchInvoiceMasters();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Invoice Master</h4>
              <button className="btn btn-success mb-3" onClick={handleShowPopup}>
                Add Invoice
              </button>
            </div>

            {/* ✅ Render InvoicePopup Modal */}
            <InvoicePopup show={showPopup} handleClose={handleClosePopup} refreshInvoices={fetchInvoiceMasters} />

            <div className="card-body">
              <div className="col-md-12 table-responsive">
                <DataTable dataKey="invoiceId" value={invoiceMasters} loading={dataLoading} showGridlines>
                  <Column field="invoiceId" header="#" style={{ width: '100px' }}></Column>
                  <Column field="invoiceNo" header="Invoice No"></Column>
                  <Column field="customerName" header="Customer"></Column>
                  <Column field="contactNo" header="Contact"></Column>
                  <Column field="totalGross" header="Total Gross"></Column>
                  <Column field="gst" header="GST"></Column>
                  <Column field="gstType" header="GST Type"></Column>
                  <Column field="total" header="Total"></Column>
                  <Column field="invoiceDate" header="Invoice Date"></Column>
                  <Column field="noticePeriod" header="Notice Period"></Column>
                  <Column field="gstin" header="GSTIN"></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

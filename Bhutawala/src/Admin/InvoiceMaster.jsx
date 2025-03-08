import React, { useEffect, useState } from 'react';
import { getData } from '../API/index';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function InvoiceMaster() {
  const [showPopup, setShowPopup] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [invoiceMasters, setInvoiceMasters] = useState([]);
  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  const fetchInvoiceMasters = async () => {
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
  const formatDate = (dateString) => {
    if (!dateString) return "-"; const date = new Date(dateString); if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Invoice Master</h4>
              {/* <button className="btn btn-success mb-3" onClick={handleShowPopup}> */}
                {/* Add Invoice */}
              {/* </button> */}
            </div>  
            {/* <InvoicePopup show={showPopup} handleClose={handleClosePopup} refreshInvoices={fetchInvoiceMasters} /> */}
            <div className="card-body">
              <div className="col-md-12 table-responsive">
                <DataTable dataKey="invoiceId" value={invoiceMasters} loading={dataLoading} showGridlines>
                  <Column field="invoiceId" header="#" style={{ width: '100px' }}></Column>
                  <Column field="invoiceNo" header="Invoice No"></Column>
                  <Column field="customerName" header="Customer"></Column>
                  <Column field="contactNo" header="Contact"></Column>
                  <Column field="totalGross" header="Total Gross" body={(data) => `₹ ${data.totalGross.toLocaleString('en-IN')}`}></Column>
                  <Column field="gst" header="GST" body={(data) => `₹ ${data.gst.toLocaleString('en-IN')}`}></Column>
                  <Column field="gstType" header="GST Type"></Column>
                  <Column field="total" header="Total"></Column>
                  <Column field="invoiceDate" header="Invoice Date" body={(rowData) => formatDate(rowData.invoiceDate)}></Column>
                  <Column field="noticePeriod" header="Notice Period" body={(rowData) => formatDate(rowData.noticePeriod)}></Column>
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

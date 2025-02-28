
import React, { useEffect, useState } from 'react'
import PaymentPopup from './Popups/PaymentPopup';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setPurchasePayments(response.result);
        console.log(response.result);
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
        if (response.status == "OK") {
          fetchPurchasePayments();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchPurchasePaymentDetail = async (Id) => {
    try {
      const response = await getData("PurchasePayment/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          PurchaseId: response.result.purchaseId,
          Amount: response.result.amount,
          PaymentMode: response.result.paymentMode,
          RefNo: response.result.refNo,
          PaymentDate: response.result.paymentDate
        });
        setPurchasePayments(response.result.PaymentId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  // const unitTemplate = (material) => {
  // return `${material.qty} ${material.unit}`
  // };

  const editTemplate = (purchasePayment) => {
    return <i onClick={() => fetchPurchasePaymentDetail(purchasePayment.paymentId)} className='fas fa-edit'></i>;
  };

  const deleteTemplate = (purchasePayment) => {
    return <i onClick={() => deletePurchasePayment(purchasePayment.paymentId)} className='fas fa-trash'></i>;
  };

  useEffect(() => {
    fetchPurchasePayments();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Payment</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="btn btn-primary">Open modal</button>
                  <PaymentPopup fetchPurchaseMasters={fetchPurchasePayments} PaymentId={PaymentId} setPaymentId={setPaymentId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={PurchasePayments} tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ width: "100px" }} field="paymentId" header="#"></Column>
                    <Column field="purchaseId" header="BillNo"></Column>
                    <Column field="amount" header="Amount"></Column>
                    <Column field="paymentMode" header="PaymentMode"></Column>
                    <Column field="refNo" header="RefNo"></Column>
                    <Column field="gst" header="GST"></Column>
                    <Column field="paymentDate" header="PaymentDate"></Column>
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

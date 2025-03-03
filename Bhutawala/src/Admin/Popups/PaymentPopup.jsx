import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { purchasePaymentSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function PaymentPopup(props) {
  const remain = props.remain;
  const { handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, errors, values } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: purchasePaymentSchema,
    onSubmit: async (values) => {
      if (values.Amount <= 0) { alert("Amount cannot be zero or negative."); return; }
      if (values.Amount > props.remain) { alert(`Amount cannot exceed ₹${props.remain}`); setFieldValue("Amount", props.remain); return; }
      const requestData = {
        PurchaseId: values.PurchaseId,
        Amount: values.Amount,
        PaymentMode: values.PaymentMode,
        RefNo: values.RefNo,
        PaymentDate: values.PaymentDate,
        PaymentId: props.PaymentId
      };
      try {
        props.setLoading(true);
        const result = await postData(
          props.PaymentId === 0 ? "PurchasePayment/Save" : "PurchasePayment/Edit",
          requestData
        );
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchPurchaseMasters();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error posting data:", error.message);
        alert("Error occurred while processing the payment. Please try again.");
      } finally {
        props.setLoading(false);
      }
    }
  });
  useEffect(() => {
    setFieldValue("Amount", props.Amount);
    setFieldValue("PurchaseId", props.PurchaseId);
  }, [props.Amount, props.PurchaseId, setFieldValue]);

  const clearForm = () => {
    handleReset();
    props.setShow(false);
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header"> <h4 className="modal-title">Payment</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
                <div className="col-md-12 mb-2">
                  <b>Amount</b> <span className="text-danger">*{errors.Amount}</span>
                  <input type="number" className="form-control" name="Amount" value={values.Amount} onBlur={handleBlur} onChange={(e) => {
                    let inputValue = parseFloat(e.target.value) || 0; if (inputValue < 0) { inputValue = 0; } if (inputValue > props.remain) { inputValue = props.remain; } setFieldValue("Amount", inputValue);
                  }} min="1" max={props.remain} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>RefNo</b> <span className="text-danger">*{errors.RefNo}</span>
                  <input type="text" className="form-control" name="RefNo" value={values.RefNo} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Payment Date</b> <span className="text-danger">*{errors.PaymentDate}</span>
                  <input type="Date" className="form-control" name="PaymentDate" value={values.PaymentDate} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Purchase ID</b>
                  <input type="text" className="form-control" name="PurchaseId" value={values.PurchaseId} disabled />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Payment Mode</b> <span className="text-danger">*{errors.PaymentMode}</span>
                  <select className="form-control" name="PaymentMode" value={values.PaymentMode} onBlur={handleBlur} onChange={handleChange}>
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>
                <div className="col-md-12 mb-2">
                  <button id="btnSave" type="submit" disabled={props.loading} className="open-modal-btn">
                    {props.loading ? "Please Wait" : "Save"}
                  </button>
                  <button id="btnCancel" type="button" className="btn-custom btn-cancel" onClick={clearForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show && <div className="modal-backdrop show" />}
    </>
  );
}

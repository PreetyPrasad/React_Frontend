import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { purchasePaymentSchema } from '../../Schema';
import { postData } from '../../API';

export default function PaymentPopup(props) {
  const { handleBlur, handleChange, handleSubmit, setFieldValue, errors, values } = useFormik({
    enableReinitialize: true,
    initialValues: {
      PurchaseId: props.initialValue.PurchaseId,
      Amount: props.remain > 0 ? props.remain : "",
      PaymentMode: props.initialValue.PaymentMode,
      RefNo: props.initialValue.RefNo,
      PaymentDate: props.initialValue.PaymentDate
    },
    validationSchema: purchasePaymentSchema,
    onSubmit: async (values) => {
      if (values.Amount <= 0) {
        alert("Amount cannot be zero or negative.");
        return;
      }
      if (values.Amount > props.remain) {
        alert(`Amount cannot exceed ₹${props.remain}`);
        setFieldValue("Amount", props.remain);
        return;
      }
      const requestData = {
        PurchaseId: values.PurchaseId,
        Amount: values.Amount,
        PaymentMode: values.PaymentMode,
        RefNo: values.RefNo,
        PaymentDate: values.PaymentDate,
        PaymentId: props.PaymentId,
      };

      try {
        props.setLoading(true);
        const result = await postData(
          props.PaymentId === 0 ? "PurchasePayment/Save" : "PurchasePayment/Edit",
          requestData
        );
        if (result && result.status.toUpperCase() === "OK") {
          alert("Payment saved successfully.");
          props.fetchPaymentDetails();
          props.fetchPurchasePayments();
          clearForm();
        } else {
          alert("Payment already exists.");
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
    if (props.PurchaseId && props.remain !== undefined) {
      console.log("Updating Amount to:", props.remain);
      setFieldValue("Amount", props.remain || "");
      setFieldValue("PurchaseId", props.PurchaseId);
    }
  }, [props.remain, props.PurchaseId, setFieldValue]);

  const clearForm = () => {
    props.setInitialValue({
      PurchaseId: "",
      Amount: "",
      PaymentMode: "",
      RefNo: "",
      PaymentDate: ""
    });
    props.setShow(false);
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Payment</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="row">
                <div className="col-md-12 mb-2">
                  <b>Amount</b> <span className="text-danger">*{errors.Amount}</span>
                  <div className="form-text">Available Balance: ₹{props.remain}</div>
                  <input
                    type="number"
                    className="form-control"
                    name="Amount"
                    value={values.Amount}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      let inputValue = parseFloat(e.target.value);
                      if (inputValue < 0) inputValue = 0;
                      if (inputValue > props.remain) inputValue = props.remain;
                      setFieldValue("Amount", inputValue);
                    }}
                    min="1"
                    max={props.remain}
                  />
                </div>

                <div className="col-md-12 mb-2">
                  <b>RefNo</b> <span className="text-danger">*{errors.RefNo}</span>
                  <input type="text" className="form-control" name="RefNo" value={values.RefNo} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Payment Date</b> <span className="text-danger">*{errors.PaymentDate}</span>
                  <input type="date" className="form-control" name="PaymentDate" value={values.PaymentDate} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Payment Mode</b> <span className="text-danger">*{errors.PaymentMode}</span>
                  <select name="PaymentMode" value={values.PaymentMode} onBlur={handleBlur} onChange={handleChange} className="form-control">
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
                  </button>&nbsp;
                  <button id="btnCancel" type="button" className="btn-custom btn-cancel" onClick={clearForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

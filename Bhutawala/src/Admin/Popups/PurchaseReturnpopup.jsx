import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PurchaseReturnSchema } from "../../Schema";
import { getData, postData } from "../../API";

export default function PurchaseReturnpopup(props) {
  const [purchaseMasters, setPurchaseMasters] = useState([]);
  const [invoiceMasters, setInvoiceMasters] = useState([]);

  useEffect(() => {
    fetchPurchase_Invoice();
  }, []);
  const fetchPurchase_Invoice = async () => {
    try {
      const PurchaseMasterresponse = await getData("PurchaseMaster/List");
      const InvoiceMasterresponse = await getData("InvoiceMaster/List");

      console.log("PurchaseMasterresponse:", PurchaseMasterresponse);
      console.log("InvoiceMasterresponse:", InvoiceMasterresponse);

      if (PurchaseMasterresponse.status === "OK") {
        setPurchaseMasters(PurchaseMasterresponse.result);
      } else {
        console.error("Failed to fetch Purchase Masters");
      }

      if (InvoiceMasterresponse.status === "OK") {
        setInvoiceMasters(InvoiceMasterresponse.result);
      } else {
        console.error("Failed to fetch Invoice Masters");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Formik setup
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: PurchaseReturnSchema,
    onSubmit: async (values) => {
      const requestData = {
        PurchaseId: values.PurchaseId,
        InvoiceId: values.InvoiceId,
        Unit: values.Unit,
        Qty: values.Qty,
        Total: values.Total,
        ReturnDate: values.ReturnDate,
      };

      try {
        props.setLoading(true);
        const result = await postData(
          props.PurchaseReturnId === 0 ? "PurchaseReturn/Save" : "PurchaseReturn/Edit",
          requestData
        );

        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchPurchaseReturns();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error posting data:", error.message);
      } finally {
        props.setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (props.PurchaseReturnId !== 0) {
      setFieldValue("PurchaseId", props.initialValue.PurchaseId || "");
      setFieldValue("InvoiceId", props.initialValue.InvoiceId || "");
    }
  }, [props.PurchaseReturnId, props.initialValue, setFieldValue]);


  // Clear form
  const clearForm = () => {
    props.setInitialValue({
      PurchaseId: "",
      InvoiceId: "",
      Unit: "",
      Qty: "",
      Total: "",
      ReturnDate: "",
    });
    props.setShow(false);
    props.setPurchaseReturnId(0);
  };

  return (
    <>
      <div
        className={props.show ? "modal show" : "modal"}
        style={props.show ? { display: "block" } : null}
        id="MaterialModal"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Material</h4>
              <button
                type="button"
                onClick={() => props.setShow(false)}
                className="btn-close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row">
                {/* Purchase Master Dropdown */}
                <div className="col-md-6 mb-2">
                  <b>Purchase Master</b> <span className="text-danger">*{errors.PurchaseId}</span>
                  <select
                    value={values.PurchaseId}
                    onChange={(e) => setFieldValue("PurchaseId", e.target.value)}
                    name="PurchaseId"
                    id="drpPurchaseId"
                    className="form-select"
                  >
                    <option value="">Select Purchase Master</option>
                    {purchaseMasters.length > 0 ? (
                      purchaseMasters.map((o) => (
                        <option key={o.purchaseId} value={o.purchaseId}>
                          {o.billNo}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Data Available</option>
                    )}
                  </select>
                </div>

                {/* Invoice Master Dropdown */}
                <div className="col-md-6 mb-2">
                  <b>Invoice Master</b> <span className="text-danger">*{errors.InvoiceId}</span>
                  <select
                    value={values.InvoiceId}
                    onChange={(e) => setFieldValue("InvoiceId", e.target.value)}
                    name="InvoiceId"
                    id="drpInvoiceId"
                    className="form-select"
                  >
                    <option value="">Select Invoice Master</option>
                    {invoiceMasters.map((o) => (
                      <option key={o.invoiceId} value={o.invoiceId}>
                        {o.invoiceId}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Other Fields */}
                <div className="col-md-6 mb-2">
                  <b>Unit</b> <span className="text-danger">*{errors.Unit}</span>
                  <input type="text" value={values.Unit} onChange={handleChange} onBlur={handleBlur} id="Unit" name="Unit" className="form-control" placeholder="Unit" />
                </div>

                <div className="col-md-6 mb-2">
                  <b>Qty</b> <span className="text-danger">*{errors.Qty}</span>
                  <input type="text" value={values.Qty} onChange={handleChange} onBlur={handleBlur} id="Qty" name="Qty" className="form-control" placeholder="Qty" />
                </div>

                <div className="col-md-6 mb-2">
                  <b>Total</b> <span className="text-danger">*{errors.Total}</span>
                  <input type="text" value={values.Total} onChange={handleChange} onBlur={handleBlur} id="Total" name="Total" className="form-control" placeholder="Total" />
                </div>

                <div className="col-md-6 mb-2">
                  <b>Return Date</b> <span className="text-danger">*{errors.ReturnDate}</span>
                  <input type="date" value={values.ReturnDate} onChange={handleChange} onBlur={handleBlur} id="ReturnDate" name="ReturnDate" className="form-control" />
                </div>

                {/* Buttons */}
                <div className="col-md-12 mb-2">
                  <button id="btnSave" type="submit" disabled={props.loading} className="btn btn-primary btn-lg">
                    {!props.loading ? "Save" : "Please Wait"}
                  </button>
                  &nbsp;
                  <button id="btnCancel" onClick={() => clearForm()} type="reset" className="btn btn-danger btn-lg">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
}

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { DebitSchema } from '../../Schema';
import { getData, postData } from '../../API';

export default function Debitpopup(props) {
  const [staffMasters, setStaffMasters] = useState([]);
  const [purchaseMasters, setPurchaseMasters] = useState([])
  const fetchData = async () => {
    try {
      const purchaseResponse = await getData("PurchaseMaster/List");
      const staffResponse = await getData("StaffMaster/List");

      if (purchaseResponse.status === "OK") {
        setPurchaseMasters(purchaseResponse.result);
      } else {
        console.log("Something went wrong while fetching purchases.");
      }

      if (staffResponse.status === "OK") {
        setStaffMasters(staffResponse.result);
      } else {
        console.log("Something went wrong while fetching staff.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { handleSubmit, handleChange, handleBlur, errors, values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: DebitSchema,
    onSubmit: async (values) => {
      const requestData = {
        PurchaseId: values.PurchaseId,
        StaffId: values.StaffId,
        Amount: values.Amount,
        NoteDate: values.NoteDate,
        NoteID: props.NoteId
      };
      console.log("Submitting Data:", requestData);
      try {
        props.setLoading(true);
        const result = await postData(
          props.NoteId === 0 ? "DebitNote/Save" : "DebitNote/Edit",
          requestData
        );
        console.log("API Response:", result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchDebitNotes();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error posting data:", error.message);
      } finally {
        props.setLoading(false);
        clearForm();
      }
    }
  });
  const clearForm = () => {
    handleReset();
    props.setShow(false);
  };


  useEffect(() => {
    fetchData();
    if (props.PurchaseId !== 0) {
      document.getElementById("drpPurchaseId").value = values.PurchaseId;
      document.getElementById("drpStaffId").value = values.StaffId;
    }
  }, [props.PurchaseId, values.StaffId, values.PurchaseId]);
  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header"><h4>Debit Note</h4><button type="button" onClick={() => props.setShow(false)} className="btn-close" /></div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12 mb-2">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <b>BillNo</b>&nbsp;<span className="text-danger">* {errors.PurchaseId}</span>
                      <select onChange={(e) => setFieldValue("PurchaseId", e.target.value)} name="PurchaseId" id="drpPurchaseId" className="form-select" >
                        <option value="">Select BillNo</option>
                        {purchaseMasters.map((o, index) => (<option value={o.purchaseId}>{o.billNo}</option>))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Staff</b>&nbsp;<span className="text-danger">*{errors.StaffId}</span>
                      <select onChange={(e) => setFieldValue("StaffId", e.target.value)} name="StaffId" id="drpStaffId" className="form-select">
                        <option value="">Select staff</option>
                        {staffMasters.map((o, index) => (<option value={o.staffId}>{o.fullName}</option>))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Amount</b> <span className="text-danger">*{errors.Amount}</span>
                      <input type="text" id="Amount" name="Amount" onBlur={handleBlur} onChange={handleChange} value={values.Amount} className="form-control" />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Note Date</b> <span className="text-danger">*{errors.NoteDate}</span>
                      <input type="date" id="NoteDate" name="NoteDate" onBlur={handleBlur} onChange={handleChange} value={values.NoteDate} className="form-control" />

                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <button id="btnSave" type="submit" disabled={props.loading} className="btn-custom btn-save">
                    {!props.loading ? "Save" : "Please Wait"}
                  </button>

                  <button id="btnCancel" onClick={clearForm} type="reset" className="btn-custom btn-cancel">Cancel</button>
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

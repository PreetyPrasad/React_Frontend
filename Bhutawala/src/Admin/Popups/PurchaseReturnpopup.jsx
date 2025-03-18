import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { PurchaseReturnSchema } from '../../Schema';
import { getData, postData } from '../../API';
import { errorAlert, successAlert } from '../../SweetAlert/SuccessAlert';
export default function PurchaseReturnpopup(props) {
  const { handleSubmit, handleChange, handleBlur, errors, values, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: PurchaseReturnSchema,
    onSubmit: async (values) => {
      const requestData = {
        purchaseId: values.purchaseId,
        invoiceId: values.invoiceId,
        qty: values.qty,
        unit: values.unit,
        total: values.total,
        returnDate: values.returnDate,
        PurchaseReturnId: props.PurchaseReturnId
      };
      console.log(requestData);
      try {
        props.setLoading(true);
        const result = await postData(
          props.PurchaseReturnId === 0 ? "PurchaseReturn/Save" : "PurchaseReturn/Edit",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          clearForm();
          successAlert("Success", "Successsfully Saved");
        }
        else {
          errorAlert("Error", "Already Exists");
        }
      }
      catch (error) {
        errorAlert("Error", error.message);
        console.error("Error posting data in component:", error.message);
      }
      finally {
        props.setLoading(false);
      }
    }
  });
  const clearForm = () => {
    props.setInitialValue({
      PurchaseReturnId: "",
      purchaseId: "",
      invoiceId: "",
      qty: "",
      unit: "",
      total: "",
      returnDate: "",
    });
    props.setShow(false);
    props.setPurchaseReturnId(0);
  }
  useEffect(() => {
    if (props.PurchaseReturnId != 0) {
      console.log(values)
      document.getElementById("drptotal").value = values.total;
      document.getElementById("drpunit").value = values.unit;
    }
  }, [props.PurchaseReturnId, values.total, values.unit]);
  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="Staff Master Modal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header"> <h4 className="modal-title">Staff Master</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>purchaseId</b>&nbsp;<span className='text-danger'>* {errors.purchaseId}</span>
                      <input type="text" value={values.purchaseId} onChange={handleChange} onBlur={handleBlur} id='purchaseId' name='purchaseId' className='form-control' placeholder='purchaseId' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>invoiceId</b> <span className='text-danger'>*{errors.invoiceId}</span>
                      <textarea type="text" value={values.invoiceId} onChange={handleChange} onBlur={handleBlur} id='invoiceId' name='invoiceId' className='form-control' placeholder='invoiceId' />
                    </div>
                    <div className="col-md-8 mb-2">
                      <b>qty</b> <span className='text-danger'>*{errors.qty}</span>
                      <input type="text" value={values.qty} onChange={handleChange} onBlur={handleBlur} id='qty' name='qty' className='form-control' placeholder='qty' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>returnDate</b> <span className='text-danger'>*{errors.returnDate}</span>
                      <input type="text" value={values.returnDate} onChange={handleChange} onBlur={handleBlur} id='returnDate' name='returnDate' className='form-control' placeholder='returnDate' />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <button id='btnSave' type='submit' disabled={!props.loading ? false : true} className='btn-custom btn-save'>{!props.loading ? "Save" : "Please Wait"}</button>&nbsp;
                  <button id='btnCancle' onClick={() => clearForm()} type='reset' className='btn-custom btn-cancel'>Cancle</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {
        props.show ? <div className="modal-backdrop show" /> : null
      }
    </>
  )
}


import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { purchasePaymentSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function PaymentPopup(props) {
  const [purchaseMasters, setPurchaseMasters] = useState([]);

  const fetchPurchaseMasters = async () => {
    try {
      const response = await getData("PurchaseMaster/List");
      console.log(response)
      if (response.status == "OK") {
        setPurchaseMasters(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const { handleSubmit, handleChange, handleBlur, errors, values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: purchasePaymentSchema,
    onSubmit: async (values) => {
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
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successsfully Saved");
          props.fetchPurchasePayments();
          clearForm();
        }
        else {
          alert("Already Exists");
        }
      }
      catch (error) {
        console.error("Error posting data in component:", error.message);
      }
      finally {
        props.setLoading(false);
      }
    }
  });

  const setContentValues = (fieldName, Value) => {
    setFieldValue(fieldName, Value);
  }

  const clearForm = () => {
    props.setInitialValue({
      PurchaseId: "",
      Amount: "",
      PaymentMode: "",
      RefNo: "",
      PaymentDate: "",
    });
    props.setShow(false);
  }

  useEffect(() => {
    fetchPurchaseMasters(); // Wait until fetchCategories() completes
    if (props.PaymentId !== 0) {
      document.getElementById("drpPurchaseId").value = values.PurchaseId;
    }
  }, [props.PaymentId, values.PurchaseId]);


  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Payment</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>Purchase</b>&nbsp;<span className='text-danger'>* {errors.PurchaseId}</span>
                      <select onChange={(e) => setContentValues("PurchaseId", e.target.value)} name="PurchaseId" id="drpPurchaseId" className='form-select'>
                        <option value="">Bill No</option>
                        {
                          purchaseMasters.map((o, index) => {
                            return <option value={o.purchaseId}>{o.billNo}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Amount</b> <span className='text-danger'>*{errors.Amount}</span>
                      <input type="text" value={values.Amount} onChange={handleChange} onBlur={handleBlur} id='Amount' name='Amount' className='form-control' placeholder='Amount' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>PaymentMode</b> <span className='text-danger'>*{errors.PaymentMode}</span>
                      <input type="text" value={values.PaymentMode} onChange={handleChange} onBlur={handleBlur} id='PaymentMode' name='PaymentMode' className='form-control' placeholder='PaymentMode' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>RefNo</b> <span className='text-danger'>*{errors.RefNo}</span>
                      <input type="text" value={values.RefNo} onChange={handleChange} onBlur={handleBlur} id='RefNo' name='RefNo' className='form-control' placeholder='RefNo' />
                    </div>

                    <div className="col-md-6 mb-2">
                      <b>Payment Date</b> <span className='text-danger'>*{errors.PaymentDate}</span>
                      <input type="Date" value={values.PaymentDate} onChange={handleChange} onBlur={handleBlur} id='PaymentDate' name='PaymentDate' className='form-control' placeholder='PaymentDate' />
                    </div>

                  </div>
                </div>
                <div className='col-md-6 mb-2'>
                  <div className="row">
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                   <button id='btnSave' type='submit' disabled={!props.loading ? false : true} className='btn btn-primary btn-lg'>{!props.loading ? "Save" : "Please Wait"}</button>&nbsp; 
                  <button id='btnCancle' onClick={() => clearForm()} type='reset' className='btn btn-danger btn-lg'>Cancle</button>
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

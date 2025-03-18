import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { InvoiceDetailSchema } from '../../Schema';
import { getData, postData } from '../../API';

export default function InvoiceDetailPopup(props) {
  const [materials, setMaterials] = useState([]);
  const [invoicemasters, setInvoiceMasters] = useState([]);
  const fetchInvoiceMasters = async () => {
    try {
      const financialYear = props.financialYear || 2025; // Use props or a default value
      const response = await getData(`InvoiceMaster/List/${financialYear}`);

      console.log("API Response:", response); // Debugging

      if (response.status === "OK") {
        setInvoiceMasters(response.result);
      } else {
        console.log("Something went wrong fetching invoice masters");
      }
    } catch (error) {
      console.error("Error fetching InvoiceMasters:", error);
    }
  };
  const fetchMaterials = async () => {
    try {
      const response = await getData("Material/List");
      if (response.status === "OK") {
        setMaterials(response.result);
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
    validationSchema: InvoiceDetailSchema,
    onSubmit: async (values) => {
      const requestData = {
        MaterialId: values.MaterialId,
        InvoiceId: values.InvoiceId,
        Rate: values.Rate,
        Qty: values.Qty,
        Unit: values.Unit,
        GSTAmount: values.GSTAmount,
        Total: values.Total,
        InvoiceDetailId: props.InvoiceDetailId
      };
      try {
        props.setLoading(true);
        const result = await postData(
          props.InvoiceDetailId === 0 ? "InvoiceDetail/Save" : "InvoiceDetail/Edit",
          requestData
        );
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchInvoiceDetails();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error posting data in component:", error.message);
      } finally {
        props.setLoading(false);
      }
    }
  });

  const clearForm = () => {
    props.setInitialValue({
      MaterialId: "",
      InvoiceId: "",
      Rate: "",
      Qty: "",
      Unit: "",
      GSTAmount: "",
      Total: ""
    });
    props.setShow(false);
  }

  useEffect(() => {
    fetchMaterials();
    if (props.InvoiceDetail !== 0) {
      setFieldValue("InvoiceId", props.initialValue.InvoiceId || "");
    }
  }, [props.InvoiceDetail, setFieldValue]);
  useEffect(() => {
    if (props.financialYear) {
      fetchInvoiceMasters();
    }
  }, [props.financialYear]); // Fetch data when financialYear changes


  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Material</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <b>Material</b>&nbsp;<span className='text-danger'>* {errors.MaterialId}</span>
                      <select onChange={(e) => setFieldValue("MaterialId", e.target.value)} name="MaterialId" id="drpMaterialId" className='form-select'>
                        <option value="">Select Category</option>
                        {materials.map((o) => (
                          <option key={o.materialId} value={o.materialId}>{o.materialId}</option>
                        ))}
                      </select>
                    </div>
                  
                  <div className='col-md-6 mb-2'>
                    <b>InvoiceMaster</b>&nbsp;<span className='text-danger'>* {errors.InvoiceId}</span>
                    <select onChange={(e) => setFieldValue("InvoiceId", e.target.value)}
                      name="InvoiceId"
                      id="drpInvoiceId"
                      className='form-select'>
                      <option value="">Select Invoice</option>
                      {invoicemasters.length > 0 ? (
                        invoicemasters.map((o) => (
                          <option key={o.invoiceId} value={o.invoiceId}>{o.invoiceId}</option>
                        ))
                      ) : (
                        <option disabled>No Invoices Available</option>
                      )}
                    </select>
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>Qty</b> <span className='text-danger'>*{errors.Qty}</span>
                      <input type="text" value={values.Qty} onChange={handleChange} onBlur={handleBlur} id='Qty'
                        name='Qty' className='form-control' placeholder='Qty' />
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>Unit</b> <span className='text-danger'>*{errors.Unit}</span>
                      <input type="text" value={values.Unit} onChange={handleChange} onBlur={handleBlur} id='Unit' name='Unit'
                        className='form-control' placeholder='Unit' />
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>GST Amount</b> <span className='text-danger'>*{errors.GSTAmount}</span>
                      <input type="text" value={values.GSTAmount} onChange={handleChange} onBlur={handleBlur} id='GSTAmount' name='GSTAmount'
                        className='form-control' placeholder='GSTAmount' />
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>Total</b> <span className='text-danger'>*{errors.Total}</span>
                      <input type="text" value={values.Total} onChange={handleChange} onBlur={handleBlur} id='Total' name='Total'
                        className='form-control' placeholder='Total' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Rate</b> <span className='text-danger'>*{errors.Rate}</span>
                      <input type="text" value={values.Rate} onChange={handleChange} onBlur={handleBlur} id='Rate' name='Rate'
                        className='form-control' placeholder='Rate' />
                    </div>
                  </div>
                  </div>                
                <div className="col-md-12 mb-2">
                  <button type='submit' disabled={props.loading} className='btn-custom btn-save'>
                    {props.loading ? "Please Wait" : "Save"}
                  </button>
                  &nbsp;
                  <button onClick={clearForm} type='reset' className='btn-custom btn-cancel'>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

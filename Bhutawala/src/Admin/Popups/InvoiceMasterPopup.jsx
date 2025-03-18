import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { InvoiceMasterSchema } from '../../Schema/index';
import { getData, postData } from '../../API';

export default function InvoiceMasterPopup(props) {
  const [staff, setStaff] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const fetchData = async () => {
    try {
      const Staffresponse = await getData("StaffMaster/List");
      const Transactionresponse = await getData("TransactionYearMaster/List");
      console.log(Staffresponse)
      if (Staffresponse.status == "OK") {
        setStaff(Staffresponse.result);
        console.log(Staffresponse.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }

    try {
      console.log(Transactionresponse)
      if (Transactionresponse.status == "OK") {
        setTransaction(Transactionresponse.result);
        console.log(Transactionresponse.result);
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
    validationSchema: InvoiceMasterSchema,
    onSubmit: async (values) => {
      const requestData = {
        InvoiceNo: values.InvoiceNo,
        CustomerName: values.CustomerName,
        ContactNo: values.ContactNo,
        TotalGross: values.TotalGross,
        GST: values.GST,
        GST_Type: values.GST_Type,
        Total: values.Total,
        InvoiceDate: values.InvoiceDate,
        NoticePeriod: values.NoticePeriod,
        GSTIN: values.GSTIN,
        StaffId: values.StaffId,
        TransactionYearId: values.TransactionYearId,
        InvoiceId: props.InvoiceId

      };
      console.log(requestData);

      try {
        props.setLoading(true);
        const result = await postData(
          props.InvoiceId === 0 ? "InvoiceMaster/Save" : "InvoiceMaster/Edit",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successsfully Saved");
          props.fetchInvoices();
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
      InvoiceId: "",
      StaffId: "",
      TransactionYearId: "",
      InvoiceNo: "",
      CustomerName: "",
      ContactNo: "",
      TotalGross: "",
      GST: "",
      GST_Type: "",
      Total: "",
      InvoiceDate: "",
      NoticePeriod: "",
      GSTIN: "",
    });
    props.setShow(false);
    props.setInvoiceId(0);
  }

  useEffect(() => {
    fetchData();
    if (props.InvoiceId !== 0) {
      document.getElementById("drpStaffId").value = values.StaffId;
      document.getElementById("drpTransactionYearId").value = values.TransactionYearId;
    }
  }, [props.InvoiceId, values.TransactionYearId, values.StaffId]);

  const setContentsValues = (fieldName, Value) => {
    setFieldValue(fieldName, Value);

    if (fieldName === "GrossTotal" || fieldName === "GST") {
      const totalGross = parseFloat(fieldName === "TotalGross" ? Value : values.TotalGross || 0);
      const gst = parseFloat(fieldName === "GST" ? Value : values.GST || 0);

      setFieldValue("Total", totalGross + gst);
    }
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="InvoiceModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header"><h4 className="modal-title">Invoice</h4><button type="button" onClick={() => props.setShow(false)} className="btn-close" /> </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <b>InvoiceId</b> <span className='text-danger'>*{errors.InvoiceId}</span>
                      <input type="text" value={values.InvoiceId} onChange={handleChange} onBlur={handleBlur} id='InvoiceId' name='InvoiceId' className='form-control' placeholder='InvoiceId' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>InvoiceNo</b> <span className='text-danger'>*{errors.InvoiceNo}</span>
                      <input type="text" value={values.InvoiceNo} onChange={handleChange} onBlur={handleBlur} id='InvoiceNo' name='InvoiceNo' className='form-control' placeholder='InvoiceNo' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>StaffId</b>&nbsp;<span className='text-danger'>* {errors.StaffId}</span>
                      <select onChange={(e) => setContentValues("StaffId", e.target.value)} name="StaffId" id="drpStaffId" className='form-select'>
                        <option value="">Select Staff</option>
                        {
                          staff.map((o, index) => {
                            return <option value={o.staffId}>{o.fullName}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-4 mb-2">
                      <b>TransactionYear</b>&nbsp;<span className='text-danger'>* {errors.TransactionYearId}</span>
                      <select onChange={(e) => setContentValues("TransactionYearId", e.target.value)} name="TransactionYearId" id="drpTransactionYearId" className='form-select'>
                        <option value=""> TransactionYear</option>
                        {
                          transaction.map((o, index) => {
                            return <option key={index} value={o.transactionYearId}>{o.yearName}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-4 mb-2">
                      <b>CustomerName</b> <span className='text-danger'>*{errors.CustomerName}</span>
                      <input type="text" value={values.CustomerName} onChange={handleChange} onBlur={handleBlur} id='CustomerName' name='CustomerName' className='form-control' placeholder='CustomerName' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>ContactNo</b> <span className='text-danger'>*{errors.ContactNo}</span>
                      <input type="Date" value={values.ContactNo} onChange={handleChange} onBlur={handleBlur} id='ContactNo' name='ContactNo' className='form-control' placeholder='ContactNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>GST Type</b> <span className='text-danger'>*{errors.GST_Type}</span>
                      <select onChange={(e) => setContentValues("GST_Type", e.target.value)} name="GST_Type"
                        id="drpGST_Type" className='form-select'>
                        <option value="">Select GST-Type</option>
                        <option value="CGST & SGST">CGST & SGST</option>
                        <option value="IGST">IGST</option>
                        <option value="UTGST">UTGST</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>GST </b> <span className='text-danger'>*{errors.GST}</span>
                      <input type="number" value={values.GST} onChange={(e) => setContentsValues("GST", e.target.value)} onBlur={handleBlur} id='GST' name='GST' className='form-control' placeholder='GST ' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>TotalGross</b> <span className='text-danger'>*{errors.TotalGross}</span>
                      <input type="number" value={values.TotalGross} onChange={(e) => setContentsValues("TotalGross", e.target.value)} onBlur={handleBlur} id='TotalGross' name='TotalGross' className='form-control' placeholder='TotalGross' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Total</b> <span className='text-danger'>*{errors.NoticePeriod}</span>
                      <input type="number" value={values.Total || 0} readOnly id='Total' name='Total' className='form-control' placeholder='Total' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>InvoiceDate</b> <span className='text-danger'>*{errors.InvoiceDate}</span>
                      <input type="Date" value={values.InvoiceDate} onChange={(e) => setContentsValues("InvoiceDate", e.target.value)} onBlur={handleBlur} id='InvoiceDate' name='InvoiceDate' className='form-control' placeholder='InvoiceDate' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b> NoticePeriod</b> <span className='text-danger'>*{errors.NoticePeriod}</span>
                      <input type="Date" value={values.NoticePeriod} onChange={handleChange} onBlur={handleBlur} id='NoticePeriod' name='NoticePeriod' className='form-control' placeholder='NoticePeriod' />
                    </div>
                    <div className='col-md-8 mb-2'>
                      <div className="col-md-12 mb-2">
                        <b>GSTIN</b> <span className='text-danger'>*{errors.GSTIN}</span>
                        <input type="text" value={values.GSTIN} onChange={handleChange} onBlur={handleBlur} id='GSTIN' name='GSTIN' className='form-control' placeholder='GSTIN' />
                      </div>
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

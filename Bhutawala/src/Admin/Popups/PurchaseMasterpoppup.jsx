
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { PurchaseMasterSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function PurchaseMasterpoppup(props) {
  const [suppliers, setSuppliers] = useState([]);
  const [transactionYears, setTransactionYears] = useState([]);

  const fetchTransactiion_Suppliers = async () => {
    try {
      const Supplierresponse = await getData("Supplier/List");
      const TransactionYearresponse = await getData("TransactionYear/List");
      console.log(Supplierresponse)
      if (Supplierresponse.status == "OK") {
        setSuppliers(Supplierresponse.result);
        console.log(Supplierresponse.result);
      } else {
        console.log("Something went wrong");
      }
      if (TransactionYearresponse.status == "OK") {
        setTransactionYears(TransactionYearresponse.result);
        console.log(TransactionYearresponse.result);
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
    validationSchema: PurchaseMasterSchema,
    onSubmit: async (values) => {
      const requestData = {
        SupplierId: values.SupplierId,
        TransactionYearId: values.TransactionYearId,
        GrossTotal: values.GrossTotal,
        GST: values.GST,
        GST_Type: values.GST_Type,
        Total: values.Total,
        PurchaseDate: values.PurchaseDate,
        BillNo: values.BillNo,
        NoticePeriod: values.NoticePeriod,
        PurchaseId: props.PurchaseId

      };
      console.log(requestData);

      try {
        props.setLoading(true);
        const result = await postData(
          props.PurchaseId === 0 ? "PurchaseMaster/Save" : "PurchaseMaster/Edit",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successsfully Saved");
          props.fetchPurchaseMasters();
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
      SupplierId: "",
      TransactionYearId: "",
      GrossTotal: "",
      GST: "",
      GST_Type: "",
      Total: "",
      PurchaseDate: "",
      BillNo: "",
      NoticePeriod: "",
      Note: ""

    });
    props.setShow(false);
    props.setPurchaseId(0);
  }


  useEffect(() => {
    fetchTransactiion_Suppliers();
    if (props.PurchaseId !== 0) {
      document.getElementById("drpSupplierId").value = values.SupplierId;
      document.getElementById("drpTransactionYearId").value = values.TransactionYearId;
    }
  }, [props.PurchaseId, values.TransactionYearId, values.SupplierId]);


  const setContentsValues = (fieldName, Value) => {
    setFieldValue(fieldName, Value);

    if (fieldName === "GrossTotal" || fieldName === "GST") {
      const grossTotal = parseFloat(fieldName === "GrossTotal" ? Value : values.GrossTotal || 0);
      const gst = parseFloat(fieldName === "GST" ? Value : values.GST || 0);

      setFieldValue("Total", grossTotal + gst);
    }
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header"><h4 className="modal-title">Purchase</h4><button type="button" onClick={() => props.setShow(false)} className="btn-close" /> </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <b>Supplier</b>&nbsp;<span className='text-danger'>* {errors.SupplierId}</span>
                      <select onChange={(e) => setContentValues("SupplierId", e.target.value)} name="SupplierId" id="drpSupplierId" className='form-select'>
                        <option value="">Select Category</option>
                        {
                          suppliers.map((o, index) => {
                            return <option value={o.supplierId}>{o.businessName}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>BillNo</b> <span className='text-danger'>*{errors.BillNo}</span>
                      <input type="text" value={values.BillNo} onChange={handleChange} onBlur={handleBlur} id='BillNo' name='BillNo' className='form-control' placeholder='BillNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>TransactionYear</b>&nbsp;<span className='text-danger'>* {errors.TransactionYearId}</span>
                      <select onChange={(e) => setContentValues("TransactionYearId", e.target.value)} name="TransactionYearId" id="drpTransactionYearId" className='form-select'>
                        <option value=""> TransactionYear</option>
                        {
                          transactionYears.map((o, index) => {
                            return <option key={index} value={o.transactionYearId}>{o.yearName}</option>
                          })
                        }
                      </select>
                    </div>

                    <div className="col-md-4 mb-2">
                      <b>PurchaseDate</b> <span className='text-danger'>*{errors.PurchaseDate}</span>
                      <input type="Date" value={values.PurchaseDate} onChange={handleChange} onBlur={handleBlur} id='PurchaseDate' name='PurchaseDate' className='form-control' placeholder='PurchaseDate' />
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
                      <b>GST Amount</b> <span className='text-danger'>*{errors.GST}</span>
                      <input type="number" value={values.GST} onChange={(e) => setContentsValues("GST", e.target.value)} onBlur={handleBlur} id='GST' name='GST' className='form-control' placeholder='GST Amount' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>GrossTotal</b> <span className='text-danger'>*{errors.GrossTotal}</span>
                      <input type="number" value={values.GrossTotal} onChange={(e) => setContentsValues("GrossTotal", e.target.value)} onBlur={handleBlur} id='GrossTotal' name='GrossTotal' className='form-control' placeholder='GrossTotal' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b> Total</b> <span className='text-danger'>*{errors.NoticePeriod}</span>
                      <input type="number" value={values.Total || 0} readOnly id='Total' name='Total' className='form-control' placeholder='Total' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b> NoticePeriod</b> <span className='text-danger'>*{errors.NoticePeriod}</span>
                      <input type="Date" value={values.NoticePeriod} onChange={handleChange} onBlur={handleBlur} id='NoticePeriod' name='NoticePeriod' className='form-control' placeholder='NoticePeriod' />
                    </div>
                    <div className='col-md-8 mb-2'>
                      <div className="col-md-12 mb-2">
                        <b>Note</b> <span className='text-danger'>*{errors.Note}</span>
                        <textarea value={values.Note} onChange={handleChange} onBlur={handleBlur} id='Note' name='Note' className='form-control' placeholder='Note' />
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


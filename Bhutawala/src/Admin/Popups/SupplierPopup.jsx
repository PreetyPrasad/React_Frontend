import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { SupplierSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function SupplierPopup(props) {
  const { handleSubmit, handleChange, handleBlur, errors, values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: SupplierSchema,
    onSubmit: async (values) => {
      const requestData = {

        BusinessName: values.BusinessName,
        ContactPerson: values.ContactPerson,
        ContactNo: values.ContactNo,
        Address: values.Address,
        City: values.City,
        State: values.State,
        PinCode: values.PinCode,
        GSTIN: values.GSTIN,
        PAN: values.PAN,
        BanckBranch: values.BanckBranch,
        IFSC: values.IFSC,
        AccountNo: values.AccountNo,
        BankName: values.BankName,
        // LogDate: "",
        Email: values.Email,
        SupplierId: props.SupplierId
      };
      console.log(requestData);

      try {
        props.setLoading(true);
        const result = await postData(
          props.SupplierId === 0 ? "Supplier/Save" : "Supplier/EditSupplier",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successsfully Saved");
          props.fetchSuppliers();
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
      BusinessName: "",
      ContactPerson: "",
      ContactNo: "",
      Address: "",
      City: "",
      State: "",
      PinCode: "",
      GSTIN: "",
      PAN: "",
      BanckBranch: "",
      IFSC: "",
      AccountNo: "",
      BankName: "",
      // LogDate: "",
      Email: "",
    });
    props.setShow(false);
    props.setSupplierId(0);
  }

  useEffect(() => {

    if (props.SupplierId !== 0) {
      document.getElementById("drpCity").value = values.City;
      document.getElementById("drpState").value = values.State;
    }
  }, [props.SupplierId, values.City, values.State]);


  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="SupplierModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Suppliers</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <b>BusinessName</b>&nbsp;<span className='text-danger'>* {errors.BusinessName}</span>
                      <input type="text" value={values.BusinessName} onChange={handleChange} onBlur={handleBlur} id='BusinessName' name='BusinessName' className='form-control' placeholder='BusinessName' />
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>ContactPerson</b> <span className='text-danger'>*{errors.ContactPerson}</span>
                      <input type="text" value={values.ContactPerson} onChange={handleChange} onBlur={handleBlur} id='ContactPerson' name='ContactPerson' className='form-control' placeholder='ContactPerson' />
                    </div>
                    <div className="col-md-3 mb-2">
                      <b>ContactNo</b> <span className='text-danger'>*{errors.ContactNo}</span>
                      <input type="text" value={values.ContactNo} onChange={handleChange} onBlur={handleBlur} id='ContactNo' name='ContactNo' className='form-control' placeholder='ContactNo' />
                    </div>
                    <div className="col-md-8 mb-2">
                      <b>Address</b> <span className='text-danger'>*{errors.Address}</span>
                      <input type="text" value={values.Address} onChange={handleChange} onBlur={handleBlur} id='Address' name='Address' className='form-control' placeholder='Address' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Email</b> <span className='text-danger'>*{errors.Email}</span>
                      <input type="text" value={values.Email} onChange={handleChange} onBlur={handleBlur} id='Email' name='Email' className='form-control' placeholder='Email' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>State</b> <span className='text-danger'>*{errors.State}</span>
                      <select onChange={(e) => setContentValues("State", e.target.value)} name="State" id="drpState" className='form-select'>
                        <option value="">Select State</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="NEW YORK">NEW YORK</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>City</b> <span className='text-danger'>*{errors.City}</span>
                      <select onChange={(e) => setContentValues("City", e.target.value)} name="City" id="drpCity" className='form-select'>
                        <option value="">Select City</option>
                        <option value="BHARUCH">BHARUCH</option>
                        <option value="SURAT">SURAT</option>
                        <option value="MUMBAI">MUMBAI</option>
                        <option value="New York City">NEW YORK CITY</option>
                        <option value="Jaipur ">Jaipur </option>
                        <option value="Lucknow ">Lucknow </option>

                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>PinCode</b> <span className='text-danger'>*{errors.PinCode}</span>
                      <input type="text" value={values.PinCode} onChange={handleChange} onBlur={handleBlur} id='PinCode' name='PinCode' className='form-control' placeholder='PinCode' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>GSTIN</b> <span className='text-danger'>*{errors.GSTIN}</span>
                      <input type="text" value={values.GSTIN} onChange={handleChange} onBlur={handleBlur} id='GSTIN' name='GSTIN' className='form-control' placeholder='GSTIN' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>PAN</b> <span className='text-danger'>*{errors.PAN}</span>
                      <input type="text" value={values.PAN} onChange={handleChange} onBlur={handleBlur} id='PAN' name='PAN' className='form-control' placeholder='PAN' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Bank Branch</b> <span className='text-danger'>*{errors.BanckBranch}</span>
                      <input type="text" value={values.BanckBranch} onChange={handleChange} onBlur={handleBlur} id='BanckBranch' name='BanckBranch' className='form-control' placeholder='BanckBranch' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Bank Name</b> <span className='text-danger'>*{errors.BankName}</span>
                      <input type="text" value={values.BankName} onChange={handleChange} onBlur={handleBlur} id='BankName' name='BankName' className='form-control'
                        placeholder='BankName' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Account No</b> <span className='text-danger'>*{errors.AccountNo}</span>
                      <input type="text" value={values.AccountNo} onChange={handleChange} onBlur={handleBlur} id='AccountNo' name='AccountNo' className='form-control'
                        placeholder='AccountNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>IFSC</b> <span className='text-danger'>*{errors.IFSC}</span>
                      <input type="text" value={values.IFSC} onChange={handleChange} onBlur={handleBlur} id='IFSC' name='IFSC' className='form-control' placeholder='IFSC' />
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
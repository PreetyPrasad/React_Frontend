import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { StaffMasterSchema } from '../../Schema';
import { getData, postData } from '../../API';
import { errorAlert, successAlert } from '../../SweetAlert/SuccessAlert';
export default function StaffPopup(props) {
  const { handleSubmit, handleChange, handleBlur, errors, values, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: StaffMasterSchema,
    onSubmit: async (values) => {
      const requestData = {
        FullName: values.FullName,
        Address: values.Address,
        ContactNo: values.ContactNo,
        Category: values.Category,
        Qualification: values.Qualification,
        AdharNo: values.AdharNo,
        Age: values.Age,
        Dj: values.Dj,
        Email: values.Email,
        StaffId: props.StaffId
      };

      console.log(requestData);

      try {
        props.setLoading(true);
        const result = await postData(
          props.StaffId === 0 ? "StaffMaster/Save" : "StaffMaster/Edit",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          clearForm();
          successAlert("Success", "Successsfully Saved");
          props.fetchStaffMaster();
          // resetForm();
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
  const setContentValues = (fieldName, Value) => {
    setFieldValue(fieldName, Value);
  }
  const clearForm = () => {
    props.setInitialValue({
      StaffId: "",
      FullName: "",
      Address: "",
      ContactNo: "",
      Category: "",
      Qualification: "",
      AdharNo: "",
      Age: "",
      Dj: "",
      Email: "",
    });
    props.setShow(false);
    props.setStaffId(0);
  }
  useEffect(() => {
    if (props.StaffId != 0) {
      console.log(values)
      document.getElementById("drpQualification").value = values.Qualification;
      document.getElementById("drpCategory").value = values.Category;
    }
  }, [props.StaffId, values.Qualification, values.Category]);

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="Staff Master Modal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Staff Master</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-2'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>FullName</b>&nbsp;<span className='text-danger'>* {errors.FullName}</span>
                      <input type="text" value={values.FullName} onChange={handleChange} onBlur={handleBlur} id='FullName' name='FullName' className='form-control' placeholder='FullName' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Address</b> <span className='text-danger'>*{errors.Address}</span>
                      <textarea type="text" value={values.Address} onChange={handleChange} onBlur={handleBlur} id='Address' name='Address' className='form-control' placeholder='Address' />
                    </div>
                    <div className="col-md-8 mb-2">
                      <b>ContactNo</b> <span className='text-danger'>*{errors.ContactNo}</span>
                      <input type="text" value={values.ContactNo} onChange={handleChange} onBlur={handleBlur} id='ContactNo' name='ContactNo' className='form-control' placeholder='ContactNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Category</b> <span className='text-danger'>*{errors.Category}</span>
                      <select onChange={(e) => setContentValues("Category", e.target.value)} name="drpCategory" id="drpCategory" className='form-select'>
                        <option value="">Select Category</option>
                        <option value="STOCK MANAGER">STOCK MANAGER</option>
                        <option value="SALES MANAGER">SALES MANAGER</option>
                        <option value="WORKER">WORKER</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Qualification</b> <span className='text-danger'>*{errors.Qualification}</span>
                      <select onChange={(e) => setContentValues("Qualification", e.target.value)} name="drpQualification" id="drpQualification" className='form-select'>
                        <option value="">Select Qualification</option>
                        <option value="10th Pass">10th Pass</option>
                        <option value="12th Pass">12th Pass</option>
                        <option value="GRADUATION">GRADUATION</option>
                        <option value="MASTER">MASTER</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>AdharNo</b> <span className='text-danger'>*{errors.AdharNo}</span>
                      <input type="text" value={values.AdharNo} onChange={handleChange} onBlur={handleBlur} id='AdharNo' name='AdharNo' className='form-control' placeholder='AdharNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Age</b> <span className='text-danger'>*{errors.Age}</span>
                      <input type="text" value={values.Age} onChange={handleChange} onBlur={handleBlur} id='Age' name='Age' className='form-control' placeholder='Age' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Date Of Joining</b> <span className='text-danger'>*{errors.Dj}</span>
                      <input type="Date" value={values.Dj} max={new Date().toISOString().split("T")[0]} onChange={handleChange} onBlur={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (selectedDate > today) {
                          alert("Date of Joining cannot be a future date.");
                          setFieldValue('Dj', '');
                        }
                      }} id='Dj' name='Dj' className='form-control' placeholder='Date Of Joining    ' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Email</b> <span className='text-danger'>*{errors.Email}</span>
                      <input type="text" value={values.Email} onChange={handleChange} onBlur={handleBlur} id='Email' name='Email' className='form-control' placeholder='Email' />
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

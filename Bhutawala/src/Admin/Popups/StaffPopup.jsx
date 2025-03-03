
import { useFormik } from 'formik';
import { StaffMasterSchema } from '../../Schema';
import { getData, postData } from '../../API';


export default function StaffPopup(props) {

  const { handleSubmit, handleChange, handleBlur, errors, values, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: StaffMasterSchema,
    onSubmit: async (values) => {
      const requestData = {
        FullName: values.FullName,
        Address: values.Address,
        Category: values.Category,
        Qualification: values.Qualification,
        AdharNo: values.AdharNo,
        Age: values.Age,
        Dj: values.Dj,
        Email: values.Email,
      
        StaffId: props.StaffId
      };

      console.log("Sending Request:", requestData);

      try {
        props.setLoading(true);
        const result = await postData(
          props.StaffId === 0 ? "StaffMaster/Save" : "StaffMaster/Edit",
          requestData
        );

        console.log("Response from API:", result); // Debugging

        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchStaffs(); // Refresh data
        } else {
          alert("Error: " + (result.message || "Already Exists"));
        }
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        props.setLoading(false);
        clearForm();
      }
    }
  });

  // const setContentValues = (fieldName, Value) => {
  // setFieldValue(fieldName, Value);
  // }

  const clearForm = () => {
    props.setInitialValue({
      StaffId: "",
      FullName: '',
      Address: '',
      Category: '',
      Qualification: '',
      AdharNo: '',
      Age: '',
      Dj: '',
      Email: '',
     
    });
    props.setShow(false);
    props.setStaffId(0);
  }


  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="SupplierModal">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Staff</h4>
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
                      <input type="text" value={values.Address} onChange={handleChange} onBlur={handleBlur} id='Address' name='Address' className='form-control' placeholder='Address' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Category</b> <span className='text-danger'>*{errors.Category}</span>
                      <input type="text" value={values.Category} onChange={handleChange} onBlur={handleBlur} id='Category' name='Category'
                        className='form-control' placeholder='Category' />

                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Qualification</b> <span className='text-danger'>*{errors.Qualification}</span>
                      <input type="text" value={values.Qualification} onChange={handleChange} onBlur={handleBlur} id='Qualification' name='Qualification' className='form-control' placeholder='Qualification' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Age</b> <span className='text-danger'>*{errors.Age}</span>
                      <input type="text" value={values.Age} onChange={handleChange} onBlur={handleBlur} id='Age' name='Age' className='form-control' placeholder='Age' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>AdharNo</b> <span className='text-danger'>*{errors.AdharNo}</span>
                      <input type="text" value={values.AdharNo} onChange={handleChange} onBlur={handleBlur} id='AdharNo' name='AdharNo' className='form-control' placeholder='AdharNo' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Dj</b> <span className='text-danger'>*{errors.Dj}</span>
                      <input type="date" value={values.Dj} onChange={handleChange} onBlur={handleBlur} id='Dj' name='Dj' className='form-control' placeholder='Dj' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Email</b> <span className='text-danger'>*{errors.Email}</span>
                      <input type="email" value={values.Email} onChange={handleChange} onBlur={handleBlur} id='Email' name='Email' className='form-control' placeholder='Email' />
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

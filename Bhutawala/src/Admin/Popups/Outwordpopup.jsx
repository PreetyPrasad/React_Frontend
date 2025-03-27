
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react';
import { OutwordSchema } from '../../Schema';
import { getData, postData } from '../../API';
import { errorAlert, successAlert } from '../../SweetAlert/SuccessAlert';

export default function Outwordpopup(props) {
  const [StaffMasters, setStaffMasters] = useState([]);

  const fetchSStaff = async () => {
    try {
      const response = await getData("StaffMaster/List");
      console.log(response)
      if (response.status == "OK") {
        setStaffMasters(response.result);
        console.log(response.result);

      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("fetching data in component:", error);
    }
  };


  const { handleSubmit, handleChange, handleBlur, errors, values, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: OutwordSchema,
    onSubmit: async (values) => {
      const requestData = {
        StaffId: values.StaffId,
        Reason: values.Reason,
        Givento: values.Givento,
        ContactNo: values.ContactNo,
        OutwordDate: values.OutwordDate,
        OutwordId: props.OutwordId
      };

      try {
        props.setLoading(true);
        const result = await postData(
          props.OutwordId == 0 ? "OutwordMaster/Save" : "OutwordMaster/Edit",
          requestData
        );
        console.log(result);
        resetForm();
        if (result.status.toUpperCase() === "OK") {

          successAlert("Saved", "Successfully Saved.!");
          props.fetchSStaff();

          clearForm();

        }
        else {
          console.log(result);
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
      StaffId: "",
      Reason: "",
      Givento: "",
      ContactNo: "",
      OutwordDate: "",

    });
    props.setShow(false);
  }

  useEffect(() => {
    fetchSStaff();
  }, []);

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog  model-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Outword</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-3'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>Staff</b>&nbsp;<span className='text-danger'>* {errors.StaffId}</span>
                      <select onChange={(e) => setContentValues("StaffId", e.target.value)} name="StaffId" id="drpStaffId" className='form-select'>
                        <option value="">staff</option>
                        {
                          StaffMasters.map((o, index) => {
                            return <option value={o.staffId}>{o.staffId}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-12 mb-2">
                      <b>Reason</b> <span className='text-danger'>*{errors.Reason}</span>
                      <input type="text" value={values.Reason} onChange={handleChange} onBlur={handleBlur} id='Reason' name='Reason' className='form-control' placeholder='Reason' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>ContactNo</b> <span className='text-danger'>*{errors.ContactNo}</span>
                      <input type="text" value={values.ContactNo} onChange={handleChange} onBlur={handleBlur} id='ContactNo' name='ContactNo' className='form-control' placeholder='Contact No +91 XXXXXXXXXX' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b> Outword Date</b> <span className='text-danger'>*{errors.OutwordDate}</span>
                      <input type="Date" value={values.OutwordDate} onChange={handleChange} onBlur={handleBlur} id='OutwordDate' name='OutwordDate' className='form-control' placeholder='Net ContactNo' />
                    </div>
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

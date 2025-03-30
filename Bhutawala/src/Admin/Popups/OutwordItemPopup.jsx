
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { OutwordItemsSchema } from '../../Schema';
import { getData, postData } from '../../API';
import { errorAlert, successAlert } from '../../SweetAlert/SuccessAlert';

export default function OutwordItemPopup(props) {
  const [Materials, setMaterials] = useState([]);
  const [OutwordItems, setOutwordItems] = useState([]);
  const fetchMaterial_OutwordItems = async () => {
    try {
      const Materialresponse = await getData("Material/List");
      const OutwordItemresponse = await getData("OutwordMaster/List");
      console.log(Materialresponse)
      if (Materialresponse.status == "OK") {
        setMaterials(Materialresponse.result);
        console.log(Materialresponse.result);
      } else {
        console.log("Something went wrong");
      }
      if (OutwordItemresponse.status == "OK") {
        setOutwordItems(OutwordItemresponse.result);
        console.log(OutwordItemresponse.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  useEffect(() => {
    fetchMaterial_OutwordItems();
  }, []);
  const { handleSubmit, handleChange, handleBlur, errors, values, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: OutwordItemsSchema,
    onSubmit: async (values) => {
      const requestData = {
        MaterialId: values.MaterialId,
        OutwordId: values.OutwordId,
        Qty: values.Qty,
        OutwordStockId: props.OutwordStockId
      };
      try {
        props.setLoading(true);
        const result = await postData(
          props.OutwordStockId === 0 ? "OutwordItem/Save" : "OutwordItem/Edit",
          requestData
        );
        if (result.status.toUpperCase() === "OK") {
          successAlert("Success", "Outword saved successfully!");
          props.fetchOutwords();
          resetForm();
          props.setShow(false);
        } else {
          errorAlert("Error", "Failed to save the outword.");
        }
      } catch (error) {
        errorAlert("Error saving data", error.message);
      } finally {
        props.setLoading(false);
      }
    }
  });
  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="MaterialModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header"><h4 className="modal-title">Outword</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className='col-md-12 mb-3'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>Material</b>&nbsp;<span className='text-danger'>* {errors.MaterialId}</span>
                      <select value={values.MaterialId} onChange={handleChange} onBlur={handleBlur} name="MaterialId" id="drpMaterialId" className='form-select'>
                        <option value="">Select Material</option>
                        {
                          Materials.map((o, index) => {
                            return <option value={o.MaterialId}>{o.
                              materialName}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-12 mb-2">
                      <b>OutwordItem</b>&nbsp;<span className='text-danger'>* {errors.OutwordId}</span>
                      <select value={values.OutwordId} onChange={handleChange} onBlur={handleBlur} name="OutwordId" id="drpMaterialId" className='form-select'>
                        <option value="">Select Material</option>
                        {
                          OutwordItems.map((o, index) => {
                            return <option value={o.OutwordId}>{o.
                              givento}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-12 mb-2">
                      <b>Qty</b> <span className='text-danger'>*{errors.Qty}</span>
                      <input type="text" value={values.qty} onChange={handleChange} onBlur={handleBlur} id='Qty' name='Qty' className='form-control' placeholder='Reason' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Outword Date</b> <span className='text-danger'>*{errors.OutwordDate}</span>
                      <input type="date" value={values.OutwordDate} onChange={handleChange} onBlur={handleBlur} id='OutwordDate' name='OutwordDate' className='form-control' />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <button type='submit' disabled={props.loading} className='btn btn-primary btn-lg'> {!props.loading ? "Save" : "Please Wait"}</button> &nbsp;
                  <button type='button' onClick={() => props.setShow(false)} className='btn btn-danger btn-lg' >  Cancel </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show && <div className="modal-backdrop show"></div>}
    </>
  );
}

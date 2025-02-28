import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MaterialSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function MaterialPopup(props) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getData("Category/List");
      console.log(response)
      if (response.status == "OK") {
        setCategories(response.result);
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
    validationSchema: MaterialSchema,
    onSubmit: async (values) => {
      const requestData = {
        CategoryId: values.CategoryId,
        MaterialName: values.MaterialName,
        Unit: values.Unit,
        Qty: values.Qty,
        Net_Qty: values.Net_Qty,
        Description: values.Description,
        Brand: values.Brand,
        GST: values.GST,
        GST_Type: values.GST_Type,
        MaterialId: props.MaterialId
      };
      try {
        props.setLoading(true);
        const result = await postData(
          props.MaterialId === 0 ? "Material/Save" : "Material/Edit",
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successsfully Saved");
          props.fetchMaterials();
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
      CategoryId: "",
      MaterialName: "",
      Unit: "",
      Qty: "",
      Net_Qty: "",
      Description: "",
      Brand: "",
      GST: "",
      GST_Type: ""
    });
    props.setShow(false);
  }

  useEffect(() => {
    fetchCategories(); // Wait until fetchCategories() completes
    if (props.MaterialId !== 0) {
      document.getElementById("drpCategoryId").value = values.CategoryId;
      document.getElementById("drpUnit").value = values.Unit;
      document.getElementById("drpGST_Type").value = values.GST_Type;
    }
  }, [props.MaterialId, values.CategoryId, values.Unit, values.GST_Type]);


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
                <div className='col-md-6 mb-2'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>Category</b>&nbsp;<span className='text-danger'>* {errors.CategoryId}</span>
                      <select onChange={(e) => setContentValues("CategoryId", e.target.value)} name="CategoryId" id="drpCategoryId" className='form-select'>
                        <option value="">Select Category</option>
                        {
                          categories.map((o, index) => {
                            return <option value={o.categoryId}>{o.categoryName}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Brand</b> <span className='text-danger'>*{errors.Brand}</span>
                      <input type="text" value={values.Brand} onChange={handleChange} onBlur={handleBlur} id='Brand' name='Brand' className='form-control' placeholder='Brand' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>Name</b> <span className='text-danger'>*{errors.MaterialName}</span>
                      <input type="text" value={values.MaterialName} onChange={handleChange} onBlur={handleBlur} id='MaterialName' name='MaterialName' className='form-control' placeholder='Material' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Qty</b> <span className='text-danger'>*{errors.Qty}</span>
                      <input type="text" value={values.Qty} onChange={handleChange} onBlur={handleBlur} id='Qty' name='Qty' className='form-control' placeholder='Qty' />
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Unit</b> <span className='text-danger'>*{errors.Unit}</span>
                      <select onChange={(e) => setContentValues("Unit", e.target.value)} name="Unit" id="drpUnit" className='form-select'>
                        <option value="">Select Unit</option>
                        <option value="KG">KG</option>
                        <option value="TONS">TONS</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-2">
                      <b>Net Qty</b> <span className='text-danger'>*{errors.Net_Qty}</span>
                      <input type="text" value={values.Net_Qty} onChange={handleChange} onBlur={handleBlur} id='Net_Qty' name='Net_Qty' className='form-control' placeholder='Net_Qty' />
                    </div>

                  </div>
                </div>
                <div className='col-md-6 mb-2'>
                  <div className="row">
                    <div className="col-md-12 mb-2">
                      <b>Description</b> <span className='text-danger'>*{errors.Description}</span>
                      <textarea style={{ height: "102px" }} value={values.Description} onChange={handleChange} onBlur={handleBlur} id='Description' name='Description' className='form-control' placeholder='Description'></textarea>
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>GST</b> <span className='text-danger'>*{errors.GST}</span>
                      <input type="text" value={values.GST} onChange={handleChange} onBlur={handleBlur} id='GST' name='GST' className='form-control' placeholder='GST' />
                    </div>
                    <div className="col-md-6 mb-2">
                      <b>GST Type</b> <span className='text-danger'>*{errors.GST_Type}</span>
                      <select onChange={(e) => setContentValues("GST_Type", e.target.value)} name="GST_Type" id="drpGST_Type" className='form-select'>
                        <option value="">Select Unit</option>
                        <option value="Inclusive">Inclusive</option>
                        <option value="Exclusive">Exclusive</option>
                      </select>
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

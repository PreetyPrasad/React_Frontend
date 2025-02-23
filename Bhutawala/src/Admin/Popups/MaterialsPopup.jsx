import { useFormik } from "formik";
import { getData, postData } from "../../API";
import { MaterialSchema } from "../../Schema";
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MaterialsPopup({ show, setShow, fetchMaterials, initialValues, setInitialValues }) {
  const [Categories, setCategories] = useState([]);
  const [MaterialId, setMaterialId] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const responseResult = await getData("Category/List");
      if (responseResult.status == "OK") {
        setCategories(responseResult.result);
        console.log(responseResult.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  useEffect(() => { fetchCategories(); }, []);
  const formik = useFormik({ enableReinitialize: true, initialValues: initialValues, validationSchema: MaterialSchema, onSubmit: (values) => { postMaterialData(values); }, });
  const postMaterialData = async (data) => {
    setLoading(true);
    const postRequest = {
      MaterialName: data.MaterialName,
      categoryId: data.CategoryId,
      Unit: data.Unit,
      Qty: data.Qty,
      Net_Qty: data.Net_Qty,
      Description: data.Description,
      Brand: data.Brand,
      GST: data.GST,
      GST_Type: data.GST_Type,
    };
    try {
      const result = await postData(
        MaterialId == 0 ? "Material/Save" : "Material/Edit",
        postRequest
      );
      console.log(result);
      if (result.status === "Ok") {
        console.log("Save Material");
        fetchMaterials();
        cancleForm();
      } else {
        console.log("Material Exists");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error posting data in component:", error);
      setLoading(false);
    }
    console.log(postRequest);
  };

  const cancleForm = () => { setCategoryId(0); setInitialValues({ MaterialId: "" }); };
  const openModal = () => { const modal = new window.bootstrap.Modal(modalRef.current); modal.show(); };
  const changeDropDown = (value, FiledName) => { formik.setFieldValue(FiledName, value); };

  return (
    <>
      <div
        className={show ? "modal show" : "modal"}
        style={show ? { display: "block" } : null}
        id="myModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Add New Material</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  setShow(false);
                }}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form className="row g-3" onSubmit={formik.handleSubmit}>
                {/* Category */}
                <div className="col-md-6">
                  <label htmlFor="Category" className="form-label">Category </label>
                  <select name="Category" id="Category" className="form-select"
                    onChange={(event) =>
                      changeDropDown(event.target.value, "CategoryId")
                    }
                    onBlur={formik.handleBlur} value={formik.values.Category}
                  >
                    {Categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.Category && formik.errors.Category && (<div className="text-danger">{formik.errors.Category}</div>)} </div>
                <div className="col-md-6">
                  <label htmlFor="MaterialName" className="form-label">Material </label>
                  <input id="MaterialName" name="MaterialName" type="text" className="form-control" placeholder="Enter Brand"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.MaterialName} />
                  {formik.touched.MaterialName && formik.errors.MaterialName && (<div className="text-danger"> {formik.errors.MaterialName}</div>)}
                </div>

                {/* Brand */}
                <div className="col-md-6">
                  <label htmlFor="Brand" className="form-label">
                    Brand
                  </label>
                  <input id="Brand" name="Brand" type="text" className="form-control" placeholder="Enter Brand"
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    value={formik.values.Brand}
                  />
                  {formik.touched.Brand && formik.errors.Brand && (
                    <div className="text-danger">{formik.errors.Brand}</div>
                  )}
                </div>

                {/* Unit */}
                <div className="col-md-3">
                  <label htmlFor="Unit" className="form-label">
                    Unit
                  </label>
                  <select
                    name="Unit"
                    id="Unit"
                    className="form-control"
                    onChange={(event) =>
                      changeDropDown(event.target.value, "Unit")
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.Unit}
                  >
                    <option value="">Select Unit</option>
                    <option value="KG">KG</option>
                  </select>
                  {formik.touched.Unit && formik.errors.Unit && (
                    <div className="text-danger">{formik.errors.Unit}</div>
                  )}
                </div>

                {/* Qty */}
                <div className="col-md-3">
                  <label htmlFor="Qty" className="form-label">
                    Quantity
                  </label>
                  <input
                    id="Qty"
                    name="Qty"
                    type="text"
                    className="form-control"
                    placeholder="Enter Qty"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Qty}
                  />
                  {formik.touched.Qty && formik.errors.Qty && (
                    <div className="text-danger">{formik.errors.Qty}</div>
                  )}
                </div>

                {/* Net Qty */}
                <div className="col-md-4">
                  <label htmlFor="Net_Qty" className="form-label">
                    Net Quantity
                  </label>
                  <input
                    id="Net_Qty"
                    name="Net_Qty"
                    type="text"
                    className="form-control"
                    placeholder="Enter Net Qty"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Net_Qty}
                  />
                  {formik.touched.Net_Qty && formik.errors.Net_Qty && (
                    <div className="text-danger">{formik.errors.Net_Qty}</div>
                  )}
                </div>

                {/* GST */}
                <div className="col-md-4">
                  <label htmlFor="GST" className="form-label">
                    GST
                  </label>
                  <input
                    id="GST"
                    name="GST"
                    type="text"
                    className="form-control"
                    placeholder="Enter GST"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.GST}
                  />
                  {formik.touched.GST && formik.errors.GST && (
                    <div className="text-danger">{formik.errors.GST}</div>
                  )}
                </div>

                {/* GST Type */}
                <div className="col-md-4">
                  <label htmlFor="GST_Type" className="form-label">
                    GST Type
                  </label>
                  <select
                    name="GST_Type"
                    id="GST_Type"
                    className="form-control"
                    onChange={(event) =>
                      changeDropDown(event.target.value, "GST_Type")
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.GST_Type}
                  >
                    <option value="">Select GST Type</option>
                    <option value="Exclusive">Exclusive</option>
                  </select>
                  {formik.touched.GST_Type && formik.errors.GST_Type && (
                    <div className="text-danger">{formik.errors.GST_Type}</div>
                  )}
                </div>

                {/* Description */}
                <div className="col-md-12">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="Description"
                    name="Description"
                    className="form-control"
                    placeholder="Enter Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.Description}
                  ></textarea>
                  {formik.touched.Description && formik.errors.Description && (
                    <div className="text-danger">
                      {formik.errors.Description}
                    </div>
                  )}
                </div>

                {/* Submit & Close Buttons */}
                <div className="modal-footer">
                  <button
                    disabled={loading}
                    className="btn btn-primary"
                    type="submit"
                  >
                    {!loading ? (
                      "Submit"
                    ) : (
                      <>
                        <i className="fas fa-spinner"></i>
                        &nbsp;Please Wait
                      </>
                    )}
                  </button>
                  &nbsp;
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {show ? <div className="modal-backdrop show"></div> : null}
    </>
  );
}

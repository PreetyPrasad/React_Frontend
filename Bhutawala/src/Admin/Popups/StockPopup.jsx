import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { InwordStockSchema } from "../../Schema";
import { getData, postData } from "../../API";

export default function StockPopup(props) {
  const [staffs, setStaffs] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterial_Staff = async () => {
      try {
        const Materialresponse = await getData("Material/List");
        const Staffresponse = await getData("StaffMaster/List");

        if (Materialresponse.status === "OK") setMaterials(Materialresponse.result);
        if (Staffresponse.status === "OK") setStaffs(Staffresponse.result);

        console.log("Staffs:", Staffresponse.result); // Debugging
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMaterial_Staff();
  }, []);

  const { handleSubmit, handleBlur, handleChange, errors, values, setValues } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: InwordStockSchema,
    onSubmit: async (values) => {
      const requestData = {
        StockId: props.stockId,
        MaterialId: values.MaterialId,
        PurchaseId: values.PurchaseId,
        StaffId: values.StaffId,
        Qty: values.Qty,
        Unit: values.Unit,
        Cost: values.Cost,
        RecivedDate: values.RecivedDate,
        Note: values.Note,
      };

      console.log("Sending Data to API:", requestData);

      try {
        props.setLoading(true);
        const result = await postData(props.stockId === 0 ? "InwardStock/Save" : "InwardStock/Edit", requestData);

        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchInwardStocks();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error in API call:", error.message);
      } finally {
        props.setLoading(false);
      }
    }
  });

  const clearForm = () => {
    setValues({
      MaterialId: "",
      PurchaseId: props.purchaseId ?? "",
      StaffId: "",
      Qty: "",
      Unit: "",
      Cost: "",
      RecivedDate: "",
      Note: "",
    });

    props.setShow(false);
    props.setStockId(0);
  };

  return (
    <>
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Stock</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row">
                {/* Staff Dropdown */}
                <div className="col-md-6 mb-2">
                  <b>Staff</b> <span className="text-danger">* {errors.StaffId}</span>
                  <select
                    name="StaffId"
                    className="form-select"
                    value={values.StaffId || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Staff</option>
                    {staffs.map((o) => (
                      <option key={o.staffId} value={o.staffId}>
                        {o.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Dropdown */}
                <div className="col-md-6 mb-2">
                  <b>Material</b> <span className="text-danger">* {errors.MaterialId}</span>
                  <select
                    name="MaterialId"
                    className="form-select"
                    value={values.MaterialId || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Material</option>
                    {materials.map((o) => (
                      <option key={o.materialId} value={o.materialId}>
                        {o.materialName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="col-md-4 mb-2">
                  <b>Qty</b> <span className="text-danger">* {errors.Qty}</span>
                  <input
                    type="number"
                    name="Qty"
                    className="form-control"
                    value={values.Qty || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Unit */}
                <div className="col-md-4 mb-2">
                  <b>Unit</b> <span className="text-danger">* {errors.Unit}</span>
                  <input
                    type="text"
                    name="Unit"
                    className="form-control"
                    value={values.Unit || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Cost */}
                <div className="col-md-4 mb-2">
                  <b>Cost</b> <span className="text-danger">* {errors.Cost}</span>
                  <input
                    type="number"
                    name="Cost"
                    className="form-control"
                    value={values.Cost || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Received Date */}
                <div className="col-md-4 mb-2">
                  <b>Received Date</b> <span className="text-danger">* {errors.RecivedDate}</span>
                  <input
                    type="date"
                    name="RecivedDate"
                    className="form-control"
                    value={values.RecivedDate || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Note */}
                <div className="col-md-4 mb-2">
                  <b>Note</b> <span className="text-danger">* {errors.Note}</span>
                  <input
                    type="text"
                    name="Note"
                    className="form-control"
                    value={values.Note || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Buttons */}
                <div className="col-md-12 mb-2">
                  <button id="btnSave" type="submit" disabled={props.loading} className="btn-custom btn-save">
                    {!props.loading ? "Save" : "Please Wait"}
                  </button>

                  <button id="btnCancel" onClick={clearForm} type="button" className="btn-custom btn-cancel">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
}

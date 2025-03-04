import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { InwordStockSchema } from '../../Schema';
import { getData, postData } from '../../API';
export default function InwardStock(props) {
  // const [staff, setStaff] = useState([]);
  const [material, setMaterial] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const fetchStaff_Material_Purchase = async () => {
    try {
      // const Staffresponse = await getData("StaffMaster/List");
      const Purchaseresponse = await getData("PurchaseMaster/List");
      const Materialresponse = await getData("Material/List");
      console.log(Purchaseresponse)
      // if (Staffresponse.status === "OK") {
      // setStaff(Staffresponse.result);
      // console.log(Staffresponse.result);
      // } else {
      // console.log("Something went wrong");
      // }
      if (Purchaseresponse.status === "OK") {
        setPurchase(Purchaseresponse.result);
        console.log(Purchaseresponse.result);
      } else {
        console.log("Something went wrong");
      }
      if (Materialresponse.status === "OK") {
        setMaterial(Materialresponse.result);
        console.log(Materialresponse.result);
      } else {
        console.log("Something went wrong");
      }

    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const { handleBlur, handleChange, handleReset, handleSubmit, setFieldValue, errors, values } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValue,
    validationSchema: InwordStockSchema,
    onSubmit: async (values) => {
      const requestData = {
        MaterialId: values.MaterialId,
        PurchaseId: values.PurchaseId,
        // StaffId: values.StaffId,
        Qty: values.Qty,
        Unit: values.Unit,
        Cost: values.Cost,
        DateTime: values.DateTime,
        Note: values.Note,
        StockId: props.StockId
      };
      try {
        props.setLoading(true);
        const result = await postData(
          props.StockId === 0 ? "InwordStock/Save" : "InwordStock/Edit",
          requestData
        );
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          props.fetchInwordStocks();
          clearForm();
        } else {
          alert("Already Exists");
        }
      } catch (error) {
        console.error("Error posting data:", error);
        alert("Error occurred while processing the request. Please try again.");
      } finally {
        props.setLoading(false);
      }

    }
  });
  useEffect(() => {
    fetchStaff_Material_Purchase();
    if (props.StockId !== 0) {
      // document.getElementById("drpStaffId").value = values.StaffId;
      document.getElementById("drpMaterialId").value = values.MaterialId;
      document.getElementById("drpPurchaseId").value = values.PurchaseId;
    }
  }, [props.Staffresponse, values.MaterialId, values.PurchaseId]);

  const clearForm = () => {
    props.setInitialValue({
      MaterialId: "",
      PurchaseId: "",
      Qty: "",
      Unit: "",
      Cost: "",
      DateTime: "",
      Note: "",
    });
    props.setShow(false);
    props.setStockId(0);
  }

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Stock</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className='row'>
                <div className="col-md-12 mb-2">
                  <b>MaterialId</b> <span className="text-danger">*{errors.MaterialId}</span>
                  <select onChange={(e) => setFieldValue("MaterialId", e.target.value)} name="MaterialId" id="drapMaterialId"
                    className='form-select'>
                    <option value="">Select Material</option>
                    {material.map((o) => (
                      <option key={o.materialId} value={o.materialId}>{o.materialName}</option>
                    ))}
                  </select>

                </div>
                <div className="col-md-4 mb-2">
                  <b>BillNo</b> <span className="text-danger">*{errors.PurchaseId}</span>
                  <select onChange={(e) => setFieldValue("PurchaseId", e.target.value)} name="PurchaseId" id="drpPurchasseId"
                    className='form-select'>
                    <option value="">Select Purchase</option>
                    {purchase.map((o) => (
                      <option key={o.purchaseId} value={o.purchaseId}>{o.billNo}</option>
                    ))}
                  </select>

                </div>
                {/* <div className="col-md-12 mb-2"> */}
                  {/* <b>StaffId</b> <span className="text-danger">*{errors.StaffId}</span> */}
                  {/* <select onChange={(e) => setFieldValue("StaffId", e.target.value)} name="StaffId" id="drpStaffId" */}
                  {/* // className='form-select'> */}
                  {/* <option value="">Select Staff</option> */}
                  {/* {staff.map((o) => ( */}
                  {/* // <option key={o.staffId} value={o.staffId}>{o.staffname}</option> */}
                  {/* // ))} */}
                  {/* </select> */}

                {/* </div> */}
                <div className="col-md-4 mb-2">
                  <b>Qty</b>
                  <input type="text" className="form-control" name="Qty" value={values.Qty} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-2">
                  <b>Unit</b> <span className="text-danger">*{errors.Unit}</span>
                  <input type="text" className="form-control" name="Unit" value={values.Unit} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Cost</b> <span className="text-danger">*{errors.Cost}</span>
                  <input type="text" className="form-control" name="Cost" value={values.Cost} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>DateTime</b> <span className="text-danger">*{errors.DateTime}</span>
                  <input type="date" className="form-control" name="DateTime" value={values.DateTime} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <b>Note</b> <span className="text-danger">*{errors.Note}</span>
                  <textarea type="text" className="form-control" name="Note" value={values.Note} onBlur={handleBlur} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-2">
                  <button id="btnSave" type="submit" disabled={props.loading} className="open-modal-btn">
                    {props.loading ? "Please Wait" : "Save"}
                  </button>
                  <button id="btnCancel" type="button" className="btn-custom btn-cancel" onClick={clearForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show && <div className="modal-backdrop show" />}
    </>
  );
}

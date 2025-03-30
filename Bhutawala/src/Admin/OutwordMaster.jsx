import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { postData, getData } from "../API";
import { successAlert, errorAlert } from "../SweetAlert/SuccessAlert";
import { OutwardSchema } from '../Schema';
export default function OutwordMaster() {
  const [loading, setLoading] = useState(false);
  const [outwardProducts, setOutwardProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getData("Material/List");
        console.log("Materials API Response:", response);

        if (response.status === "OK") {
          setMaterials(response.result);
        } else {
          errorAlert("Error", "Something went wrong while fetching materials.");
        }
      } catch (error) {
        console.error("Fetching Data Error:", error);
      }
    };
    fetchMaterials();
  }, []);
  const initialValues = {
    StaffId: "",
    Givento: "",
    ContactNo: "",
    OutwordDate: new Date().toISOString().split("T")[0],
    Reason: "",
    MaterialId: "",
    MaterialName: "",
    ItemQty: ""
  };
  const { values, handleBlur, handleSubmit, errors, setFieldValue, handleChange, resetForm } = useFormik({
    initialValues,
    validationSchema: OutwardSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (outwardProducts.length === 0) {
        errorAlert("Error", "Please add at least one product.");
        setLoading(false);
        return;
      }
      const masterData = {
        OutwordId: 0,
        StaffId: values.StaffId,
        Givento: values.Givento,
        ContactNo: values.ContactNo,
        OutwordDate: values.OutwordDate,
        Reason: values.Reason,
        OutwordItems: outwardProducts.map((product) => ({
          MaterialId: Number(product.MaterialId),
          Quantity: Number(product.Quantity) || 0,
        })),
      };
      console.log("Sending Data:", JSON.stringify(masterData, null, 2));
      try {
        const response = await postData("OutwordMaster/Save", masterData);
        console.log("API Response:", response);

        if (response?.status?.toUpperCase() === "OK") {
          successAlert("Success", response.result || "Outward Entry Saved Successfully!");
          resetForm();
          setOutwardProducts([]);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Save Error:", JSON.stringify(error.response?.data || error, null, 2));
        const errorMessage = error.response?.data?.title || "Something went wrong while saving.";
        errorAlert("Error", errorMessage);
      }
      setLoading(false);
    },
  });
  const handleMaterialChange = (e) => {
    const materialId = e.target.value;
    const selectedMaterial = materials.find((m) => String(m.materialId) === String(materialId));
    if (selectedMaterial) {
      setFieldValue("MaterialId", selectedMaterial.materialId);
      setFieldValue("MaterialName", selectedMaterial.materialName);
      setFieldValue("ItemQty", selectedMaterial.availableQty || selectedMaterial.quantity || 0);
    }
  };
  const addProduct = () => {
    if (!values.MaterialId || !values.ItemQty) {
      errorAlert("Error", "Please fill all product details before adding!");
      return;
    }
    setOutwardProducts([
      ...outwardProducts,
      {
        MaterialId: values.MaterialId,
        MaterialName: values.MaterialName,
        Quantity: values.ItemQty,
      },
    ]);
    setFieldValue("MaterialId", "");
    setFieldValue("MaterialName", "");
    setFieldValue("ItemQty", "");
  };
  const deleteProduct = (index) => {
    setOutwardProducts(outwardProducts.filter((_, i) => i !== index));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Outword Master entery</h4></div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="row">
                {/* <div className="col-md-2 mb-2"> */}
                {/* <b>Staff ID</b> */}
                {/* <input type="number" name="StaffId" onChange={handleChange} value={values.StaffId} className="form-control" /> */}
                {/* </div> */}
                {/* <div className="col-md-7 mb-2"></div> */}
                <div className="col-md-2 mb-2">
                  <b>Given To</b> <span className='text-danger'>*{errors.Givento}</span>
                  <input type="text" name="Givento" onChange={handleChange} onBlur={handleBlur} value={values.Givento} className="form-control" />
                </div>
                <div className="col-md-7 mb-2"></div>
                <div className="col-md-3 mb-2">
                  <b>Date</b> <span className='text-danger'>*{errors.OutwordDate}</span>
                  <input type="date" name="OutwordDate" onChange={handleChange} onBlur={handleBlur} value={values.OutwordDate}
                    className="form-control" />
                </div>
                <div className="col-md-3 mb-2">
                  <b>Contact No</b> <span className='text-danger'>*{errors.ContactNo}</span>
                  <input type="text" name="ContactNo" onChange={handleChange} onBlur={handleBlur} value={values.ContactNo} className="form-control" />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Reason</b> <span className='text-danger'>*{errors.Reason}</span>
                  <textarea name="Reason" onChange={handleChange} onBlur={handleBlur} value={values.Reason} className="form-control"></textarea>
                </div>
              </div>
              <h4 className="card-title mb-0">Add Product</h4><hr />
              <div className="row">
                <div className="col-md-3">
                  <b>Material</b><span className='text-danger'>*{errors.MaterialId}</span>
                  <select onChange={handleMaterialChange} name="MaterialId" className="form-select" value={values.MaterialId}>
                    <option value="">select Material</option>
                    {materials.map((o) => (
                      <option key={o.materialId} value={o.materialId}>{o.materialName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <b>Quantity</b><span className='text-danger'>*{errors.ItemQty}</span>
                  <input type="number" name="ItemQty" onChange={handleChange} value={values.ItemQty} className="form-control" />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" onClick={addProduct} className="btn btn-primary"><i className='fas fa-plus'></i> Product </button>
                </div>
              </div>
              <hr />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Material Name</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {outwardProducts.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.MaterialName}</td>
                      <td>{item.Quantity}</td>
                      <td>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProduct(index)}> Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit" className="btn btn-success mt-3" disabled={loading}>
                {loading ? "Saving..." : "Save Outward Entry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

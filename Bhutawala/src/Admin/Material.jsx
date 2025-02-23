import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import MaterialsPopup from "./Popups/MaterialsPopup";
import { toast } from "react-toastify";
export default function Material() {

  
  const [materials, setMaterials] = useState([]);
  const [show, setShow] = useState(false);
  const [MaterialId, setMaterialId] = useState(0);
  const [initialValues, setInitialValues] = useState({
    Category: "",
    Unit: "",
    Qty: "",
    Net_Qty: "",
    
    Description: "",
    Brand: "",
    GST: "",
    GST_Type: "",
    MaterialName: "",
  });

  const fetchMaterials = async () => {
    try {
      const responseResult = await getData("Material/List");
      if (responseResult.status == "OK") {
        setMaterials(responseResult.result);
        console.log(responseResult.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterialDetail = async (Id) => {
    try {
      const responseResult = await getData("Material/Details/" + Id);
      var res = responseResult.result;
      console.log(res);
      if (responseResult.status == "OK") {
        setMaterialId(res.MaterialId);
        setInitialValues({
          Category: res.categoryId,
          Unit: res.unit,
          Qty: res.qty,
          Net_Qty: res.net_Qty,
          Description: res.description,
          Brand: res.brand,
          GST: res.gst,
          GST_Type: res.gsT_Type,
          MaterialName: res.materialName,
        });

        console.log()
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const editTemplate = (material) => {
    return (
      <span onClick={() => fetchMaterialDetail(material.materialId)}>
        <i style={{ color: "#0A003A" }} className="fas fa-edit"></i>
      </span>
    );
  };

  const deleteData = async (Id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const responseResult = await getData("Material/Remove/" + Id);
        console.log(responseResult);
        if (responseResult.status == "OK") {
          fetchMaterials();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  };

  const deleteTemplate = (material) => {
    return (
      <span
        onClick={() => {
          deleteData(material.materialId); // Change 'MaterialId' to 'materialId'
          toast.error("Category deleted successfully");
        }}
        style={{ cursor: "pointer" }}
      >
        <i style={{ color: "#0A003A" }} className="fas fa-trash"></i>
      </span>
    );
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Materials</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <button
                type="button"
                className="btn btn-primary col-md-2"
                onClick={() => setShow(true)}
              >
                Add Material
              </button>
              <MaterialsPopup
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                MaterialId={MaterialId}
                show={show}
                setShow={setShow}
              />
              {/* Table */}
              <div className="col-md-12 table-responsive">
                <DataTable
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  size="small"
                  value={materials}
                >
                  <Column field="materialId" sortable header="#" />
                  <Column
                    field="category.categoryName"
                    sortable
                    header="Category Name"
                  />
                  <Column
                    field="qty_unit"
                    header="Qty "
                    sortable
                    body={(rowData) => `${rowData.qty} ${rowData.unit}`}
                  />
                  <Column field="net_Qty" sortable header="Net_Qty" />
                  <Column field="description" sortable header="Description" />
                  <Column field="brand" sortable header="Brand" />
                  <Column field="gst" sortable header="GST" />
                  <Column field="gsT_Type" sortable header="GST Type" />

                  <Column
                    style={{ width: "30px" }}
                    body={deleteTemplate}
                    header="Delete"
                  />
                  <Column
                    style={{ width: "30px" }}
                    body={editTemplate}
                    header="Edit"
                  />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

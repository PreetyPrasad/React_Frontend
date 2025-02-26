import React, { useEffect, useState } from 'react'
import MaterialPopup from './Popups/MaterialsPopup';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Material() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [Materials, setMaterials] = useState([]);
  const [MaterialId, setMaterialId] = useState(0);

  const [initialValue, setInitialValue] = useState({
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

  const fetchMaterials = async () => {
    try {
      const response = await getData("Material/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setMaterials(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const deleteMaterial = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("Material/Remove/" + Id);
        if (response.status == "OK") {
          fetchMaterials();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchMaterialDetail = async (Id) => {
    try {
      const response = await getData("Material/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          CategoryId: response.result.categoryId,
          MaterialName: response.result.materialName,
          Unit: response.result.unit,
          Qty: response.result.qty,
          Net_Qty: response.result.net_Qty,
          Description: response.result.description,
          Brand: response.result.brand,
          GST: response.result.gst,
          GST_Type: response.result.gsT_Type
        });
        setMaterialId(response.result.materialId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const unitTemplate = (material) => {
    return `${material.qty} ${material.unit}`
  };

  const editTemplate = (material) => {
    return <i onClick={() => fetchMaterialDetail(material.materialId)} className='fas fa-edit'></i>;
  };

  const deleteTemplate = (material) => {
    return <i onClick={() => deleteMaterial(material.materialId)} className='fas fa-trash'></i>;
  };

  useEffect(() => {
    fetchMaterials();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Material</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="btn btn-primary">Open modal</button>
                  <MaterialPopup fetchMaterials={fetchMaterials} MaterialId={MaterialId} setMaterialId={setMaterialId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={Materials} tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ width: "100px" }} field="materialId" header="#"></Column>
                    <Column field="category.categoryName" header="Categories"></Column>
                    <Column field="brand" header="Brand"></Column>
                    <Column field="materialName" header="Categories"></Column>
                    <Column body={unitTemplate} header="Unit"></Column>
                    <Column field="net_Qty" header="net_Qty"></Column>
                    <Column field="gst" header="GST"></Column>
                    <Column field="gsT_Type" header="GST Type"></Column>
                    <Column body={editTemplate} className='text-center' style={{ width: "50px" }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: "50px" }}></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

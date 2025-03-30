import React, { useEffect, useState } from 'react'
import MaterialPopup from './Popups/MaterialsPopup'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { errorAlert } from '../SweetAlert/SuccessAlert';

export default function Material() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [Materials, setMaterials] = useState([]);
  const [MaterialId, setMaterialId] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categoryName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    brand: { value: null, matchMode: FilterMatchMode.CONTAINS },
    materialName: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [initialValue, setInitialValue] = useState({
    CategoryId: "",
    MaterialName: "",
    Unit: "",
    Qty: "",
    Net_Qty: "",
    Description: "",
    Brand: "",
    GST: "",
    GST_Type: "",
    Price: "",
  });

  const fetchMaterials = async () => {
    try {
      setDataLoading(true);
      const response = await getData("Material/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setMaterials(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
    finally {
      setDataLoading(false);
    }
  };

  const deleteMaterial = async (Id) => {
    var conform = await confirmationAlert("Are you sure to delete...?");
    console.log(conform);
    if (conform) {
      try {
        setDataLoading(true);
        const response = await getData("Material/Remove/" + Id);
        if (response.status.toUpperCase() == "OK") {
          fetchMaterials();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        errorAlert("Error fetching data in component:", error);
      }
      finally {
        setDataLoading(false);
      }
    }
  }

  const fetchMaterialDetail = async (Id) => {
    try {
      const response = await getData("Material/Details/" + Id);
      if (response.status.toUpperCase() == "OK") {
        setInitialValue({
          CategoryId: response.result.categoryId,
          MaterialName: response.result.materialName,
          Unit: response.result.unit,
          Qty: response.result.qty,
          Net_Qty: response.result.net_Qty,
          Description: response.result.description,
          Brand: response.result.brand,
          GST: response.result.gst,
          GST_Type: response.result.gsT_Type,
          Price: response.result.price
        });
        setMaterialId(response.result.materialId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };

  const unitTemplate = (material) => {
    return `${material.qty} ${material.unit}`
  };

  const editTemplate = (material) => {
    return <i onClick={() => fetchMaterialDetail(material.materialId)} className='fas fa-edit text-success'></i>;
  };

  const deleteTemplate = (material) => {
    return <i onClick={() => deleteMaterial(material.materialId)} className='fas fa-trash text-danger'></i>;
  };

  useEffect(() => {
    fetchMaterials();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"  >
              <h4 className="card-title mb-0">Material</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">  Add Material</button>
                  <MaterialPopup fetchMaterials={fetchMaterials} MaterialId={MaterialId} setMaterialId={setMaterialId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={globalFilterValue}
                      onChange={onGlobalFilterChange}
                      placeholder="Search"
                    />
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable stripedRows filters={filters} globalFilterFields={['category.categoryName', 'brand', 'materialName']} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} size='small' loading={dataLoading} value={Materials} >
                    {/* <Column style={{ width: "100px" }} field="materialId" header="Id" sortable></Column> */}
                    <Column field="category.categoryName" header="Categories" sortable></Column>
                    <Column field="brand" header="Brand" sortable></Column>
                    <Column field="materialName" header="Material Type" sortable></Column>
                    <Column body={unitTemplate} header="Unit" sortable></Column>
                    <Column field="net_Qty" header="Net Qty" sortable></Column>
                    <Column field="gst" header="GST" sortable></Column>
                    <Column body={(material) => `₹ ${parseFloat(material.price).toLocaleString('en-IN')}`} field="price" header="PRICE" sortable></Column>
                    <Column field="gsT_Type" header="GST Type" sortable></Column>
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


import React, { useEffect, useState } from 'react'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { errorAlert } from '../SweetAlert/SuccessAlert';

export default function OutwordItem() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [OutwordItems, setOutwordItems] = useState([]);
  const [OutwordStockId, setOutwordStockId] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const [initialValue, setInitialValue] = useState({
    MaterialId: "",
    OutwordId: "",
    Qty: ""
  });

  const fetchOutwords = async () => {
    try {
      setDataLoading(true);
      const response = await getData("OutwordItem/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setOutwordItems(response.result);
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

  const deleteOutwordItem = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        const response = await getData("OutwordItem/Remove/" + Id);
        if (response.status == "OK") {
          fetchOutwords();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }
  const deleteTemplate = (outwordItem) => {
    return <i onClick={() => deleteOutwordItem(outwordItem.OutwordStockId)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchOutwords();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">OutwordItems</h4></div>
            <div className="card-body">
              <div className="row"><div className="col-md-8 mb-2"></div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                    <span className="input-group-text"><i className="fas fa-search"></i> </span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable stripedRows filters={filters} globalFilterFields={[]} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} size='small' loading={dataLoading} value={OutwordItems}>
                    <Column field="materialName" header="MaterialName" sortable></Column>
                    {/* <Column field="price" header="Price" sortable></Column> */}
                    <Column field="qty" header="Qty" sortable></Column>
                    <Column field="givento" header="GivenTo" sortable></Column>
                    <Column field="contactNo" header="Contact No" sortable></Column>
                    <Column field="reason" header="Reason" sortable></Column>
                    <Column field="outwordDate" header="OutwordDate" sortable body={(rowData) => formatDate(rowData.outwordDate)}></Column>
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

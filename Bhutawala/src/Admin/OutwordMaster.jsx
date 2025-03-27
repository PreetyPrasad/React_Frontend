
import React, { useEffect, useState } from 'react'
import Outwordpopup from './Popups/Outwordpopup'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { errorAlert } from '../SweetAlert/SuccessAlert';

export default function OutwordMaster() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [OutwordMasters, setOutwordMasters] = useState([]);
  const [OutwordId, setOutwordId] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Reason: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Givento: { value: null, matchMode: FilterMatchMode.CONTAINS },
    ContactNo: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const [initialValue, setInitialValue] = useState({
    StaffId: "",
    Reason: "",
    Givento: "",
    ContactNo: "",
    OutwordDate: "",
  });

  const fetchOutwords = async () => {
    try {
      setDataLoading(true);
      const response = await getData("OutwordMaster/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setOutwordMasters(response.result);
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

  const deleteOutwordMaster = async (Id) => {
    var conform = await confirmationAlert("Are you sure to delete...?");
    console.log(conform);
    if (conform) {
      try {
        setDataLoading(true);
        const response = await getData("OutwordMaster/Remove/" + Id);
        if (response.status.toUpperCase() == "OK") {
          fetchOutwords();
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
  const fetchOutwordMasterDetail = async (Id) => {
    try {
      const response = await getData("OutwordMaster/Details/" + Id);
      if (response.status.toUpperCase() == "OK") {
        setInitialValue({
          StaffId: response.result.staffId,
          Reason: response.result.reason,
          Givento: response.result.givento,
          ContactNo: response.result.contactNo,
          OutwordDate: response.result.outwordDate,
        });
        setOutwordId(response.result.outwordId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };
  const editTemplate = (outwordMaster) => {
    return <i onClick={() => fetchOutwordMasterDetail(outwordMaster.outwordId)} className='fas fa-edit text-success'></i>;
  };
  const deleteTemplate = (outwordMaster) => {
    return <i onClick={() => deleteOutwordMaster(outwordMaster.outwordId)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchOutwords();
  }, []);
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">OutwordMaster</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">  Add Outword</button>
                  <Outwordpopup fetchOutwords={fetchOutwords} OutwordId={OutwordId} setOutwordId={setOutwordId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                    <span className="input-group-text"><i className="fas fa-search"></i> </span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable stripedRows filters={filters} globalFilterFields={['staff', 'Reason', 'Givento', 'ContactNo', 'OutwordDate']} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} size='small' loading={dataLoading} value={OutwordMasters}>
                    <Column field="staffId" header="Staff" sortable></Column>
                    <Column field="reason" header="Reason" sortable></Column>
                    <Column field="givento" header="Givento" sortable></Column>
                    <Column field="contactNo" header="ContactNo" sortable></Column>
                    <Column field="outwordDate" header="OutwordDate" sortable></Column>
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

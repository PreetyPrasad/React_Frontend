import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData, postData } from '../API';
import StaffPopup from './Popups/StaffPopup'
import { confirmationAlert, errorAlert } from '../SweetAlert/SuccessAlert';
import { FilterMatchMode } from 'primereact/api';

export default function StaffMaster() {
  const [StaffMaster, setStaffMaster] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [StaffId, setStaffId] = useState(0);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categoryName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    qualification: { value: null, matchMode: FilterMatchMode.CONTAINS },
    adharNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    age: { value: null, matchMode: FilterMatchMode.CONTAINS }

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
    FullName: "",
    Address: "",
    ContactNo: "",
    Category: "",
    Qualification: "",
    AdharNo: "",
    Age: "",
    Dj: "",
    Email: ""
  });

  const fetchStaffMaster = async () => {
    try {
      setDataLoading(true);
      const response = await getData("StaffMaster/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setStaffMaster(response.result);
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

  const deleteStaffMaster = async (Id) => {
    var conform = confirmationAlert("Are you sure to delete...?");
    console.log(conform);
    if (conform) {
      try {
        setDataLoading(true);
        const response = await getData("StaffMaster/Remove/" + Id);
        if (response.status.toUpperCase() == "OK") {
          fetchStaffMaster();
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

  const fetchStaffMasterDetail = async (Id) => {
    try {
      const response = await getData("StaffMaster/Details/" + Id);
      if (response.status.toUpperCase() == "OK") {
        setInitialValue({
          FullName: response.result.fullName,
          Address: response.result.address,
          ContactNo: response.result.contactNo,
          Category: response.result.category,
          Qualification: response.result.qualification,
          AdharNo: response.result.adharNo,
          Age: response.result.age,
          Dj: response.result.dj,
          Email: response.result.email,
        });
        setStaffId(response.result.staffId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };

  const AddressDetailTemplate = (staff) => {
    return <>
      {staff.address},<br /> {staff.contactNo} <br />
      {staff.email}
    </>
  }

  const editTemplate = (staff) => {
    return <i onClick={() => fetchStaffMasterDetail(staff.staffId)} className='fas fa-edit text-success'></i>;
  };

  const deleteTemplate = (staff) => {
    return <i onClick={() => deleteStaffMaster(staff.staffId)} className='fas fa-trash text-danger'></i>;
  };

  useEffect(() => {
    fetchStaffMaster();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Staff Master</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">Add Staff</button>
                  <StaffPopup fetchStaffMaster={fetchStaffMaster} StaffId={StaffId} setStaffId={setStaffId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
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
                  <DataTable stripedRows filters={filters} globalFilterFields={['category', 'address', 'fullName', 'qualification', 'adharNo', 'age']} showGridlines size='small' loading={dataLoading} value={StaffMaster} tableStyle={{ minWidth: '50rem' }}>
                    {/* <Column style={{ width: "100px" }} field="staffId" header="#"></Column> */}
                    <Column field="category" sortable header="Category"></Column>
                    <Column field="fullName" sortable header="FullName"></Column>
                    <Column body={AddressDetailTemplate} field='address' header="AddressDetail"></Column>

                    {/* <Column body={ContactDetailTemplate} header="ContactDetail"></Column> */}
                    <Column field="qualification" sortable header="Qualification"></Column>
                    <Column field="adharNo" header="AdharNo "></Column>
                    <Column field="age" sortable header="Age"></Column>
                    <Column field="dj" header="Date Of Joining"></Column>
                    {/* <Column body={BankDetailTemplate} header="BankDetail"></Column> */}
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

import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../API';
import StaffPopup from './Popups/StaffPopup'
import { Password } from 'primereact/password';
export default function StaffMaster() {
  const [StaffMasters, setStaffMasters] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [StaffId, setStaffId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    StaffId: "",
    FullName: '',
    Address: '',
    Category: '',
    Qualification: '',
    AdharNo: '',
    Age: '',
    Aj: '',
    Email: '',


  });

  const fetchStaffs = async () => {
    try {
      const response = await getData("StaffMaster/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setStaffMasters(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const deleteStaffMasters = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("StaffMaster/Remove/" + Id);
        if (response.status.toUpperCase() == "OK") {
          fetchStaffs();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log("Error fetching data in component:", error);
      }
    }
  }
  const fetchStaffDetail = async (Id) => {
    try {
      const response = await getData("StaffMaster/Details/" + Id);
      if (response.status.toUpperCase() == "OK") {
        setInitialValue({
          StaffId: response.result.staffId,
          FullName: response.result.fullName,
          Address: response.result.address,
          ContactNo: response.result.contactNo,
          Category: response.result.category,
          Qualification: response.result.qualification,
          Age: response.result.age,
          Dj: response.result.dj,
          Email: response.result.email,
          AdharNo: response.result.adharNo,

        });
        setStaffId(response.result.StaffId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const AddressTemplate = (staffMaster) => {
    return ` ${staffMaster.fullName}, ${staffMaster.address} ,${staffMaster.contactNo}, ${staffMaster.email}`
  };
  const editTemplate = (staffMaster) => {
    return <i onClick={() => fetchStaffDetail(staffMaster.staffId)} className='fas fa-edit  text-success'></i>;
  };
  const deleteTemplate = (staffMaster) => {
    return <i onClick={() => deleteStaffMasters(staffMaster.staffId)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchStaffs();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Staff List</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">Add Staff</button>
                  <StaffPopup fetchStaffs={fetchStaffs} staffId={StaffId} setStaffId={setStaffId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={StaffMasters} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="staffId" header="#"></Column>
                    <Column body={AddressTemplate} header="Address" ></Column>
                    <Column field="category" header="category" sortable></Column>
                    <Column field="qualification" header="qualification" ></Column>
                    <Column field="age" header="Age " sortable></Column>
                    <Column field="dj" header="DOJ" ></Column>
                    <Column field="adharNo" header="AdharNo"></Column>
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
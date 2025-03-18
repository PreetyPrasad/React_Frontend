import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData, postData } from '../API';
import SupplierPopup from './Popups/SupplierPopup'
import { confirmationAlert, errorAlert, successAlert } from '../SweetAlert/SuccessAlert';
import { FilterMatchMode } from 'primereact/api';

export default function Supplier() {
  const [Suppliers, setSuppliers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [SupplierId, setSupplierId] = useState(0);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    businessName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pinCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bankName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    contactNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    city: { value: null, matchMode: FilterMatchMode.CONTAINS },
    state: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const [initialValue, setInitialValue] = useState({
    SupplierId: "",
    BusinessName: "",
    ContactPerson: "",
    ContactNo: "",
    Address: "",
    City: "",
    State: "",
    PinCode: "",
    GSTIN: "",
    PAN: "",
    BanckBranch: "",
    IFSC: "",
    AccountNo: "",
    BankName: "",
    // LogDate: "",
    Email: "",
  });
  const fetchSuppliers = async () => {
    try {
      setDataLoading(true);
      const response = await getData("Supplier/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setSuppliers(response.result);
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

  const deleteSuppliers = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {

        const response = await getData("Supplier/Remove/" + Id);
        if (response.status.toUpperCase() == "OK") {
          fetchSuppliers();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log("Error fetching data in component:", error);
      }
    }
  }

  const fetchSupplierDetail = async (Id) => {
    try {
      const response = await getData("Supplier/Details/" + Id);
      if (response.status.toUpperCase() == "OK") {
        setInitialValue({

          BusinessName: response.result.businessName,
          ContactPerson: response.result.contactPerson,
          ContactNo: response.result.contactNo,
          Address: response.result.address,
          City: response.result.city,
          State: response.result.state,
          PinCode: response.result.pinCode,
          GSTIN: response.result.gstin,
          PAN: response.result.pan,
          BanckBranch: response.result.banckBranch,
          IFSC: response.result.ifsc,
          AccountNo: response.result.accountNo,
          BankName: response.result.bankName,
          Email: response.result.email

        });
        setSupplierId(response.result.supplierId);

        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };

  const AddressDetailTemplate = (supplier) => {
    return <> {supplier.address} <br />{supplier.city}, {supplier.state} <br />{supplier.pinCode}</>
  }
  const BankDetailTemplate = (supplier) => {
    return <> {supplier.bankName}, {supplier.ifsc} <br />{supplier.accountNo} </>
  };
  const ContactDetailTemplate = (supplier) => {
    return <> {supplier.banckBranch} <br /> {supplier.email}</>
  };
  const ContactNoTemplate = (supplier) => {
    return <>{supplier.businessName} <br />{supplier.contactNo} </>
  };
  const editTemplate = (supplier) => {
    return <i onClick={() => fetchSupplierDetail(supplier.supplierId)} className='fas fa-edit  text-success'></i>;
  };
  const deleteTemplate = (supplier) => {
    return <i onClick={() => deleteSuppliers(supplier.supplierId)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Suppliers</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn"> Add Supplier</button>
                  <SupplierPopup fetchSuppliers={fetchSuppliers} SupplierId={SupplierId} setSupplierId={setSupplierId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                    <span className="input-group-text"> <i className="fas fa-search"></i></span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines filters={filters} globalFilterFields={['businessName', 'pinCode', 'contactNo', 'bankName', 'city', 'state',]} size='small' stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '10rem' }} loading={dataLoading} value={Suppliers}>
                    <Column body={ContactNoTemplate} header="Business Name " sortable></Column>
                    <Column body={ContactDetailTemplate} header="ContactDetail" sortable></Column>
                    <Column body={AddressDetailTemplate} header="AddressDetail"></Column>
                    <Column field="gstin" header="GSTIN "></Column>
                    <Column field="pan" header="PAN"></Column>
                    <Column body={BankDetailTemplate} header="BankDetail" sortable></Column>
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

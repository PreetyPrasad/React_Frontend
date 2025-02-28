import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../API';
import SupplierPopup from './Popups/SupplierPopup'
export default function Supplier() {
  const [Suppliers, setSuppliers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [SupplierId, setSupplierId] = useState(0);
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
    Email: "",
  });

  const fetchSuppliers = async () => {
    try {
      const response = await getData("Supplier/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setSuppliers(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const deleteSuppliers = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
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
          SupplierId: response.result.supplierId,
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
        setSupplierId(response.result.SupplierId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const AddressTemplate = (supplier) => {
      return `${supplier.address} ${supplier.city} ${supplier.state} ${supplier.pinCode}`
  };
  const EmailTemplate = (supplier) => {
    return `${supplier.contactNo} ${supplier.email}`
  };
  const BankTemplate = (supplier) => {
    return `${supplier.banckBranch} ${supplier.bankName}${supplier.ifsc} ${supplier.accountNo}`
  };
  const editTemplate = (supplier) => {
    return <i onClick={() => fetchSupplierDetail(supplier.supplierId)} className='fas fa-edit'></i>;
  };
  const deleteTemplate = (supplier) => {
    return <i onClick={() => deleteSuppliers(supplier.supplierId)} className='fas fa-trash'></i>;
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
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="btn btn-primary">Add Supplier</button>
                  <SupplierPopup fetchSuppliers={fetchSuppliers} SupplierId={SupplierId} setSupplierId={setSupplierId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} />
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={Suppliers} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="supplierId" header="#"></Column>
                    <Column field="businessName" header="BusinessName"></Column>
                    <Column field="contactPerson" header="ContactPerson"></Column>
                    <Column field="contactNo" header="ContactNo"></Column>
                    <Column body={AddressTemplate} header="Address"></Column>
                    <Column field="gstin" header="GSTIN "></Column>
                    <Column field="pan" header="pan"></Column>
                    <Column body={BankTemplate} header="Bank "></Column>
                    <Column body={EmailTemplate} header="email"></Column>
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
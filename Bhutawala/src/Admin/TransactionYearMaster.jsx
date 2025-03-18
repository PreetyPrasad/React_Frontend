import React, { useEffect, useState } from 'react'
import { TransactionYearSchema } from '../Schema';
import { useFormik } from 'formik';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { confirmationAlert, errorAlert, successAlert } from '../SweetAlert/SuccessAlert';
export default function TransactionYear() {
  const [TransactionYearId, setTransactionYearId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    yearName: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [initialValue, setInitialValue] = useState({
    YearName: ""
  });

  const { handleSubmit, handleBlur, handleChange, errors, resetForm, values } = useFormik({
    initialValues: initialValue,
    validationSchema: TransactionYearSchema,
    enableReinitialize: true,
    onSubmit: async (response) => {

      const requestData = {
        "YearName": values.YearName.toUpperCase(),
        "TransactionYearId": TransactionYearId
      };

      try {
        setLoading(true);
        const result = await postData(
          (TransactionYearId == 0 ? "TransactionYear/Save" : "TransactionYear/Edit"),
          requestData
        );
        console.log(result);
        resetForm();
        if (result.status.toUpperCase() === "OK") {
          successAlert("Saved", "Successsfully Saved");
          clearForm();
          fetchTransactions();
        }
        else {
          errorAlert("Error", "Already Exists");
        }
      }
      catch (error) {
        errorAlert("Error posting data in component:", error.message);
      }
      finally {
        setLoading(false);
      }
    }
  });

  const fetchTransactions = async () => {
    try {
      setDataLoading(true);
      const response = await getData("TransactionYear/List");
      if (response.status == "OK") {
        setTransactions(response.result);
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

  const deleteTransactions = async (Id) => {
    var conform = confirmationAlert("Are you sure to delete...?");
    console.log(conform);
    if (conform) {
      try {
        setDataLoading(true);
        const response = await getData("TransactionYear/Remove/" + Id);
        if (response.status == "OK") {
          fetchTransactions();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        errorAlert("Error fetching data in component:", error);
      }
    }
  }

  const chnageStatus = async (Id) => {
    if (window.confirm("Are you sure to set this as a Current Transection Year...?")) {
      try {
        setDataLoading(true);
        const response = await postData("TransactionYear/setCurrentYear/" + Id);
        if (response.status == "OK") {
          fetchTransactions();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchTransactionsDetail = async (Id) => {
    try {
      const response = await getData("TransactionYear/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          YearName: response.result.yearName
        });
        setTransactionYearId(response.result.transactionYearId)
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      errorAlert("Error fetching data in component:", error);
    }
  };

  const clearForm = () => {
    setInitialValue({
      YearName: ""
    });
    setTransactionYearId(0);
  }

  const editTemplate = (transactions) => {
    return <i onClick={() => fetchTransactionsDetail(transactions.transactionYearId)} className='fas fa-edit text-success'></i>;
  };
  const deleteTemplate = (transactions) => {
    return <i onClick={() => deleteTransactions(transactions.transactionYearId)} className='fas fa-trash text-danger'></i>;
  };
  const statusTemplate = (transactions) => {
    return <i onClick={() => chnageStatus(transactions.transactionYearId)} className={`${transactions.currentYear == "True" ? "fas fa-check-circle text-success" : "fas fa-times-circle text-danger"}`} style={{ fontSize: '1.8rem', cursor: 'pointer' }}></i>;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Transaction Year</h4>
            </div>
            {/* end card header */}
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12 mb-2">
                  <b>Year Name</b> <span className='text-danger'>*{errors.YearName}</span>
                  <input type="text" value={values.YearName} onChange={handleChange} onBlur={handleBlur} id='YearName' name='YearName' className='form-control' placeholder='Year Name' />
                </div>
                <div className="col-md-8 mb-2">
                  <button id='btnSave' type='submit' disabled={!loading ? false : true} className='open-modal-btn'>{!loading ? "Save" : "Please Wait"}</button>&nbsp;
                  <button id='btnCancle' onClick={() => clearForm()} type='reset' className='btn-custom btn-cancel'>Cancle</button>
                </div>
                <div className='col-md-4 mb-2'>
                  <div className="input-group">
                    <input type="text" className="form-control" value={globalFilterValue} onChange={onGlobalFilterChange}
                      placeholder="Search" />
                    <span className="input-group-text"> <i className="fas fa-search"></i></span>
                  </div>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable className='p-datatable-header' globalFilterFields={['yearName']} showGridlines size='small' loading={dataLoading} value={transactions} tableStyle={{ minWidth: '50rem' }}>
                    {/* <Column style={{ width: "100px" }} field="transactionYearId" header="#"></Column> */}
                    <Column field="yearName" header="Year Name" sortable size="small" sortField="yearName" sortOrder={-1}></Column>
                    <Column body={statusTemplate} className='text-center' style={{ width: "50px" }}></Column>
                    <Column body={editTemplate} className='text-center' style={{ width: "50px" }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: "50px" }}></Column>
                  </DataTable>
                </div>
              </form>
            </div>
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
  )
}

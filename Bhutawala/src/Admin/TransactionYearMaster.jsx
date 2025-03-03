import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { TransactionYearMasterSchema } from '../Schema';
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TransactionYearMaster() {
  const [loading, setLoading] = useState(false);
  const [dataloading, setDataLoading] = useState(false);
  const [transactionYears, setTransactionYears] = useState([]);
  const [TransactionYearId, setTransactionYearId] = useState(0);
  const [initialValue, setInitalValue] = useState({
    YearName: ""
  });
  const { handleBlur, handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: initialValue,
    validationSchema: TransactionYearMasterSchema,
    enableReinitialize: true,
    onSubmit: async (response) => {
      const requestData = {
        "YearName": values.YearName,
        "TransactionYearId": TransactionYearId
      };

      try {
        setLoading(true);
        const result = await postData(
          (TransactionYearId == 0 ? "TransactionYear/Save" : "TransactionYear/Edit"),
          requestData
        );
        console.log(result);
        if (result.status.toUpperCase() === "OK") {
          alert("Successfully Saved");
          fetchTransactionYears();
        }
        else {
          alert("Already Exists");
        }
      }
      catch (error) {
        console.error("Error  posting data in component:", error.message);
      }
      finally {
        setLoading(false);
        clearForm();
      }
    }
  });

  const fetchTransactionYears = async () => {
    try {
      setDataLoading(true);
      const response = await getData("TransactionYear/List");
      if (response.status.toUpperCase() == "OK") {
        setTransactionYears(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
    finally {
      setDataLoading(false);
    }
  };

  const fetchTransactionYearDetail = async (Id) => {
    try {
      const response = await getData("TransactionYear/Details/" + Id);
      if (response.status == "OK") {
        setInitalValue({
          YearName: response.result.yearName
        })
        setTransactionYearId(response.result.transactionYearId);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  }
  const deleteTransactionYear = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("TransactionYear/Remove/" + Id);
        if (response.status == "OK") {
          setTransactionYears(response.result)
          console.log(response.result);
          fetchTransactionYears();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
      finally {
        setDataLoading(false);
      }
    }
  }
  const clearForm = () => {
    setInitalValue({ YearName: "" });
    setTransactionYearId(0);
  }
  const deleteTemplate = (transactionYear) => {
    return <i onClick={() => deleteTransactionYear(transactionYear.transactionYearId)} className='fas fa-trash text-danger'></i>;
  };
  const editTemplate = (transactionYear) => {
    return <i onClick={() => fetchTransactionYearDetail(transactionYear.transactionYearId)} className='fas fa-edit text-success '></i>;
  };
  useEffect(() => {
    fetchTransactionYears();
  }, []);
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Transaction</h4></div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-md-12 mb-2 ">
                  <b>Transaction</b><span className="text-danger">*{errors.YearName}</span>
                  <input type="text" value={values.YearName} onChange={handleChange}
                    onBlur={handleBlur} id='YearName' name='YearName' className="form-control " placeholder="YearName" />
                </div>
                <div className="col-md-12 mb-2 ">
                  <button id='btnSave' type='submit' disabled={!loading ? false : true} className='open-modal-btn'>{!loading ? "Save" : "Please Wait"}</button>&nbsp;
                  <button id='btnCancle' type='reset' className='btn-custom btn-cancel' onClick={clearForm}>Cancel</button>
                </div>
                <div className='col-md-12 tabl-responsive'>
                  <DataTable value={transactionYears} loading={dataloading} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="transactionYearId" header="TransactionId"></Column>
                    <Column field="yearName" header="Year Name" sortable ></Column>
                    <Column body={editTemplate} className='text-center' style={{ width: '50px' }}></Column>
                    <Column body={deleteTemplate} className='text-center' style={{ width: '50px' }}></Column>
                  </DataTable>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { getData } from '../API'; // Ensure you have this function to call API
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function InwordStock() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [inwordStocks, setInwordStocks] = useState([]);

  const fetchInwordStocks = async () => {
    setDataLoading(true);
    try {
      const response = await getData("InwordStock/List");
      if (response.status.toUpperCase() === "OK") {
        setInwordStocks(response.result);
      } else {
        console.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const deleteInwordStock = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        const response = await getData(`InwordStock/Remove/${Id}`);
        if (response.status === "OK") {
          fetchInwordStocks();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const unitTemplate = (inwordStock) => {
    return `${inwordStock.qty} ${inwordStock.unit}`;
  };

  const editTemplate = (inwordStock) => {
    return <i onClick={() => fetchInwordStockDetail(inwordStock.stockId)} className='fas fa-edit'></i>;
  };

  const deleteTemplate = (inwordStock) => {
    return <i onClick={() => deleteInwordStock(inwordStock.stockId)} className='fas fa-trash'></i>;
  };

  const fetchInwordStockDetail = async (Id) => {
    try {
      const response = await getData(`InwordStock/Details/${Id}`);
      if (response.status === "OK") {
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  useEffect(() => {
    fetchInwordStocks();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">InwordStock</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button onClick={() => setShow(true)} className="btn btn-primary">Open Modal</button>
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable value={inwordStocks} loading={dataLoading} size="small" showGridlines>
                    <Column field="StockId" header="#" style={{ width: '100px' }} />
                    <Column body={unitTemplate} header="Unit" />
                    <Column field="Cost" header="Cost" />
                    <Column field="RecivedDate" header="Received Date" />
                    <Column field="Note" header="Note" />
                    <Column body={editTemplate} className="text-center" style={{ width: '50px' }} />
                    <Column body={deleteTemplate} className="text-center" style={{ width: '50px' }} />
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

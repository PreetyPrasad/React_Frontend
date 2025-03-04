import React, { useEffect, useState } from 'react';
import { getData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import StockPopup from './Popups/StockPopup'

export default function InwordStock() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [inwordStocks, setInwordStocks] = useState([]);
  const [StockId, setStockId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    MaterialId: "",
    PurchaseId: "",
    Qty: "",
    Unit: "",
    Cost: "",
    DateTime: "",
    Note: "",

  });
  const fetchInwordStocks = async () => {
    try {
      setDataLoading(true);
      const response = await getData("InwardStock/List");
      console.log("Response:", response);
      if (response.status?.toUpperCase() === "OK") {
        const validData = response.result.filter(stock => stock.cost >= 0 && stock.qty >= 0);
        setInwordStocks(validData);
      } else {
        console.error("API did not return OK status");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const deleteTemplate = (inwordStock) => {
    return (<i onClick={() => deleteInwordStock(inwordStock.stockId)} className="fas fa-trash" style={{ cursor: 'pointer', color: 'red' }} ></i>);
  };
  const editTemplate = (material) => {
    return <i onClick={() => fetchMaterialDetail(material.materialId)} className='fas fa-edit'></i>;
  };
  const formatDate = (dateString) => {
    if (!dateString) return ""; const date = new Date(dateString); return date.toLocaleDateString("en-GB", {
      day: "2-digit", month: "2-digit",
      year: "numeric",
    });
  };
  useEffect(() => {
    fetchInwordStocks();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">Inward Stock</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2"><button onClick={() => setShow(true)} className="open-modal-btn">Open Modal</button>
                  <StockPopup
                    fetchInwordStocks={fetchInwordStocks} StockId={StockId} setStockId={setStockId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} /></div>
                <div className="col-md-12 table-responsive">
                  <DataTable value={inwordStocks} loading={dataLoading} size="small" showGridlines>
                    <Column field="stockId" header="#" style={{ width: '100px' }} />
                    <Column field="businessName" header="Supplier Name" />
                    <Column field="materialName" header="Material Name" />
                    <Column field="billNo" header="Bill No" />
                    <Column field="purchaseDate" header="Purchase Date" body={(rowData) => formatDate(rowData.purchaseDate)} />
                    <Column field="qty" header="Qty" />
                    <Column field="unit" header="Unit" />
                    <Column field="cost" header="Cost" />
                    <Column field="recivedDate" header="RecivedDate" body={(rowData) => formatDate(rowData.purchaseDate)} />
                    <Column field="note" header="Note" />
                    <Column field="staffname" header="StaffName" />
                    <Column body={deleteTemplate} header="Actions" style={{ width: '50px' }} />
                    <Column body={deleteTemplate} header="Actions" style={{ width: '50px' }} />
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

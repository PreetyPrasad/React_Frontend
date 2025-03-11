import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";
import StockPopup from "./Popups/StockPopup";

const InwardStock = ({ purchaseId: propPurchaseId }) => {
  const { purchaseId: routePurchaseId } = useParams();
  const purchaseId = propPurchaseId || routePurchaseId;

  const [inwardStocks, setInwardStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [stockId, setStockId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    MaterialId: "",
    StaffId: "",
    PurchaseId: purchaseId ?? "",
    Qty: "",
    Unit: "",
    Cost: "",
    RecivedDate: "",
    Note: "",
  });

  const fetchInwardStocks = async () => {
    if (!purchaseId) {
      setError("Purchase ID is not available");
      return;
    }
    setLoading(true);
    try {
      const stockResponse = await getData(`InwardStock/InwordStocks/${purchaseId}`);
      if (stockResponse?.status?.toUpperCase() === "OK" && Array.isArray(stockResponse?.result)) {
        setInwardStocks(stockResponse.result);
      } else {
        setInwardStocks([]);
        setError(stockResponse?.message || "Failed to retrieve inward stock data.");
      }
    } catch (error) {
      setError("Error fetching inward stock details.");
      setInwardStocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInwardStocks();
  }, [purchaseId]);

  const deleteStock = async (Id) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        setLoading(true);
        const response = await getData(`InwardStock/Remove/${Id}`);
        if (response?.status?.toUpperCase() === "OK") {
          fetchInwardStocks();
        } else {
          console.log("Error deleting stock");
        }
      } catch (error) {
        console.error("Error deleting stock:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchStockDetail = async (Id) => {
    try {
      const response = await getData("InwardStock/Details/" + Id);
      if (response?.status?.toUpperCase() === "OK") {
        setInitialValue({
          StockId: response.result.stockId,
          MaterialId: response.result.materialId,
          PurchaseId: response.result.purchaseId,
          StaffId: response.result.staffId,
          Unit: response.result.unit,
          Qty: response.result.qty,
          Cost: response.result.cost,
          RecivedDate: response.result.recivedDate,
          Note: response.result.note,
        });
        setStockId(response.result.stockId);
        setShow(true);
      } else {
        console.log("Error fetching stock details");
      }
    } catch (error) {
      console.error("Error fetching stock details:", error);
    }
  };

  const handleNewInsert = () => {
    setStockId(0);
    setInitialValue({
      MaterialId: "",
      StaffId: "",
      PurchaseId: purchaseId ?? "",
      Qty: "",
      Unit: "",
      Cost: "",
      RecivedDate: "",
      Note: "",
    });
    setShow(true);
  };

  return (
    <div>
      <button type="button" onClick={handleNewInsert} className="open-modal-btn"> Add New Stock  </button>
      
      {show && (
        <StockPopup show={show} setShow={setShow} fetchInwardStocks={fetchInwardStocks} stockId={stockId} setStockId={setStockId} initialValue={initialValue} setInitialValue={setInitialValue} setLoading={setLoading} loading={loading}  />
      )}

      {loading ? <p>Loading...</p> : error ? <p className="text-danger">{error}</p> : (
        <DataTable value={inwardStocks} size="small" showGridlines>
          <Column field="stockId" header="#" />
          <Column field="materialName" header="Material Name" />
          <Column field="billNo" header="Bill No" />
          <Column field="purchaseDate" header="Purchase Date" />
          <Column field="qty" header="Quantity" />
          <Column field="unit" header="Unit" />
          <Column field="cost" header="Cost" />
          <Column field="recivedDate" header="Received Date" />
          <Column field="note" header="Note" />
          <Column field="staffname" header="Staff Name" />
          <Column body={(rowData) => (
            <>
              <i onClick={() => deleteStock(rowData.stockId)} className="fa-solid fa-trash text-danger" style={{ marginRight: "10px" }} ></i>

              <i onClick={() => fetchStockDetail(rowData.stockId)} className="fa-solid fa-pen-to-square text-success"></i>
            </>
          )}  />
        </DataTable>
      )}
    </div>
  );
};

export default InwardStock;

import React, { useEffect, useState } from "react";
import { getData } from "../API";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useParams } from "react-router-dom";

const InwardStock = ({ purchaseId: propPurchaseId }) => {
  const { purchaseId: routePurchaseId } = useParams();
  const purchaseId = propPurchaseId || routePurchaseId || '';

  const [inwardStocks, setInwardStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!purchaseId) {
      setError('Purchase ID is not available');
      return;
    }
    console.log('Received Purchase ID:', purchaseId);

    const fetchInwardStocks = async () => {
      setLoading(true);
      try {
        const response = await getData(`InwardStock/InwordStocks/${purchaseId}`);
        console.log('API Response:', response);

        if (response?.status?.toUpperCase() === 'OK' && response.result) {
          if (response.result.length === 0) {
            setError(`No inward stock records found for Purchase ID: ${purchaseId}`);
          } else {
            setInwardStocks(response.result);
          }
        } else {
          setError('Failed to retrieve inward stock data.');
        }
      } catch (error) {
        console.error('Error fetching inward stock:', error);
        setError('Failed to fetch inward stock details.');
      } finally {
        setLoading(false);
      }
    };

    fetchInwardStocks();
  }, [purchaseId]);

  return (
    <div>
      {loading ? (
        <p>Loading inward stock...</p>
      ) : error ? (
        <p>{error}</p>
      ) : inwardStocks.length > 0 ? (
        <DataTable value={inwardStocks} size="small" showGridlines>
          <Column field="stockId" header="#" />
          <Column field="billNo" header="Bill No" />
          <Column field="purchaseDate" header="Purchase Date" />
          <Column field="qty" header="Qty" />
          <Column field="unit" header="Unit" />
          <Column field="cost" header="Cost" />
          <Column field="receivedDate" header="Received Date" />
          <Column field="note" header="Note" />
        </DataTable>
      ) : (
        <p>No inward stock found.</p>
      )}
    </div>
  );
};

export default InwardStock;

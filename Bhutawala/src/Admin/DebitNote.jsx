
import React, { useEffect, useState } from 'react'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";
import Debitpopup from './Popups/Debitpopup';
export default function DebitNote() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const [DebitNotes, setDebitNotes] = useState([]);
  const [NoteID, seNoteID] = useState(0);
  const [initialValue, setInitialValue] = useState({
    NoteID: "",
    PurchaseId: "",
    StaffId: "",
    Amount: "",
    NoteDate: "",
  });
  const fetchDebitNotes = async () => {
    try {
      const response = await getData("DebitNote/List");
      if (response.status.toUpperCase() === "OK") {

        const purchaseResponse = await getData("PurchaseMaster/List");
        const staffResponse = await getData("StaffMaster/List");

        const purchasesMap = Object.fromEntries(
          purchaseResponse.result.map(s => [s.purchaseId, s.billNo])
        );
        const staffsMap = Object.fromEntries(
          staffResponse.result.map(t => [t.staffId, t.fullName])
        );
        const debitNoteData = response.result.map(debit => ({
          ...debit,
          purchase: purchasesMap[debit.purchaseId] || "N/A",
          fullName: staffsMap[debit.staffId] || "N/A"
        }));
        setDebitNotes(debitNoteData)
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const deleteDebitNote = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("DebitNote/Remove/" + Id);
        if (response.status == "OK") {
          fetchDebitNotes();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchDebetDetail = async (Id) => {
    try {
      const response = await getData("DebitNote/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          NoteID: response.result.noteID,
          PurchaseId: response.result.purchaseId,
          StaffId: response.result.staffId,
          Amount: response.result.amount,
          NoteDate: response.result.noteDate,

        });
        seNoteID(response.result.noteID);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };
  const editTemplate = (debitNote) => {
    return <i onClick={() => fetchDebetDetail(debitNote.NoteID)} className='fas fa-edit text-success'></i>;
  };
  const deleteTemplate = (debitNote) => {
    return <i onClick={() => deleteDebitNote(debitNote.NoteID)} className='fas fa-trash text-danger'></i>;
  };
  useEffect(() => {
    fetchDebitNotes();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "-"; const date = new Date(dateString); if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header"><h4 className="card-title mb-0">DebitNote</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">Open modal</button>
                   <Debitpopup fetchDebitNotes={fetchDebitNotes} NoteID={NoteID} seNoteID={seNoteID} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} /> 
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={DebitNotes} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="purchase" header="purchase"></Column>
                    <Column field="fullName" header="FullName." sortable></Column>
                    <Column field="amount" header="Amount"></Column>
                    <Column field="noteDate" header="NoteDate" body={(rowData) => formatDate(rowData.noteDate)}  ></ Column>
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

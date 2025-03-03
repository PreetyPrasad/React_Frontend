
import React, { useEffect, useState } from 'react'

import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function CreditNote() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [CreditNotes, setCreditNotes] = useState([]);
  const [CreditNoteId, setCreditNoteId] = useState(0);
  const [initialValue, setInitialValue] = useState({
    StaffId: "",
    // InvoiceId: "",
    Amount: "",
    NoteNo: "",
    DateTime: ""
  });

  const fetchCreditNotes = async () => {
    try {
      const response = await getData("CreditNote/List");
      console.log(response)
      if (response.status.toUpperCase() == "OK") {
        setCreditNotes(response.result);
        console.log(response.result);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  const deleteCreditNote = async (Id) => {
    if (window.confirm("Are you sure to delete...?")) {
      try {
        setDataLoading(true);
        const response = await getData("CreditNote/Remove/" + Id);
        if (response.status == "OK") {
          fetchCreditNotes();
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data in component:", error);
      }
    }
  }

  const fetchCreditNoteDetail = async (Id) => {
    try {
      const response = await getData("CreditNote/Details/" + Id);
      if (response.status == "OK") {
        setInitialValue({
          StaffId: response.result.StaffId,
          // InvoiceId: response.result.invoiceId,
          Amount: response.result.amount,
          NoteNo: response.result.noteNo,
          DateTime: response.result.dateTime,
        });
        setCreditNoteId(response.result.creditNoteId);
        setShow(true);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data in component:", error);
    }
  };

  // const unitTemplate = (material) => {
    // return `${material.qty} ${material.unit}`
  // };

  const editTemplate = (creditNote) => {
    return <i onClick={() => fetchCreditNoteDetail(creditNote.creditNoteId)} className='fas fa-edit'></i>;
  };

  const deleteTemplate = (creditNote) => {
    return <i onClick={() => deleteCreditNote(creditNote.creditNoteId)} className='fas fa-trash'></i>;
  };

  useEffect(() => {
    fetchCreditNotes();
  }, []);


  return (
    <div className="container-fluid" jstcache={0}>
      <div className="row" jstcache={0}>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">CreditNote</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <button type="button" id='openPopup' onClick={() => setShow(true)} className="open-modal-btn">Open modal</button>
                  {/* <MaterialPopup fetchMaterials={fetchMaterials} MaterialId={MaterialId} setMaterialId={setMaterialId} loading={loading} setLoading={setLoading} initialValue={initialValue} setInitialValue={setInitialValue} show={show} setShow={setShow} /> */}
                </div>
                <div className="col-md-12 table-responsive">
                  <DataTable showGridlines size='small' loading={dataLoading} value={CreditNotes} tableStyle={{ minWidth: '50rem' }}>
                    <Column style={{ width: "100px" }} field="materialId" header="#"></Column>
                    <Column field="staffId" header="StaffId"></Column>
                    {/* <Column field="invoiceId" header="InvoiceId"></Column> */}
                    <Column field="amount" header="Amount"></Column>
                    <Column field="noteNo" header="NoteNo"></Column>
                    <Column field="noteDate" header="DateTime"></Column>
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

import Footer from "./Footer";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Sidebar from "./Sidebar";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function DebitNote() {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Settings />
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">DebitNote</h4>

                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-info btn-lg"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Add DebitNote
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12 table-responsive">
                      <DataTable
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        size="small"
                      >
                        <Column field="categoryId" sortable header="#" />
                        <Column field="Category" sortable header="Category" />
                        <Column field="Unit" sortable header="Unit" />
                        <Column field="Qty" sortable header="Qty" />
                        <Column field="Net_Qty" sortable header="Net_Qty" />
                        <Column field="Description" sortable header="Description" />
                        <Column field="Brand" sortable header="Brand" />
                        <Column field="GST" sortable header="GST" />
                        <Column field="GST_Type" sortable header="GST_Type" />
                        <Column
                          style={{ width: "30px" }}
                          field="categoryId"
                          header=""
                        />
                        <Column
                          style={{ width: "30px" }}
                          field="categoryId"
                          header=""
                        />
                      </DataTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /Insert Material */}
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-md"> {/* Add modal-dialog-centered for center alignment */}
          {/* Modal content */}
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="card-body">
                    <form
                      className="cmxform"
                      id="MaterialForm"
                      method="get"
                      action="#"
                    >
                      <fieldset>
                        <div className="form-group">
                          <label htmlFor="PurchaseId">PurchaseId</label>
                          <input
                            id="Materialname"
                            className="form-control"
                            name="Materialname"
                            type="text"
                            placeholder="enter Purchase Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="StaffId">StaffId</label>
                          <input
                            id="StaffId"
                            className="form-control"
                            name="StaffId"
                            type="text"
                            placeholder="enter Staff Name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="Amount">Amount</label>
                          <input
                            id="Amount"
                            className="form-control"
                            name="Amount"
                            type="text"
                            placeholder="enter Amount"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="NoteDate">NoteDate</label>
                          <input
                            id="NoteDate"
                            className="form-control"
                            name="NoteDate"
                            type="text"
                            placeholder="Enter NoteDate"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="LogDate">LogDate</label>
                          <input
                            id="LogDate"
                            className="form-control"
                            name="LogDate"
                            type="text"
                            placeholder="enter LogDate"
                          />
                        </div>

                        <input
                          className="btn btn-primary"
                          type="submit"
                          defaultValue="Submit"
                        />
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

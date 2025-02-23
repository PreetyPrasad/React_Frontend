import Footer from "./Footer";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Sidebar from "./Sidebar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useFormik } from "formik";

import { SalesReturnSchema } from "../Schema";
const initialValues = {
    SalesReturnId: "",
    InvoiceId: "",
    InvoiceMaster: "",
    Paymentmode: "",
    RefNo: "",
    ReturnDate: "",
    StaffId: "",
    StaffMaster: "",
};
export default function SalesReturn() {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: SalesReturnSchema,
            onSubmit: (values) => {
                console.log(values);
            },
        });


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
                                        <p className="card-description">SalesReturn</p>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {/* Content Start From here */}
                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-lg bg-theme"
                                                    data-toggle="modal"
                                                    data-target="#myModal"
                                                >
                                                    Add Material
                                                </button>
                                            </div>
                                        </div>
                                        {/* Table */}
                                        <div className="col-md-12 table-responsive">
                                            <DataTable
                                                paginator
                                                rows={5}
                                                rowsPerPageOptions={[5, 10, 25, 50]}
                                                size="small"

                                            // Apply the debounced global filter
                                            >
                                                <Column field="SalesReturnId" sortable header="#" />
                                                <Column field="InvoiceId" sortable header="InvoiceId" />
                                                <Column
                                                    field="InvoiceMaster"
                                                    sortable
                                                    header="InvoiceMaster"
                                                />
                                                <Column
                                                    field="Paymentmode"
                                                    sortable
                                                    header="Paymentmode"
                                                />
                                                <Column field="RefNo" sortable header="RefNo" />
                                                <Column
                                                    field="ReturnDate"
                                                    sortable
                                                    header="ReturnDate"
                                                />
                                                <Column field="StaffId" sortable header="StaffId" />
                                                <Column
                                                    field="StaffMaster"
                                                    sortable
                                                    header="StaffMaster"
                                                />
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
                    {/* insertTable */}
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-md">
                            {/* Modal content */}
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <form
                                            className="cmxform col-md-12"
                                            id="MaterialForm"
                                            method="get"
                                            action="#"
                                            onSubmit={handleSubmit}
                                        >
                                            <fieldset className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="firstname">SalesReturnId</label>
                                                                <select
                                                                    name="Category"
                                                                    id="Category"
                                                                    className="form-control"
                                                                >
                                                                    {
                                                                        // categories.map((category) => (
                                                                        //   <option key={category.categoryId} value={category.categoryId}>
                                                                        //     {category.categoryName}
                                                                        //   </option>
                                                                        // ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="Paymentmode">Paymentmode</label>
                                                                <input
                                                                    id="Paymentmode"
                                                                    className="form-control"
                                                                    name="Paymentmode"
                                                                    type="text"
                                                                    placeholder="Paymentmode "
                                                                    autoComplete="off"
                                                                    values={values.PaymentMode}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {
                                                                    errors.Paymentmode && touched.Paymentmode ? (
                                                                        <p className="cmxform">
                                                                            {errors.Paymentmode}
                                                                        </p>
                                                                    ) : null

                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="RefNo">RefNo</label>
                                                                <input
                                                                    id="RefNo"
                                                                    className="form-control"
                                                                    name="RefNo"
                                                                    type="text"
                                                                    placeholder="RefNo  "
                                                                    autoComplete="off"
                                                                    values={values.RefNo}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="ReturnDate">ReturnDate</label>
                                                                <input
                                                                    id="ReturnDate"
                                                                    className="form-control"
                                                                    name="ReturnDate"
                                                                    type="text"
                                                                    placeholder="ReturnDate"
                                                                    autoComplete="off"
                                                                    values={values.ReturnDate}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="StaffId">StaffId</label>
                                                                <select
                                                                    name="StaffId"
                                                                    className="form-control"
                                                                    id="StaffId"
                                                                >
                                                                    <option value="CM">CM</option>
                                                                    <option value="Meter">Meter</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <input
                                                        className="btn btn-primary"
                                                        type="submit"
                                                        defaultValue="Submit"
                                                    />
                                                    &nbsp;
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

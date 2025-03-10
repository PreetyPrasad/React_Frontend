import React, { useState, useEffect } from "react";
import { getData, postData } from "../../API";
import { InvoiceSchema } from '../../Schema';
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
export default function InvoicePopup({ show, handleClose, refreshInvoices }) {
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [yearList, setYearList] = useState([]);
  useEffect(() => {
    if (show) {
      fetchDropdownData();
    }
  }, [show]);

  const fetchDropdownData = async () => {
    try {
      const staffResponse = await getData("Staff/List");
      const yearResponse = await getData("TransactionYear/List");

      console.log("Staff API Response:", staffResponse);
      console.log("Transaction Year API Response:", yearResponse);

      if (staffResponse.status === "OK") setStaffList(staffResponse.result);
      if (yearResponse.status === "OK") setYearList(yearResponse.result);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };
  // const { handleSubmit, handleChange, handleBlur, errors, values, setFieldValue } = useFormik({
    // enableReinitialize: true,
    // initialValues: props.initialValue,
    // validationSchema: InvoiceSchema,
    // onSubmit: async (values) => {
      // const requestData = {
    // transactionYearId: "",
    // staffId: "",
    // customerName: "",
    // contactNo: "",
    // totalGross: "",
    // gst: "",
    // gst_TYPE: "",
    // total: "",
    // invoiceDate: "",
    // noticePeriod: "",
    // gstin: "",
  // });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const response = await postData("InvoiceMaster/Save", values);

    if (response.status === "OK") {
      alert("Invoice Added Successfully!");
      refreshInvoices(); // Refresh table after insert
      resetForm();
      handleClose();
    } else {
      alert("Error: " + response.result);
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Transaction Year Dropdown */}
              <div className="form-group">
                <label>Transaction Year</label>
                <Field as="select" name="transactionYearId" className="form-control">
                  <option value="">Select Year</option>
                  {yearList.map((year) => (
                    <option key={year.id} value={year.id}>{year.yearName}</option>
                  ))}
                </Field>
                <ErrorMessage name="transactionYearId" component="div" className="text-danger" />
              </div>

              {/* Staff Dropdown */}
              <div className="form-group">
                <label>Staff</label>
                <Field as="select" name="staffId" className="form-control">
                  <option value="">Select Staff</option>
                  {staffList.map((staff) => (
                    <option key={staff.staffId} value={staff.staffId}>{staff.fullName}</option>
                  ))}
                </Field>
                <ErrorMessage name="staffId" component="div" className="text-danger" />
              </div>

              {/* Other Fields */}
              <div className="form-group">
                <label>Customer Name</label>
                <Field type="text" name="customerName" className="form-control" />
                <ErrorMessage name="customerName" component="div" className="text-danger" />
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting || loading}>
                  {loading ? "Saving..." : "Save Invoice"}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

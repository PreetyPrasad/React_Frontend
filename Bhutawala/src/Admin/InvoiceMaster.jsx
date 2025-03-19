import React, { useEffect, useState } from 'react'
import InvoiceMasterPopup from './Popups/InvoiceMasterPopup'
import { getData, postData } from '../API';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DetailPopup from './Popups/DetailPopup';
import { generatePDF } from './generatePDF ';
import { confirmationAlert, errorAlert, successAlert, warningAlert } from '../SweetAlert/SuccessAlert';
import { InvoiceSchema } from '../Staff/Schema';
import { useFormik } from 'formik';

export default function InvoiceMaster() {
  const [Invoices, setInvoices] = useState([]);
  const [InvoiceId, setInvoiceId] = useState(0);
  const [showInvoicePopup, setshowInvoicePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [invoiceProducts, setInvoiceProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // ✅ Payment State
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentRefNo, setPaymentRefNo] = useState("");
  const [InvoiceNo, setInvoiceNo] = useState("");
  const [paymentMode, setPaymentMode] = useState("Select Mode");
  const [gst_Type, setGST_Type] = useState("CGST");
  const [payments, setPayments] = useState([]);

  const [initialValue, setInitialValue] = useState({
    CustomerName: "",
    ContactNo: "",
    TotalGross: "",
    GST: "",
    GST_Type: "",
    Total: "",
    InvoiceDate: "",
    NoticePeriod: "",
    GSTIN: "",
    Email: ""
  });


  const { values, handleBlur, handleSubmit, handleReset, errors, setFieldValue, handleChange } = useFormik({
    initialValues: initialValue,
    validationSchema: InvoiceSchema,
    onSubmit: async () => {
      setLoading(true);
      var GrossAmt = 0;
      var GSTAmt = 0;
      invoiceProducts.forEach(item => {
        GrossAmt += parseFloat(item.Rate);
        GSTAmt += parseFloat(item.GSTAmount);
      });

      const reqData = {
        "InvoiceNo": InvoiceNo,
        "CustomerName": values.CustomerName,
        "ContactNo": values.ContactNo,
        "InvoiceDetails": invoiceProducts,
        "installments": payments,
        "TotalGross": GrossAmt,
        "GST": GSTAmt,
        "GST_TYPE": values.GST_Type,
        "Total": (GrossAmt + GSTAmt),
        "InvoiceDate": values.InvoiceDate,
        "NoticePeriod": values.NoticePeriod,
        "GSTIN": values.GSTIN
      };
      try {
        console.log("Final Invoice: ", reqData);
        const response = await postData("InvoiceMaster/Save", reqData);
        console.log("Invoice Status: ", response);

        if (response.status.toUpperCase() === "OK") {
          successAlert("Success", "Invoice Generated Successfully!");

          // Reset Form and State
          handleReset();
          setInvoiceProducts([]);  // Clear products
          setPayments([]); // Clear payments
          setInvoiceNo(""); // Reset invoice number
          getInvoiceNo(); // Fetch new invoice number
        }
        else {
          errorAlert("Error", "Failed to generate invoice.");
        }
      }
      //  catch (error) 
      //  {
      //   console.error("Error while submitting invoice:", error);
      //   // errorAlert("Error", "Something went wrong!");
      // } 
      finally {
        setLoading(false); // Stop Loading
      }
    }
  });


  // ✅ Add Payment Function
  const addPayment = () => {
    if (paymentAmount === "") {
      errorAlert("Payment Error", "Please enter Amount")
      return;
    }

    const totalInvoiceAmount = invoiceProducts.reduce((acc, curr) => acc + parseFloat(curr.Total), 0);

    // ✅ Calculate Total Paid Amount
    const totalPaid = payments.reduce((acc, curr) => acc + parseFloat(curr.Amount), 0);

    // ✅ Calculate Remaining Balance
    const remainingBalance = totalInvoiceAmount - totalPaid;

    const enteredAmount = parseFloat(paymentAmount);

    // ✅ Prevent Over-Payment
    if (enteredAmount > remainingBalance) {
      errorAlert("Payment Error", "You cannot pay more than the remaining balance.")
      return;
    }

    // ✅ Prevent Over-Payment
    if (enteredAmount > remainingBalance) {
      errorAlert("Payment Error", "You cannot pay more than the remaining balance.")

      return;
    }

    // ✅ Add Payment in Array
    setPayments([
      ...payments,
      {
        Amount: parseFloat(paymentAmount),
        Mode: paymentMode,
        RefNo: paymentRefNo
      }
    ]);

    // ✅ Reset Fields
    setPaymentAmount("");
    setPaymentRefNo("");
    setPaymentMode("Select Mode ");
    setGST_Type("Select GST");

    successAlert("Success", "Payment Added Successfully!");
  }

  // ✅ Calculate Total Paid
  const totalPaid = payments.reduce((acc, curr) => acc + curr.Amount, 0);

  //total Invoice Amount
  const totalInvoiceAmount = invoiceProducts.reduce((acc, curr) => acc + parseFloat(curr.Total), 0);

  // ✅ Calculate Remaining Balance
  const remainingBalance = invoiceProducts.reduce((acc, curr) => acc + parseFloat(curr.Total), 0) - totalPaid;

  const getInvoiceNo = async () => {
    try {
      setDataLoading(true);
      const response = await getData("InvoiceMaster/MaxNo");
      if (response.status.toUpperCase() == "OK") {
        console.log("Invoice No", response);
        setInvoiceNo(response.result);
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

  const deleteProduct = (index) => {
    if (window.confirm("Are you sure to remove this product?")) {
      const updatedProducts = invoiceProducts.filter((item, i) => i !== index);
      setInvoiceProducts(updatedProducts);
    }
  }
  const handleDeletePayment = (index) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      const updatedPayments = payments.filter((item, i) => i !== index);
      setPayments(updatedPayments);
      successAlert("Deleted", "Payment deleted successfully");
    }
  }

  const changeGST = (value) => {
    setFieldValue("GST_Type", value);
  }
  const changePaymentMode = (value) => {
    setFieldValue("paymentMode", value);
  }

  useEffect(() => {
    getInvoiceNo();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Invoice Master</h4>
            </div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="row">
                <div className="col-md-2 mb-2">
                  <strong>Invoice No</strong>
                  <span className='text-danger'>*{errors.InvoiceNo}</span>
                  <label className="form-control" id="label1">{InvoiceNo}</label>
                </div>
                <div className="col-md-7 mb-2"></div>
                <div className="col-md-3 mb-2">
                  <strong>Date</strong>
                  <span className='text-danger'>*{errors.InvoiceDate}</span>
                  <input type="date" name='InvoiceDate' id='InvoiceDate' value={values.InvoiceDate} onBlur={handleBlur} onChange={handleChange} className='form-control' />
                </div>
                <div className="col-md-3 mb-2">
                  <strong>Customer</strong>
                  <span className='text-danger'>*{errors.CustomerName}</span>
                  <input type="text" name='CustomerName' id='CustomerName' value={values.CustomerName} onChange={handleChange} onBlur={handleBlur} className='form-control' placeholder='Name' />
                </div>
                <div className="col-md-3 mb-2">
                  <strong>Contact No</strong>
                  <span className='text-danger'>*{errors.ContactNo}</span>
                  <input type="text" value={values.ContactNo} name='ContactNo' id='ContactNo' onChange={handleChange} onBlur={handleBlur} className='form-control' placeholder='Contact No +91 XXXXXXXXXX' />
                </div>
                <div className="col-md-3 mb-2">
                  <strong>GSTIN</strong>
                  <span className='text-danger'>{errors.GSTIN}</span>
                  <input type="text" value={values.GSTIN} name='GSTIN' id='GSTIN' onChange={handleChange} onBlur={handleBlur} className='form-control' placeholder='GSTIN' />
                </div>
                <div className="col-md-3 mb-2">
                  <strong>Email</strong>
                  <span className='text-danger'>*{errors.Email}</span>
                  <input type="text" value={values.Email} name='Email' id='Email' onChange={handleChange} onBlur={handleBlur} className='form-control' placeholder='Email' />
                </div>
                <div className="col-md-12">
                  <table className='table table-bordered text-center'>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "right" }} colSpan="10">
                          <button onClick={() => setshowInvoicePopup(true)} type='button' className='btn btn-primary'>
                            <i className='fas fa-plus'></i> Product
                          </button>
                        </th>
                      </tr>
                      <tr>
                        <th>Sr No.</th>
                        <th>Title</th>
                        <th>Rate (₹)</th>
                        <th>GST %</th>
                        <th>GST (₹)</th>
                        <th>Amount (₹)</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Total (₹)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        invoiceProducts.map((o, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{o.MaterialName}</td>
                              <td>₹ {parseFloat(o.Rate).toFixed(2).toLocaleString('en-IN')}</td>
                              <td>{o.GST}%</td>
                              <td>₹ {parseFloat(o.GSTAmount).toFixed(2)}</td>
                              <td>₹ {(parseFloat(o.Rate) + parseFloat(o.GSTAmount)).toFixed(2)}</td>
                              <td>{o.Qty}</td>
                              <td>{o.Unit}</td>
                              <td>₹ {parseFloat(o.Total).toFixed(2).toLocaleString('en-IN')}</td>
                              <td>
                                <button
                                  className='btn btn-danger btn-sm'
                                  onClick={() => deleteProduct(index)}
                                >
                                  <i className='fas fa-trash'></i>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                  {/* ✅ Payment Table */}
                  <h5><strong>Payments</strong></h5>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>Amount (₹)</th>
                        <th>Payment Mode</th>
                        <th>Ref. No</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        payments.map((p, index) => (
                          <tr key={index}>
                            <td>₹ {p.Amount.toLocaleString('en-IN')}</td>
                            <td>{p.Mode}</td>
                            <td>{p.RefNo}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeletePayment(index)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                      <tr>
                        <td colSpan="3">
                          <strong>Total Paid: ₹ {totalPaid.toLocaleString('en-IN')}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <strong>
                            Remaining Balance: <span style={{ color: 'red' }}>₹ {remainingBalance.toLocaleString('en-IN')}</span>
                          </strong>
                        </td>
                      </tr>
                      <div className="col-md-12 mb-4" >
                        <h5 style={{
                          position: 'absolute',
                          right: '0',
                          marginRight: '15px',
                          whiteSpace: 'nowrap'
                        }}>
                          Total Amount: <strong>₹ {totalInvoiceAmount.toLocaleString('en-IN')}</strong>
                        </h5>
                      </div>
                    </tbody>
                  </table>

                  {/* ✅ Payment Inputs */}
                  <div className="row">
                    <div className="col-md-3 mb-2">
                      <strong>Amount</strong>
                      <span className='text-danger'>*{errors.paymentAmount}</span>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Amount'
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <strong>Payment Mode</strong>
                      <span className='text-danger'>*{errors.paymentMode}</span>
                      <select
                        className='form-select'
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                      >
                        <option value="Select Mode">Select Mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-2 ">
                      <strong>Ref No.</strong>
                      <span className='text-danger'>{errors.RefNo}</span>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Ref No'
                        value={paymentRefNo}
                        onChange={(e) => setPaymentRefNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 mt-3">
                      <button
                        onClick={addPayment}
                        className='btn btn-success'>
                        Add Payment
                      </button>
                    </div>
                    <div className="col-md-3 mb-2">
                      <strong>GST TYPE</strong>
                      <span className='text-danger'>*{errors.GST_Type}</span>
                      <select
                        className='form-select'
                        value={values.GST_Type}
                        onChange={(e) => changeGST(e.target.value)}
                      >
                        <option value="Select GST">Select GST</option>
                        <option value="CGST">CGST & SGST</option>
                        <option value="IGST">IGST</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-2">
                      <strong>Notice Period</strong>
                      <span className='text-danger'>*{errors.NoticePeriod}</span>
                      <input
                        type='Date'
                        className='form-control'
                        id="NoticePeriod"
                        name="NoticePeriod"
                        value={values.NoticePeriod}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="col-md-12 mt-2 text-danger">
                      {/* <button type="button" className="btn btn-primary btn-lg"
                        onClick={() => generatePDF(InvoiceNo)} disabled={loading}>
                        {loading ? "Processing..." : "Generate PDF"}
                      </button>*/}

                      {/* <button type="submit" className="btn btn-primary btn-lg" disabled={loading}> */}
                      {/* {loading ? "Processing..." : "Generate Receipt"} */}
                      {/* </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <DetailPopup
              setInvoiceProducts={setInvoiceProducts}
              invoiceProducts={invoiceProducts}
              setshowInvoicePopup={setshowInvoicePopup}
              showInvoicePopup={showInvoicePopup}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

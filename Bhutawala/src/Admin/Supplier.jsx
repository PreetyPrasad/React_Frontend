import { useFormik } from "formik";
import React, { useState } from "react";
import { SupplierSchema } from "../Schema"; // Ensure your schema is correctly defined
import { toast } from "react-toastify";
import { postData } from "../API";

export default function Supplier() {
  const [initialValues, setinitalValues] = useState({
    BusinessName: "",
    ContactPerson: "",
    ContactNo: "",
    Address: "",
    City: "",
    PinCode: "",
    GSTIN: "",
    PAN: "",
    BanckBranch: "",
    IFSC: "",
    AccountNo: "",
    BankName: "",
    LogDate: "",
    Email:"",
    
  })
  var formik = useFormik({
    initialValues: initialValues, validationSchema: SupplierSchema,
    onSubmit: async (values) => {
      const requestData = {
        BusinessName: data.BusinessName,
        ContactPerson: data.ContactPerson,
        ContactNo: data.ContactNo,
        Address: data.Address,
        City: data.City,
        State: data.State,
        PinCode: data.PinCode,
        GSTIN: data.GSTIN,
        PAN: data.PAN,
        BanckBranch: data.BanckBranch,
        IFSC: data.IFSC,
        AccountNo: data.AccountNo,
        BankName: data.BankName,
        LogDate: data.LogDate,
        Email: data.Email,

      };
      console.log(requestData);
      try {
        const result = await postData(requestData, "Supplier/Save");
        console.log(result);
        if (result.status === "Ok") {
          toast.success("Successfully Saved");
        } else {
          toast.error("");
        }
      }catch(err) {
      console.log(err);
      toast.error("somethig went wrong")
    }finally{    
      }
    }
  });
  return (
    <div className="container mt-4">
      <div className="card-body">
        <form>
          <div className="col-md-6 mb-3">
            <b>BusinessName</b>&nbsp;<span className='text-danger'>* {formik.errors.BusinessName} </span>
            <input type="text" name="BusinessName" id="BusinessName" placeholder='BusinessName Name' value={formik.values.BusinessName} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            <div className="col-md-6 mb-3">
              <b>ContactPerson</b>&nbsp;<span className='text-danger'>* {formik.errors.ContactPerson} </span>
              <input type="text" name="ContactPerson" id="ContactPerson" placeholder='ContactPerson Name' value={formik.values.
                ContactPerson} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>ContactNo</b>&nbsp;<span className='text-danger'>* {formik.errors.ContactNo} </span>
              <input type="text" name="ContactNo" id="ContactNo" placeholder='ContactNo Name' value={formik.values.
                ContactNo} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>Address</b>&nbsp;<span className='text-danger'>* {formik.errors.Address} </span>
              <input type="text" name="Address" id="Address" placeholder='Address Name' value={formik.values.
                Address} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>City</b>&nbsp;<span className='text-danger'>* {formik.errors.City} </span>
              <input type="text" name="City" id="City" placeholder='City Name' value={formik.values.
                City} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>PinCode</b>&nbsp;<span className='text-danger'>* {formik.errors.PinCode} </span>
              <input type="text" name="PinCode" id="PinCode" placeholder='PinCode Name' value={formik.values.
                PinCode} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>GSTIN</b>&nbsp;<span className='text-danger'>* {formik.errors.GSTIN} </span>
              <input type="text" name="GSTIN" id="GSTIN" placeholder='GSTIN Name' value={formik.values.
                GSTIN} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>PAN</b>&nbsp;<span className='text-danger'>* {formik.errors.PAN} </span>
              <input type="text" name="PAN" id="PAN" placeholder='PAN Name' value={formik.values.
                PAN} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>BanckBranch</b>&nbsp;<span className='text-danger'>* {formik.errors.BanckBranch} </span>
              <input type="text" name="BanckBranch" id="BanckBranch" placeholder='BanckBranch Name' value={formik.values.
                BanckBranch} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>IFSC</b>&nbsp;<span className='text-danger'>* {formik.errors.IFSC} </span>
              <input type="text" name="IFSC" id="IFSC" placeholder='IFSC Name' value={formik.values.
                IFSC} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
            <div className="col-md-6 mb-3">
              <b>AccountNo</b>&nbsp;<span className='text-danger'>* {formik.errors.AccountNo} </span>
              <input type="text" name="AccountNo" id="AccountNo" placeholder='AccountNo Name' value={formik.values.
                AccountNo} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <b>BankName</b>&nbsp;<span className='text-danger'>* {formik.errors.BankName} </span>
            <input type="text" name="BankName" id="BankName" placeholder='BankName Name' value={formik.values.
              BankName} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
          </div>

          <div className="col-md-6 mb-3">
            <b>LogDate</b>&nbsp;<span className='text-danger'>* {formik.errors.LogDate} </span>
            <input type="Date" name="LogDate" id="LogDate" placeholder='LogDate Name' value={formik.values.
              LogDate} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
          </div>
          <div className="col-md-6 mb-3">
            <b>Email</b>&nbsp;<span className='text-danger'>* {formik.errors.Email} </span>
            <input type="text" name="Email" id="Email" placeholder='Email Name' value={formik.values.
              Email} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary btn-lg">
              Save
            </button>&nbsp;
            <button type="button" className="btn btn-danger btn-lg" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>



  );
}
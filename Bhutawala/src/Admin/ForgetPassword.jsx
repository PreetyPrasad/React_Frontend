import React, { useState } from 'react';
import { ForgetPaswordSchema } from '../Schema';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData } from '../API';
import { Link } from "react-router-dom";

export default function ForgetPassword() {

  const [initialValues, setInitialValues] = useState({ "UserName": "" });

  const { handleSubmit, handleChange, handleBlur, values, errors, resetForm } = useFormik({

    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ForgetPaswordSchema,
    onSubmit: async (values) => {
      try {
        let ContactNo = values.UserName;
        const response = await getData(`Admin/ForgotPasswd/${ContactNo}`);
        console.log(`Admin/ForgotPasswd/${ContactNo}`);
        console.log(response);

        if (response.status.toUpperCase() === "OK") {
          console.log("Email Sent !!!");
          toast.success("Email will be sent !!!");
          resetForm();
        } else {
          toast.error("Username or Password is wrong !!!");
        }
      } catch (error) {
        toast.error("Something went wrong !!!");
        console.error("Error posting data in component:", error.message);
      }
    }
  });


  return (
    <div className="auth-page-wrapper pt-5">
      {/* auth page bg */}
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay" />
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
          </svg>
        </div>
      </div>
      {/* auth page content */}
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="index-2.html" className="d-inline-block auth-logo">
                    <img src="assets/images/logo-light.png" alt="" height={20} />
                  </a>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  Premium Admin &amp; Dashboard Template
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4 card-bg-fill">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password with Bhutawala Traders</p>
                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                    />
                  </div>
                  <div
                    className="alert border-0 alert-warning text-center mb-2 mx-2"
                    role="alert"
                  >
                    Enter your email and instructions will be sent to you!
                  </div>
                  <div className="p-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="form-label">UserName</label>
                        <span className='text-danger'>*{errors.UserName}</span>
                        <input
                          type="text"
                          className="form-control"
                          id="UserName"
                          value={values.UserName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter UserName"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Send Reset Link
                        </button>
                      </div>
                    </form>
                    {/* end form */}
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link to="/" className="fw-semibold text-primary text-decoration-underline">
                    Click here
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}
    </div>

  );
}
